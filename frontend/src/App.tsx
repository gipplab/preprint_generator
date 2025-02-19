import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import EnhancedPreprintGenerator from './EnhancedPreprintGenerator';
import PreprintViewer from './preprintViewer/PreprintViewer';
import Impressum from "./pages/Impressum";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<EnhancedPreprintGenerator/>}/>
                <Route path="/preprint/:title" element={<PreprintViewer/>}/>
                <Route path="/impressum" element={<Impressum/>}/>
            </Routes>
        </Router>
    );
};

export default App;
