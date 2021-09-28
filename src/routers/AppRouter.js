import React from 'react';
import {
    BrowserRouter as Router,
    Redirect,
    Switch,
    Route
} from 'react-router-dom';

import Visualization from '../components/Visualization';
import CopyToClipboard from '../components/CopyToClipboard';
import UploadSelfie from '../components/UploadSelfie';

const AppRouter = () => (
    <Router>
        <Switch>
            <Route path='/visualization'>
                <Visualization />
            </Route>
            <Route path='/copy-to-clipboard'>
                <CopyToClipboard />
            </Route>
            <Route path='/upload-selfie'>
                <UploadSelfie />
            </Route>
            <Route exact path="/">
                <Redirect to='/visualization' />
            </Route>
        </Switch>
    </Router>
);

export default AppRouter;
