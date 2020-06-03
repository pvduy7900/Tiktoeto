import React, { Component } from 'react'
import Board from './components/Board'
import './App.css'
import FacebookLogin from 'react-facebook-login';

export default class App extends Component {



  //why have to get this, constructor, super,.fill mean?
  constructor(props) {
    super(props)
    this.state = {
      squares: Array(9).fill(null),
      isXNext: true,
      history: [], // quare : square at this moment, isXNext, the value at that 
      facebook: null,
      topscorer:[],
      hasPostedData: false,
      winner: false,
    }
  }

getTopScore = async() =>{
  let url = `http://ftw-highscores.herokuapp.com/tictactoe-dev`
  let data = await fetch(url)
  let result = await data.json()
  this.setState(
    {
      topscorer:result.items
    }
  )
}
componentDidMount(){
  this.getTopScore()
}
  // what here?
  setTheState = (obj) => {
    return this.setState(obj);
  }

  timeTravel = (id) => {
    console.log("back to past:", id)

    this.setState({
      squares: this.state.history[id].squares.slice(),
      isXNext: this.state.history[id].isXNext,
    })
  }

  responseFacebook = (data) => {
    this.setState({
      facebook: data 
    })
    
  }

  postData = async() => {
    let data = new URLSearchParams();
    data.append("player", this.state.facebook.name);
    data.append("score", -90);
    const url = `http://ftw-highscores.herokuapp.com/tictactoe-dev`;
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: data.toString(),
        json: true
    });
    console.log("response?" , response)
}

  render() {

    return (
      <div>
        {
           (this.state.facebook)
            ? this.state.facebook.name
            : <div className="App">
                <FacebookLogin
                  autoLoad={true}
                  appId="1901321590003732"
                  fields="name,email,picture"
                  callback={this.responseFacebook} //callback? 
                />
              </div>     
        }


        <div>
          <h1>tik tac toe</h1>
          <Board {...this.state} setTheState={this.setTheState} postData = {this.postData} />
          
        </div>

        <div>
          <ul>
            {this.state.topscorer.map(item=>{
              return <li>playername:{item.player} score:{item.score}</li>
            })}
          </ul>
        </div>

        <div>
          {this.state.history.map((item, idx) => { return <div><button onClick={() => this.timeTravel(idx)}>move{idx + 1}</button></div> })}
        </div>

      </div>
    )
  }
}

/*

<Board
  squares={squares}
  history={history}
  isXNext={isXNext}
  setTheState={this.setTheState} />

*/
