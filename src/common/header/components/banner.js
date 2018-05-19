import React, { Component } from 'react';
import { connect } from "react-redux"
import { actions } from '../../../redux/reducer.js'
import './banner.css'
import Alert from './alert.js'
import Loading from '../../loading/loading.js'

class Banner extends Component {

    constructor (props) {
        super(props)
        this.icon = ['减', '折', '特', '票', '保']
    }

    componentDidMount () {
        this.props.get_seller_data()
    }

    
    render() {
        let data = this.props.seller_data
        const loading = (
            <div className="banner">
                <Loading></Loading>
            </div>
        )
        if (!data) return loading

        return (
            <div className="banner">
                {/* 黑色透明部分__头像__店铺名称等 */}
                <div className="mark">      
                    <img className="left" alt="头像" src={data.avatar}/>
                    <div className="right">
                        <h1><span>品牌</span>{data.name}</h1>
                        <h2>{data.description}/{data.deliveryTime}分钟后送达</h2>
                        <h3><span className={`type${data.supports[0].type}`}>{this.icon[data.supports[0].type]}</span>{data.supports[0].description}</h3>
                    </div>
                </div>
                {/* 背景图片 */}
                <img src={data.avatar} alt="背景图片" className="background"/>
                {/* 底部标题公告 */}
                <h1 className="title" onClick={this.props.alert_show}>
                    <span></span>
                    <span>{data.bulletin}</span>
                    <span>></span>
                </h1>
                {/* 右边按钮 */}
                <div className="btn" onClick={this.props.alert_show}>{data.supports.length}个<span>></span></div>
                {/* 点击按钮弹出的框 */}
                <Alert data={data} icons={this.icon}></Alert>
            </div>
        );
    }
}

const mapStatetoProps = (state) => {
    let {seller_data} = state
    return {seller_data}
}
let {get_seller_data, alert_show} = actions
const actionCreators = {get_seller_data, alert_show}

Banner = connect(mapStatetoProps, actionCreators)(Banner)

export default Banner;