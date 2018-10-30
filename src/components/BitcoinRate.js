import React, { Component } from 'react';

export default class BitcoinRate extends Component {
    render() {
        return (
            <div>
                <hr />
                <div>
                    <span>Current Bitcoint rate: <span className='rc--bitcoin-value'>{this.props.bitcoinCurrency}</span></span>
                    <button onClick={this.props.onRefresh} className='rc--refresh-button'>Refresh</button>
                </div>
                <span className='rc--bitcoin-info'>(BTC rate automatically will be updated every 3 minutes)</span>
            </div>
        )
    }
}