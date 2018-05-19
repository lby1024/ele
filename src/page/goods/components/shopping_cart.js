import React, { Component } from 'react'
import { connect } from "react-redux"
import { actions } from '../../../redux/reducer.js'
import './shopping_cart.css'
import MBtn from '../../../common/btn/btn.js'
import ScrollCart from './scroll.js'

class Shopping extends Component {
    constructor (props) {
        super(props)
        this.state = {
            show: false,
        }
    }
    componentDidUpdate () {
        
    }
    show_hidden () {
        if (this.state.show) {
            this.setState({show: false})
        }
        else {
            if (this.props.goods.length===0) return
            this.setState({show: true})
        }
    }
    pay () {
        let price = 0
        let list = this.props.goods
        list.map(item => {
            price += item.price*item.count
            return null
        })
                
        if (price>=20) alert('需支付￥'+price+'元') 
    }
    clear_all () {
        this.setState({show: false})
        this.props.clear_cart()
    }
    render() {
        let price = 0
        let list = this.props.goods
        list.map(item => {
            price += item.price*item.count
            return null
        })
        
        let _list_ = list.map(item => {
            return (
                <li key={item.name}>
                    {item.name}
                    ￥{item.price}
                    <MBtn foods={item}></MBtn>
                </li>
            ) 
        })
        let _scroll_ = (
            <ScrollCart show={this.state.show}>
                <div className="container">
                    {_list_}
                </div>
            </ScrollCart>
        )
        let _list_header_ = (
            <h3 className="title">
                <div className="name">购物车</div>
                <div className="btn" onClick={()=>{this.clear_all()}}>清空</div>
            </h3>
        )
        let cart_class = list.length===0?'cart':'cart cur'
        let price_class = list.length===0?'price':'price cur'
        let btn_class = price>=20?'btn cur':'btn'
        let mark_class = this.state.show?'mark':'mark hidden'
        let list_class = this.state.show?'list':'list hidden'
        let btn_txt = '20￥起送'
        if (price>0) btn_txt = price>=20?'去结账':`还差${20-price}￥起送`
        return (
            <div className="shopping">
                <div className={price_class} onClick={()=>{this.show_hidden()}}>￥{price}</div>
                <div className="detail" onClick={()=>{this.show_hidden()}}>另外配送费￥4元</div>
                <div className={btn_class} onClick={()=>{this.pay()}}>{btn_txt}</div>
                <div className={cart_class} onClick={()=>{this.show_hidden()}}><i>{list.length}</i></div>
                <ul className={list_class}>
                    {_list_header_}
                    {_scroll_}
                </ul>
                <div className={mark_class} onClick={()=>{this.show_hidden()}}></div>
            </div>
        )
    }
}


const mapStatetoProps = (state) => {
    let {goods, goods_number} = state
    return {goods, goods_number}
}
let {add_goods, clear_cart} = actions
const actionCreators = {add_goods, clear_cart}

Shopping = connect(mapStatetoProps, actionCreators)(Shopping)

export default Shopping