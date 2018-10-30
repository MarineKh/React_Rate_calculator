import React, { Component } from 'react';

export default class SelectCurrency extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.onChange(e);
    }

    render() {
        return (
            <div>
                <label className='rc--flex rc--flex-align-center'>
                    Convert AMD to:
                    <div className='rc--select-container rc--flex rc--flex-column'>
                        <span className='rc--select-header'>Select / Select</span>
                        <select className='rc--select' value={this.props.currencyName} onChange={this.handleChange}>
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                            <option value="RUB">RUB</option>
                            <option value="GBP">GBP</option>
                        </select>
                        <span className='rc--currency-info rc--text-center'>(1 {this.props.currencyName} = {this.props.currency} AMD)</span>
                    </div>
                </label>
            </div>
        )
    }
}