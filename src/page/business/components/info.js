import React, { Component } from 'react';
// import { connect } from "react-redux"
// import { actions } from '../../redux/reducer.js'
import "./info.css"

class Info extends Component {

    render() {
        let info_list = this.props.list
        if (info_list===[]||info_list===null) return
        let ___p___ = info_list.map((item, index) => <p key={index}>{item}</p>)
        return (
            <div className="info" ref="scroll">
                <h1>商家信息</h1>
                {___p___}
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

// Info = connect(mapStatetoProps, actionCreators)(Info)

export default Info;