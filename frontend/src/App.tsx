import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import EnhancedPreprintGenerator from './EnhancedPreprintGenerator';
import PreprintViewer from './preprintViewer/PreprintViewer';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<EnhancedPreprintGenerator/>}/>
                <Route path="/preprint/:title" element={<PreprintViewer/>}/>
            </Routes>
        </Router>
    );
};

export default App;
