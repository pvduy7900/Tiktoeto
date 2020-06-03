import React, { Component } from 'react'
import Square from './Square'

export default class Board extends Component {
    renderSquare = (num) => {
        return <Square id={num} boxClick={this.handleBoxClick} value={this.props.squares[num]} />
        //make the atribute for Square, what value here is?
    };

    calculateWinner = (squares) => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                this.props.postData();
                this.props.setTheState({
                    winner: squares[0]
                })
                return;
            }
        }
        return null;
    };

    handleBoxClick = (id) => {

        console.log("what is isxNExt", this.props.isXNext)
        console.log("click box:", id)
        let squaresFromApp = this.props.squares //Array fro 1 to 9

        if (this.props.squares[id] === null) {
            squaresFromApp[id] = this.props.isXNext ? 'X' : 'O'//id =1 to 9, if isXnext true so vi tri so id trong Array = X, neu sai = O
            console.log("aaaa", squaresFromApp)
            this.props.setTheState({

                squares: squaresFromApp,
                isXNext: !this.props.isXNext,
                history: [
                    ...this.props.history,
                    {
                        squares: squaresFromApp.slice(),
                        isXNext: !this.props.isXNext
                    }]
            })// cai nay la in lai squares sau khi da thay doi, isXnext bien thanh false
            console.log("history:", this.props.history)
        } else {
            alert("choose another one")
        }
        this.calculateWinner(this.props.squares);

    }



    render() {
        let status = '';
        let winner = this.props.winner;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.props.isXNext ? 'X' : 'O');
        }
        // status is meaning User sees who is the next player to move.

        return (
            <div>
                <h2>{status}</h2>
                <div className="row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        )
    }
}
