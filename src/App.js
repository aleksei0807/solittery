import React, { Component } from 'react'
import SolitteryContract from '../build/contracts/Solittery.json'
import getWeb3 from './utils/getWeb3'
import toArray from './utils/toArray'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      rollResult: [],
      web3: null,
      fetching: false,
    }
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  play = () => {
    const contract = require('truffle-contract')
    const solittery = contract(SolitteryContract)
    solittery.setProvider(this.state.web3.currentProvider)

    var solitteryInstance
    this.setState({
      fetching: true,
    })

    this.state.web3.eth.getAccounts((error, accounts) => {
      solittery.deployed().then((instance) => {
        solitteryInstance = instance

        return solitteryInstance.run.call(accounts[0])
      }).then((result) => {
        return this.setState({ rollResult: toArray(result), fetching: false, })
      })
    })
  }

  render() {
    const { fetching } = this.state

    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
            <a href="#" className="pure-menu-heading pure-menu-link">Truffle Box</a>
        </nav>

        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1">
              <ul>
                {this.state.rollResult.map((n, idx) => <li key={`result-${idx}`}>{n}</li>)}
              </ul>

              <button onClick={this.play} disabled={fetching}>Play lottery</button>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App
