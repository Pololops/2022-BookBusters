import React from 'react';

import Header from '../components/Header/Header';
import ScannerPlugin from '../components/ScannerPlugin/ScannerPlugin';
import Book from '../Book/Book';
import { useNavigate } from 'react-router-dom';



const Scan = () => {
    const navigate = useNavigate();

    const redirect = (path, data) => {
      navigate(path, data);
    };

    return (
        <div>
            <Header />
            <ScannerPlugin redirect={redirect} />
        </div>
    );
};

export default Scan;
