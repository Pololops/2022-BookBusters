import './style.scss';

import React from 'react';
import Html5QrcodePlugin from './Html5QrcodePlugin.jsx';
import { searchISBN } from '../../api/fetchApi';



class ScannerPlugin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            decodedResults: [],
        };

        // This binding is necessary to make `this` work in the callback.
        this.onNewScanResult = this.onNewScanResult.bind(this);
    }

    render() {
        return (
            <div className='App'>
                <Html5QrcodePlugin
                    fps={10}
                    qrbox={250}
                    disableFlip={false}
                    qrCodeSuccessCallback={this.onNewScanResult}
                />
            </div>
        );
    }

    async onNewScanResult(decodedText, decodedResult) {
        // const navigate = useNavigate();

        console.log('Scanned ISBN', decodedText);
        const response = await searchISBN(decodedText);
        console.log(response.data);

        this.props.redirect('/SearchResults', { state: response.data });
        


        // console.log('App [result]', decodedResult);


        // let decodedResults = this.state.decodedResults;
        // decodedResults.push(decodedResult);
        // this.setState((state, props) => {
        //     state.decodedResults.push(decodedResult);
        //     return state;
        // });
    }
}

export default ScannerPlugin;
