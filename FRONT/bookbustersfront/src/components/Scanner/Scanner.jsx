import { Box } from "@mui/system";
// import { Button, ButtonGroup, Container } from "@mui/material";

import './style.scss';

import React, { useState, useEffect, useContext } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

// import Book from "../Book/Book";
import { searchBookByISBN } from '../../api/fetchApi';
import BookDetailModal from "../BookDetailModal/BookDetailModal";

import bookContext from "../../contexts/BookContext";

const Scanner = () => {
    const [scannedCodes, setScannedCodes] = useState([]);
    const { setOpenedBook } = useContext(bookContext);
    

    useEffect(() => {
        async function onScanSuccess(decodedText, decodedResult) {
            const isbn = decodedText

            // To close the QR code scannign after the result is found
            html5Qrcode.clear();

            const response = await searchBookByISBN(isbn);
            console.log('ISBN readed : ', isbn);
            console.log('Found book : ', response.data);
            setOpenedBook(response.data);          

        }

        function onScanError(qrCodeError) {
            // This callback would be called in case of qr code scan error or setup error.
            // You can avoid this callback completely, as it can be very verbose in nature.
        }

        const config =  { 
            fps: 10,
            qrbox: { width: 250, height: 250 },
            experimentalFeatures: {
                useBarCodeDetectorIfSupported: true
            }
        };

        let html5Qrcode = new Html5QrcodeScanner(
            'reader',
            config,
            false,
        );
        html5Qrcode.render(onScanSuccess, onScanError);
    });

    return (
        <Box>
        <div id="scanner">
            <div id='reader'></div>
        </div>
       <BookDetailModal />
      </Box>
    );
};

export default Scanner;
