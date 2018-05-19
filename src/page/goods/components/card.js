import React, { Component } from 'react'
// import { connect } from "react-redux"
// import { actions } from '../../../redux/reducer.js'
import CardItem from './card_item.js'
import './card.css'

class Card extends Component {

    render() {
        let foods_list = this.props.item.foods.map((item, index) => {
            return <CardItem foods={item} key={index}></CardItem>
        })
        return (
            <div className="card">
                <h1>{this.props.item.name}</h1>
                {foods_list}
            </div>
        )
    }
}

// const mapStatetoProps = (state) => {
//     let {} = state
//     return {}
// }
// let {} = actions
// const actionCreators = {}

// Card = connect(mapStatetoProps, actionCreators)(Card)

export default Card