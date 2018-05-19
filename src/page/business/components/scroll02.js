import React, { Component } from 'react';
// import { connect } from "react-redux"
// import { actions } from '../../redux/reducer.js'
import BScroll from 'better-scroll'
import "./scroll02.css"

class Scroll02 extends Component {
    constructor (props) {
        super(props)
        this.sate = {
            scroll: null
        }
    }

    componentDidMount () {
        let scroll = new BScroll(this.refs.scroll, {
            probeType: 2,
            click: true,
            scrollY: false,
            scrollX: true
        })
        this.setState({scroll})
    }

    render() {
        let pics = this.props.list
        if (pics===[]) return 
        let width = 1.5*pics.length
        let sty = {'width': `${width}rem`}
        let ___img___ = pics.map((item, index) => {
            return <img src={item} key={index} alt="店铺实景" />
        })
        return (
            <div className="scroll02" ref="scroll">
                <div className="container" style={sty}>
                    {___img___}
                </div>
            </div>
        );
    }
}


// const mapStatetoProps = (state) => {
//     let {goods_cur} = state
//     return {goods_cur}
// }
// let {set_left_scroll} = actions
// const actionCreators = {set_left_scroll}

// Scroll02 = connect(mapStatetoProps, actionCreators)(Scroll02)

export default Scroll02;