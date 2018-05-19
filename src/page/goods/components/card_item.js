import React, { Component } from 'react'
import { connect } from "react-redux"
import { actions } from '../../../redux/reducer.js'
import MBtn from '../../../common/btn/btn.js'
import './card_item.css'

class CardItem extends Component {
    
    render() {
        let food = this.props.foods             // 改卡片的商品信息
        let _description_ = food.description?<h2>{food.description}</h2>:''
        let _old_price_ = food.oldPrice?<span>￥{food.oldPrice}</span>:''
        let detail_data = {is_show: true, food_data: food}
        let _sellCount_ = (
            <h4>
                <span>月售{food.sellCount}份</span>
                <span>好评率{food.rating}%</span>
            </h4>
        )
        
        return (
            <div className="card-item">
                <div className="left" style={{backgroundImage: `url(${food.icon})`}}></div>              
                <div className="right">
                    <h1>{food.name}</h1>
                    {_description_}
                    {_sellCount_}
                    <h3>￥{food.price}{_old_price_}</h3>
                    <MBtn foods={food}></MBtn>
                </div>
                <div className="for_click" onClick={()=>{this.props.detail_show(detail_data)}}></div>
            </div>
        )
    }
}


const mapStatetoProps = (state) => {
    let {goods, goods_number} = state
    return {goods, goods_number}
}
let {add_goods, detail_show} = actions
const actionCreators = {add_goods, detail_show}

CardItem = connect(mapStatetoProps, actionCreators)(CardItem)

export default CardItem