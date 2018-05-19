import React, { Component } from 'react'
import { connect } from "react-redux"
import { actions } from "../../../redux/reducer.js"
import './detail.css'
import Loading from '../../../common/loading/loading.js'
import MBtn from '../../../common/btn/btn.js'
import MBtn02 from '../../../common/btn/btn02.js'
import Scroll from './scroll.js'
import CommentBody from '../../../common/comment_body/comment_body.js'

class Detail extends Component {

    hidden () {
        this.props.detail_show(false)    
    }

    render() {
        let is_show = this.props.is_detail_show?'detail-page show ':'detail-page hidden'    // 商品详情页面是否显示
        let data = this.props.detail_food_data          // 当前详情页面的商品数据
        let ___container___
        if (data) {
            let ___p___ = data.info?<div className="info"><h5>商品信息</h5><p>{data.info}</p></div>:''
            ___container___ = (
                <Scroll>
                    <div className="container">
                        <img src={data.image} alt="食物图片"/>
                        <div className="title">
                            <h1>{data.name}</h1>
                            <h2>月销量{data.sellCount}份 / 好评率{data.rating}%</h2>
                            <h3>￥{data.price}</h3>
                            <MBtn foods={data}></MBtn>
                            <MBtn02 foods={data} className="hidden"></MBtn02>
                        </div>
                        {___p___}
                        <CommentBody comments={data.ratings}></CommentBody>
                    </div>
                </Scroll>
            )
        }
        else {
            ___container___ = <Loading></Loading>
        }

        return (
            <div className={is_show}>
                <i className="back" onClick={()=>{this.hidden()}}></i>
                {___container___}
            </div>
        )
    }
}

const mapStatetoProps = (state) => {
    let {is_detail_show, detail_food_data} = state
    return {is_detail_show, detail_food_data}
}
let {detail_show} = actions
const actionCreators = {detail_show}

Detail = connect(mapStatetoProps, actionCreators)(Detail)

export default Detail