import React, { Component } from 'react';
import Header from './Header'
import SelectCurrency from './SelectCurrency'
import TextInput from './TextInput'
import BitcoinRate from './BitcoinRate'
import axios from 'axios';
import Loader from 'react-loader'

const API = 'http://cb.am/latest.json.php?currency='
const API_BITCOIN = 'http://cb.am/latest.json.php?coins&currency=BTC'
const API_RUB = 'http://cb.am/latest.json.php?currency=RUB'
const DEFAULT_CURRENCY = 'USD'

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currencyName: 'USD',
      currency: 0,
      isLoading: false,
      error: null,
      hideBitcoinRate: true,
      bitcoinCurrency: 0
    }

    this.onChangeHandler = this.onChangeHandler.bind(this)
    this.onBitcoinTextClick = this.onBitcoinTextClick.bind(this)
    this.fetchData = this.fetchData.bind(this)
    this.fetchBitcoinData = this.fetchBitcoinData.bind(this)
  }

  componentDidMount() {
    this.fetchData();
    setInterval(this.fetchBitcoinData, 180000)
    this.setState({ isLoading: true });
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   return this.state.bitcoinCurrency !== nextState.bitcoinCurrency
  // }

  componentWillUnmount() {
    clearInterval(this.fetchBitcoinData());
  }

  fetchData(currencyName = 'USD') {
    console.log('currencyName', currencyName);
    if (currencyName === 'RUR') {
      axios.get(API_RUB)
        .then(result => {
          for (let val of Object.values(result.data)) {
            this.setState({
              currency: val,
              isLoading: false
            })
            console.log(result.data);
          }
        })
        .catch(error => this.setState({
          error,
          isLoading: false
        }))
    }

    axios.get(API + currencyName)
      .then(result => {
        for (let val of Object.values(result.data)) {
          this.setState({
            currency: val,
            isLoading: false
          })
          console.log(result.data);
        }
      })
      .catch(error => this.setState({
        error,
        isLoading: false
      }))
  }

  fetchBitcoinData() {
    axios.get(API_BITCOIN)
      .then(result => {
        for (let val of Object.values(result.data)) {
          this.setState({
            bitcoinCurrency: val,
            isLoading: false
          })
          console.log('bitcoinCurrency', val);
        }
      })
      .catch(error => this.setState({
        error,
        isLoading: false
      }))
  }

  onChangeHandler(e) {
    this.setState({
      currencyName: e.target.value,
      isLoading: true
    });
    this.fetchData(e.target.value);

    // console.log('target', e.target.value);
  }

  onBitcoinTextClick() {
    this.setState({
      hideBitcoinRate: !this.state.hideBitcoinRate
    })
    clearInterval(this.fetchBitcoinData());
  }

  render() {
    const { isLoading } = this.state;
    if (isLoading) {
      return <Loader />
    }

    let { hideBitcoinRate } = this.state
    let renderBitcoinText = hideBitcoinRate
      ? <div className='rc--bitcoinText' onClick={this.onBitcoinTextClick}>Show Bitcoin rate</div>
      : <div>
        <span className='rc--bitcoinText' onClick={this.onBitcoinTextClick}>Hide Bitcoin rate</span>
        <BitcoinRate bitcoinCurrency={this.state.bitcoinCurrency} onRefresh={this.fetchBitcoinData} />
      </div>
    return (
      <div>
        <Header />
        <SelectCurrency currencyName={this.state.currencyName}
          currency={this.state.currency}
          onChange={this.onChangeHandler} />
        <TextInput currencyName={this.state.currencyName} currency={this.state.currency} loader={this.state.loader} />
        <div className='rc--bitcoin-container'>
          {renderBitcoinText}
        </div>
      </div>
    );
  }
}