import React, { Component } from 'react'
import './goods.css'
import { connect } from "react-redux"
import {actions} from '../../redux/reducer.js'
import {api_goods} from '../../tools/api.js'
import Loading from '../../common/loading/loading.js'
import Card from './components/card.js'
import ScrollLeft from '../../common/scroll/scroll_left.js'
import ScrollRight from '../../common/scroll/scroll_right.js'
import Shopping from './components/shopping_cart.js'
import Detail from './components/detail.js'

class Goods extends Component {

    constructor (props) {
        super(props)
        this.state = {
            goods_data: null
        }
    }

    componentDidMount () {
        api_goods().then(res => {
            console.log(res.data.data, 'goods')
            this.setState({
                goods_data: res.data.data,
                cur_element: null
            })
            this.set_list()
        })
    }
    componentWillUnmount () {
        this.props.remove_balls()
    }
    set_list () {                           // 获取scroll里面的list-dom, better-scroll滚动到指定页面用
        if (this.state.goods_data) {
            let list_left = document.getElementsByClassName('left-list')
            let list_right = document.getElementsByClassName('card')
            this.props.set_left_list(list_left)
            this.props.set_right_list(list_right)
        }
    }

    componentDidUpdate (props, state) {
        if (props.goods_cur!==null) {
           if (this.props.right_list===null) return
            let left = this.props.left_list
            let right = this.props.right_list
            let cur = this.props.goods_cur
            let right_change_left = this.props.right_change_left
            let l = cur-1
            if (l<0) l=0
            this.props.left_scroll.scrollToElement(left[l], 500)
            if (right_change_left===false)this.props.right_scroll.scrollToElement(right[cur], 500)
        }
    }

    css_ball () {
        let style = {}
        let xy = this.props.xy
        style['left'] = `${xy.x}px`
        style['right'] = `${xy.y}px`
        return style
    }

    change_cur (index) {
        this.props.change_cur({cur: index, right_change_left: false})
        setTimeout(() => {
            this.props.change_cur({cur: index, right_change_left: true})
        }, 1000)
    }

    render() {
        let goods = this.state.goods_data
        let balls = this.props.balls
        if (goods===null) {
            return (
                <div className="goods">
                    <Loading></Loading>
                </div>
            )
        }

        let cur = this.props.goods_cur
        let __left_list__ = goods.map((item, index) => {
            let icon = item.type===-1?'':<span className={`icon${item.type}`}></span>
            return (
                <li key={item.name} className={cur===index?'cur left-list':'left-list'} onClick={() => {this.change_cur(index)}}>
                    <div>{icon}{item.name}</div>
                </li>
            )
        })

        let __right_list__ = goods.map(item => {
            return <Card key={item.name} item={item}></Card>
        })
        let _balls_ = balls.map((item, index) => {
            return <div className="ball" style={{'left': `${item.left}px`, 'top': `${item.top}px`}} key={index}></div>
        })
        return (
            <div className="goods">
                <div className="left">
                    <ScrollLeft ref="scroll_left">
                        <ul className="container">{__left_list__}</ul>
                    </ScrollLeft>
                </div>
                <div className="right">
                    <ScrollRight ref="scroll_right">
                        <ul>{__right_list__}</ul>
                    </ScrollRight>
                </div>
                <Shopping></Shopping>
                <Detail></Detail>
                {_balls_}
            </div>
        )
    }
}

const mapStatetoProps = (state) => {
    let {goods_cur, left_scroll, right_scroll, right_list, left_list, balls, balls_number, right_change_left} = state
    return {goods_cur, left_scroll, right_scroll, right_list, left_list, balls, balls_number, right_change_left}
}

let {change_cur, set_left_list, set_right_list, alert_show, remove_balls} = actions
const actionCreators = {change_cur, set_left_list, set_right_list, alert_show, remove_balls}

Goods = connect(mapStatetoProps, actionCreators)(Goods)

export default Goods