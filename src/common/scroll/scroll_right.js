import React, { Component } from 'react';
import { connect } from "react-redux"
import { actions } from '../../redux/reducer.js'
import BScroll from 'better-scroll'
import './scroll.css'

class ScrollRight extends Component {
    constructor (props) {
        super(props)
        this.sate = {
            scroll: null
        }
    }

    componentDidMount () {
        let scroll = new BScroll(this.refs.scroll, {
            probeType: 3,
            click: true
        })
        let timer = null
        scroll.on("scroll", () => {
            if (this.props.right_change_left===false) return
            if (timer) clearTimeout(timer)
            timer = setTimeout(() => {
                let n = this.get_cur(scroll.y)
                this.props.change_cur({cur: n, right_change_left: true})
            }, 15)
        })
        this.setState({scroll})
        this.props.set_right_scroll(scroll)
    }

    get_cur (y) {
        let list = [0]      // 如果container里面有三个页面,且每个页面的高度都为10, 那么list == [0,10,20,30]
        let h = 0
        let n = this.props.right_list.length    // 计算出container里面有多少张卡片
        for (let i=0; i<n; i++) {
            let el_h = this.props.right_list[i].getBoundingClientRect().height
            h += el_h
            list.push(h)
        }
    for (let i=0; i<n; i++) {       // 遍历出当前的top值在哪个区间--->> 例如: 如果当前top值为12, list== [0, 10, 20, 30] --->> 所在区间为10~20 --->> 位于第二个区间
            if (list[i]<=-y&&-y<list[i+1]) {
                return i
            } 
        }
    }

    render() {
        return (
            <div className="scroll" ref="scroll">
                {this.props.children}
            </div>
        );
    }
}


const mapStatetoProps = (state) => {
    let {goods_cur, right_list, right_change_left} = state
    return {goods_cur, right_list, right_change_left}
}
let {set_right_scroll, change_cur} = actions
const actionCreators = {set_right_scroll, change_cur}

ScrollRight = connect(mapStatetoProps, actionCreators)(ScrollRight)

export default ScrollRight;