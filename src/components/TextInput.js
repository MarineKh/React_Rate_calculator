import React, { Component } from 'react';

function ConvertedNumber(props) {
    // console.log('props.currency', props);
    let result = (props.amount * props.currency).toFixed(3)
    return result
}
function ConvertedCurrency(props) {
    return props.currencyName
}

export default class TextInput extends Component {
    constructor(props) {
        super(props);

        this.state = { value: 0 }

        this.onChangeHandler = this.onChangeHandler.bind(this)
    }
    onChangeHandler(e) {
        this.setState({
            value: e.target.value.replace(/^0+/, '')

        })
    }
    render() {
        const { value } = this.state
        const x = value ? <span className='rc--result'> <ConvertedCurrency currencyName={this.props.currencyName} /> = <ConvertedNumber amount={parseFloat(value)} currency={this.props.currency} /> AMD </span> : null;


        return (
            <div className='rc--flex rc--flex-align-end'>
                <div className='rc--flex rc--flex-column '>
                    <span className='rc--select-header'>Input / Text (Focus)</span>
                    <input className='rc--input' type="number" placeholder='0' value={value} onChange={this.onChangeHandler} />
                </div>
                {x}
            </div>
        )
    }
}