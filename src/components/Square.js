import React, { Component } from 'react'

export default class Square extends Component {
    render() {
        return (
            <div className="box" onClick={() => this.props.boxClick(this.props.id)}>
           
                <div>{this.props.value}</div> 
                {/* value here = X or O */}
            </div>
        )
    }
}
