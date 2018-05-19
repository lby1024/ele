import React, { Component } from 'react';
import './alert.css'
import Star from '../../start/star.js'
import { connect } from "react-redux"
import { actions } from '../../../redux/reducer.js'

class Alert extends Component {

    css1 () {
        let flag = this.props.alert_show
        let css = {}
        if (flag===true) {
            css.visibility = 'visible'
        } else if (flag===false) {
            setTimeout(() => {
                css.visibility = 'visible'
                return css
            }, 1000)
        } 
        return css
    }
    css2 () {
        let flag = this.props.alert_show
        let css = {}
        if (flag===true) {
            css.visibility = 'visible'
            css.animation = 'bounce-in .5s'
        } else if (flag===false) {
            css.visibility = 'hidden'
            css.opacity = '0'
            css.animation = 'bounce-out .5s'
        } 
        return css
    }

    render() {

        let data = this.props.data    
        let icons = this.props.icons
        let list = data.supports.map((item, index) => {
            return (
                <li key={index}>
                    <span className={`type${index}`}>{icons[index]}</span>
                    <span>{item.description}</span>
                </li>
            )
        })

        return (
            <div className="alert" style={this.css2()}>
                <h1>{data.name}</h1>
                <Star score={data.score}></Star>
                <h3>优惠信息</h3>
                <ul>{list}</ul>
                <h3>商家信息</h3>
                <p>{data.bulletin}</p>
                <div className="close" onClick={this.props.alert_close}>X</div>
            </div>
        );
    }
}

const mapStatetoProps = (state) => {
    let {alert_show} = state
    return {alert_show}
}
let {alert_close} = actions
const actionCreators = {alert_close}

Alert = connect(mapStatetoProps, actionCreators)(Alert)

export default Alert