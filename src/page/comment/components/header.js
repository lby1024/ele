import React, { Component } from 'react'
import { connect } from "react-redux"
import { actions } from "../../../redux/reducer.js"
import Star from '../../../common/start/star.js'
import './header.css'

class Comment extends Component {
    
    render() {
        let data = this.props.seller_data
        if (data===null) return <div className="comment-header-loading"></div>
        
        return (
            <div className="comment-header">
                <div className='left'>
                    <h1>{data.score}</h1>
                    <h2>综合评分</h2>
                    <h3>高于周边商家{data.rankRate}%</h3>
                </div>
                <div className='right'>
                    <div>
                        <span>服务态度</span>
                        <Star score={data.foodScore}></Star>
                        <span>{data.foodScore}</span>
                    </div>
                    <div>
                        <span>商品评分</span>
                        <Star score={data.serviceScore}></Star>
                        <span>{data.serviceScore}</span>
                    </div>
                    <div>
                        <span>送达时间</span>
                        <span>{data.deliveryTime}分钟</span>
                    </div>
                </div>
            </div>
        )
    }
}


const mapStatetoProps = (state) => {
    let {seller_data} = state
    return {seller_data}
}
let {add_goods} = actions
const actionCreators = {add_goods}

Comment = connect(mapStatetoProps, actionCreators)(Comment)

export default Comment