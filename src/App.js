import React, { Component } from 'react'
import Board from './components/Board'
import './App.css'

export default class App extends Component {



  //why have to get this, constructor, super,.fill mean?
  constructor(props) {
    super(props)
    this.state = {
      squares: Array(9).fill(null),
      isXNext: true,
      history: [] // quare : square at this moment, isXNext, the value at that moment
    }
  }
  // what here?
  setTheState = (obj) => {
    this.setState(obj);
  }

  timeTravel = (id) =>{
    console.log("back to past:",id)
  }
  render() {

    return (
      <div>
        <div>
          <h1>tik tac toe</h1>
          <Board {...this.state} setTheState={this.setTheState} />
        </div>
        <div>
          {this.state.history.map((item, idx) => { return <div><button onClick = {()=>this.timeTravel(idx)}>move{idx+1}</button></div> })}
        </div>

      </div>

    )
  }
}
