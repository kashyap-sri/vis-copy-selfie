import React, { useState, useEffect } from "react";

import { Bar } from 'react-chartjs-2';
import _ from 'lodash';

import { API_URL, SORT_BY, ORDER } from "../constants";


const VerticalBar = () => {

    const [ items, setItems ] = useState([]);
    const [ tagsCount, setTagsCount ] = useState(30);
    const [ fromDate, setFromDate ] = useState(null);
    const [ toDate, setToDate ] = useState(null);
    const [ sortBy, setSortBy ] = useState('popular');
    const [ sortOrder, setSortOrder ] = useState('desc');
    const [ max, setMax ] = useState(0);
    const [ min, setMin ] = useState(0);
    const [ searchQuery, setSearchQuery ] = useState(null);

    useEffect(() => {
        (async () => {
            const queryURL = getQueryURL();
            try {
                const request = await fetch(queryURL);
                const data = await request.json();
                const formattedData = getFormattedData(data);
                setItems(formattedData);
            } catch (err) {
                console.log(err);
                setItems([]);
            }
        })()
    }, [tagsCount, fromDate, toDate, sortBy, sortOrder, max, min, searchQuery]);

    const getQueryURL = () => {
        const baseUrl = API_URL;
        let queryURL = baseUrl;
        queryURL = `${queryURL}${tagsCount ? `&pagesize=${tagsCount}` : ''}`;
        queryURL = `${queryURL}${fromDate ? `&fromdate=${getTimeStamp(fromDate)}` : ''}`;
        queryURL = `${queryURL}${toDate ? `&todate=${getTimeStamp(toDate)}` : ''}`;
        queryURL = `${queryURL}${`&order=${sortOrder}`}`;
        queryURL = `${queryURL}${min ? `&min=${min}` : ''}`;
        queryURL = `${queryURL}${max ? `&max=${max}` : ''}`;
        queryURL = `${queryURL}${`&sort=${sortBy}`}`;
        queryURL = `${queryURL}${searchQuery ? `&inname=${searchQuery}` : ''}`;
        return queryURL;
    };

    const getRangeType = () => {
        let type = 'number';
        if (sortBy === 'popular') {
            type = 'number';
        } else if (sortBy === 'name') {
            type = 'text';
        } else if (sortBy === 'activity') {
            type = 'date';
        }
        return type;
    }

    const getTimeStamp = (date) => {
        try {
            return new Date(date).getTime()/1000;
        } catch (err) {
            console.log(err);
        }
    };

    const getFormattedData = (data) => {
        const items = data.items.map(item => ({
            language: item.name,
            count: item.count
        }));
        return items;
    };

    const setFilter = (type, value) => {
        switch (type) {
            case 'tagsCount':
                setTagsCount(value);
                break;
            case 'fromDate':
                setFromDate(value);
                break;
            case 'toDate':
                setToDate(value);
                break;
            case 'sort':
                setMax(null);
                setMin(null);
                setSortBy(value);
                break;
                case 'order':
                setSortOrder(value);
                break;
            case 'max':
                setMax(sortBy === 'activity' ? getTimeStamp(value) : value);
                break;
            case 'min':
                setMin(sortBy === 'activity' ? getTimeStamp(value) : value);
                break;
            case 'search':
                setSearchQuery(value);
                break;
            default:
                break;
        }
    };

    const data = {
        labels: items.map(item => item.language),
        datasets: [{
            label: '# of Tags',
            data: items.map(item => item.count),
            backgroundColor: [
                'rgba(232, 60, 65, 1)',
            ],
            borderColor: [
                'rgba(23, 25, 35, 1)',
            ],
            borderWidth: 1,
        }, ],
    };

    const options = {
        plugins: {
            title: {
                display: true,
                text: 'Tags on Stackoverflow',
            },
        },
        scales: {
            x: {
                title: {
                  display: true,
                  text: 'Tags'
                }
              },
            y: {
                title: {
                  display: true,
                  text: 'Count'
                }
            }
        }
    };
    return (
        <div className="vis">
            <div className="filters">
                <div className="filters__header">
                    Filters
                </div>
                <div className="filters__item-container">
                    <div className="filters__item">
                        <div className="filters__label">No. of Tags: </div> <div className="filters__input">
                            <input type="number" min="0" max="100" onChange={_.debounce(e => setFilter('tagsCount', e.target.value), 500)}/>
                        </div>
                    </div>
                    <div className="filters__item">
                        <div className="filters__label">From Date: </div> <div className="filters__input">
                            <input type="date" placeholder="yyyy-mm-dd" onChange={e => setFilter('fromDate', e.target.value)}/>
                        </div>
                    </div>
                    <div className="filters__item">
                        <div className="filters__label">To Date: </div> <div className="filters__input">
                            <input type="date" placeholder="yyyy-mm-dd" onChange={e => setFilter('toDate', e.target.value)}/>
                        </div>
                    </div>
                    <div className="filters__item">
                        <div className="filters__label">Sort by: </div> <div className="filters__select">
                            <select selected={sortBy} name="sort" id="sort" onChange={e => setFilter('sort', e.target.selectedOptions[0]?.value)}>
                                {
                                    SORT_BY.map((item, index) => <option value={item} key={index}>{item}</option>)
                                }
                            </select>
                        </div>
                    </div>
                    <div className="filters__item">
                        <div className="filters__label">Order: </div> <div className="filters__select">
                            <select selected={sortOrder} name="order" id="order" onChange={e => setFilter('order', e.target.selectedOptions[0]?.value)}>
                                {
                                    ORDER.map((item, index) => <option value={item} key={index}>{item}</option>)
                                }
                            </select>
                        </div>
                    </div>
                    <div className="filters__item">
                        <div className="filters__label">Range Min: </div> <div className="filters__input">
                            <input type={getRangeType()} onChange={_.debounce(e => setFilter('min', e.target.value), 500)}/>
                        </div>
                    </div>
                    <div className="filters__item">
                        <div className="filters__label">Range Max: </div> <div className="filters__input">
                            <input type={getRangeType()} onChange={_.debounce(e => setFilter('max', e.target.value), 500)}/>
                        </div>
                    </div>
                    <div className="filters__item">
                        <div className="filters__label">Search: </div> <div className="filters__input">
                            <input type="text" onChange={_.debounce(e => setFilter('search', e.target.value), 500)}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="chart">
                <div className="chart__container">
                    <Bar data={data} options={options}/>
                </div>
            </div>
        </div>
    );
};

export default VerticalBar;
