import React, { Component } from 'react'
import ProgressButton from 'react-progress-button'
import 'react-progress-button/react-progress-button.css'
import SolitteryContract from '../build/contracts/Solittery.json'
import getWeb3 from './utils/getWeb3'
import toArray from './utils/toArray'

import './css/oswald.css'
import './css/open-sans.css'
import './App.css'

export default class App extends Component {
  state = {
    rollResult: Array.from({ length: 5 }, () => '-'),
    web3: null,
    buttonState: '',
  }

  componentWillMount() {
    this.getWeb3()
  }

  getWeb3 = async () => {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.
    try {
      const { web3 } = await getWeb3
      this.setState({
        web3,
      })
    } catch (e) {
      console.error(e)
    }
  }

  triggerButtonError = () => {
    this.setState({
      buttonState: 'error',
    })
  }

  play = () => {
    const { web3 } = this.state
    if (web3) {
      const contract = require('truffle-contract')

      this.setState({
        buttonState: 'loading',
      })

      try {
        const solittery = contract(SolitteryContract)
        solittery.setProvider(web3.currentProvider)

        web3.eth.getAccounts(async (error, accounts) => {
          try {
            const instance = await solittery.deployed()
            const result = await instance.run.call(accounts[0])
            this.setState({
              rollResult: toArray(result),
              buttonState: 'success',
            })
          } catch (e) {
            this.triggerButtonError()
            console.error(e)
          }
        })
      } catch (e) {
        this.triggerButtonError()
        console.error(e)
      }
    }
  }

  render() {
    const { buttonState, rollResult } = this.state

    return (
      <div className="app">
        <div className="wrapper">
          {rollResult.map((n, idx) => (
            <div className="item" key={`result-${idx}`}>{n}</div>
          ))}
        </div>

        <ProgressButton
          state={buttonState}
          className="button"
          onClick={this.play}>
          Play lottery
        </ProgressButton>
      </div>
    )
  }
}
