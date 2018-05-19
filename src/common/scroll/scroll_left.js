import React, { Component } from 'react';
import { connect } from "react-redux"
import { actions } from '../../redux/reducer.js'
import BScroll from 'better-scroll'
import './scroll.css'

class ScrollLeft extends Component {
    constructor (props) {
        super(props)
        this.sate = {
            scroll: null
        }
    }

    componentDidMount () {
        let scroll = new BScroll(this.refs.scroll, {
            probeType: 2,
            click: true
        })
        this.setState({scroll})
        this.props.set_left_scroll(scroll)
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
    let {goods_cur} = state
    return {goods_cur}
}
let {set_left_scroll} = actions
const actionCreators = {set_left_scroll}

ScrollLeft = connect(mapStatetoProps, actionCreators)(ScrollLeft)

export default ScrollLeft;