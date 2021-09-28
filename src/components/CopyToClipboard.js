import React, { useState, useEffect } from "react";

import { BiCopy } from 'react-icons/bi';
import { FcCheckmark } from 'react-icons/fc';

import _ from 'lodash';

import Header from "./Header";

const CopyToClipboard = () => {

    const [ copyText, setCopyText ] = useState('');
    const [ isCopied, setIsCopied ] = useState(false);
    const copyInputElement = React.createRef();

    useEffect(() => {
        const params = window.location.href.split('?')[1];
        const queryString = new URLSearchParams(params);
        for (let pair of queryString.entries()) {
            if (pair[0] === 'q') {
                copyInputElement.current.value = pair[1];
            }
        }
    }, [])

    const copyToClipboard = () => {
        const inputElement = document.getElementById('copyTarget');
        inputElement.select();
        inputElement.setSelectionRange(0, 99999);
        navigator.clipboard.writeText(inputElement.value);
        setCopyText(inputElement.value);
        setIsCopied(true);
    };

    return (
        <div className="home">
            <Header />
            <div className="copy">
                <div className="copy__container">
                    <div className="copy__header">
                        Copy to clipboard
                    </div>
                    <div className="copy__input">
                        <div className="copy__input-container">
                            <input type="text" placeholder="Type something..."
                            defaultValue={copyText}
                            ref={copyInputElement}
                            id="copyTarget"
                            onChange={_.debounce((e) => setIsCopied(false), 100)}/>
                        </div>
                        <div className="copy__icon" title="Copy to clipboard">
                            {
                                !isCopied ? <BiCopy onClick={copyToClipboard}/> : <FcCheckmark />
                            }
                        </div>
                    </div>
                    <div className="copy__display">
                        {copyText && <div>Copied text is "<span className="copy__text">{copyText}</span>"</div>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CopyToClipboard;
