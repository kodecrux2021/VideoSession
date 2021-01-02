import React, { Component } from 'react'
import Investor from './Investor'

const sampleData = [
    { id: 1, name: 'Blockchain' },
    { id: 2, name: 'Ruby' },
    { id: 3, name: 'Express' },
    { id: 4, name: 'Django' }
  ];

export default class InvestorContainer extends Component {

    constructor() {
        super();
        this.state = {
          selected: [],

          investor__name: 'Nauman'
        };
        this.handleSelect = this.handleSelect.bind(this);
      }

      handleSelect(val) {
        console.log(val);
      this.setState({ selected: val });
    }

    render() {
        return (
            <div>
                <Investor
                investor__name={this.state.investor__name}
                selected={this.state.selected}
                handleSelect={this.handleSelect}
                sampleData={sampleData}
                />
            </div>
        )
    }
}
