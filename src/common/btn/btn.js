import React, { Component } from 'react'
import { connect } from "react-redux"
import { actions } from '../../redux/reducer.js'
import './btn.css'

class Btn extends Component {

    add (e) {
        if (!e) return        
        // 小球动画======================================
        let left = e.target.getBoundingClientRect().left
        let top = e.target.getBoundingClientRect().top
        let ball_list = this.props.balls
        let ball = {left, top}
        ball_list.push(ball)
        this.props.add_ball(ball_list)

        // 往购物车你里面添加商品========================================================
        let list = this.props.goods                     // 购物车里面的商品列表
        let is_exist = false                            // 该商品是否已经存在
        let food = {...this.props.foods, count: 1}      // 改卡片的商品信息
        if (list.length===0) {                          // 如果购物车为空===> 商品不存在购物车里面
            is_exist = false
        }
        else {                                           // 如果购物车不为空--->>>进一步检查商品是否已经存在于购物车里面
            for (let item of list) {                     // 查看购物车里是否已经存在该商品
                if (item.name===food.name) {
                    is_exist = true
                }
            }
        }
        if (is_exist) {                                 // 如果存在数量就加一
            let f = list.filter(item => food.name===item.name)
            f[0].count++
        }
        else {                                          // 如果不存在放入购物车
            list.push(food)
        }

        this.props.add_goods(list)
    }
    remove () {
        let food = this.props.foods
        let list = this.props.goods
        let cur = list.filter(item => item.name===food.name)
        if (cur.length===0) return
        cur[0].count--
        if (cur[0].count<=0) {
            cur[0].count=0
            list = list.filter(item => item.name!==food.name)
        }
        this.props.remove_goods(list)
    }
    render() {
        let food = this.props.foods             // 改卡片的商品信息
        let cur_food = this.props.goods.filter(item => food.name===item.name)
        let count = 0
        if (cur_food[0]) count = cur_food[0].count
        
        return (
            <div className="mbtn">
                <span className={`cur-a${count}`} ></span>
                <span className={`cur-b${count}`}>{count}</span>
                <span className="add" onClick={e=>{this.add(e)}}></span>
                <div className='click'>
                    <span onClick={()=>{this.remove()}}></span>
                    <span onClick={()=>{this.add()}}></span>
                </div>
            </div>
        )
    }
}


const mapStatetoProps = (state) => {
    let {goods, goods_number, balls} = state
    return {goods, goods_number, balls}
}
let {add_goods, remove_goods, add_ball} = actions
const actionCreators = {add_goods, remove_goods, add_ball}

Btn = connect(mapStatetoProps, actionCreators)(Btn)

export default Btn