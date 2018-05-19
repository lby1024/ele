import React, { Component } from 'react'
import { connect } from "react-redux"
import Stars from '../../common/start/star.js'
import Loading from '../../common/loading/loading.js'
import './business.css'
import Scroll from '../goods/components/scroll.js'
import Scroll02 from './components/scroll02.js'
import Info from './components/info.js'

class Seller extends Component {

    constructor (props) {
        super(props)
        this.state = {
            is_collection: true
        }
    }
    collection () {
        if (this.state.is_collection) {
            this.setState({is_collection: false})
        }
        else {
            this.setState({is_collection: true})
        }
    }
    render() {
        let data = this.props.seller_data
        if (!data) return  <Loading></Loading>
        let class_collection = this.state.is_collection?'collection cur':'collection'
        let ___list___ = data.supports.map((item, index) => {
            return <div className="support" key={index}><i className={'icon'+index}></i>{item.description}</div>
        })
        return (
            <div className="seller">
                <Scroll>
                    <div>
                        <div className="title">
                            <div className="name">
                                <h1>{data.name}</h1>
                                <div className="score">
                                    <Stars score={data.foodScore}></Stars>
                                    <span>评论{data.ratingCount}-月销量{data.sellCount}份</span>
                                </div>
                                <i className={class_collection} onClick={()=>{this.collection()}}>收藏</i>
                            </div>
                            <div className="data">
                                <div>
                                    <div>起送价</div>
                                    <div><span>{data.minPrice}</span>元</div>
                                </div>
                                <div>
                                    <div>商家配送</div>
                                    <div><span>{data.deliveryPrice}</span>元</div>
                                </div>
                                <div>
                                    <div>平均配送时间</div>
                                    <div><span>{data.deliveryTime}</span>分钟</div>
                                </div>
                            </div>
                        </div>
                        <div className="notic">
                            <div className="title01">公告与活动</div>
                            <div className="bulletin">{data.bulletin}</div>
                            {___list___}
                        </div>
                        <div className="pic">
                            <div className="header">店铺实景</div>
                            <div className="scroll">
                                <Scroll02 list={data.pics}></Scroll02>
                            </div>
                        </div>
                        <Info list={data.infos}></Info>
                    </div>
                </Scroll>
            </div>
        )
    }
}

const mapStatetoProps = (state) => {
    let {seller_data} = state
    return {seller_data}
}

// let {} = actions
// const actionCreators = {}

Seller = connect(mapStatetoProps)(Seller)

export default Seller



// {
//     "name": "粥品香坊（回龙观）",
//     "description": "蜂鸟专送",
//     "deliveryTime": 38,
//     "score": 4.2,
//     "serviceScore": 4.1,
//     "foodScore": 4.3,
//     "rankRate": 69.2,
//     "minPrice": 20,
//     "deliveryPrice": 4,
//     "ratingCount": 24,
//     "sellCount": 90,
//     "bulletin": "粥品香坊其烹饪粥料的秘方源于中国千年古法，在融和现代制作工艺，由世界烹饪大师屈浩先生领衔研发。坚守纯天然、0添加的良心品质深得消费者青睐，发展至今成为粥类的引领品牌。是2008年奥运会和2013年园博会指定餐饮服务商。",
//     "supports": [
//       {
//         "type": 0,
//         "description": "在线支付满28减5"
//       },
//       {
//         "type": 1,
//         "description": "VC无限橙果汁全场8折"
//       },
//       {
//         "type": 2,
//         "description": "单人精彩套餐"
//       },
//       {
//         "type": 3,
//         "description": "该商家支持发票,请下单写好发票抬头"
//       },
//       {
//         "type": 4,
//         "description": "已加入“外卖保”计划,食品安全保障"
//       }
//     ],
//     "avatar": "http://static.galileo.xiaojukeji.com/static/tms/seller_avatar_256px.jpg",
//     "pics": [
//       "http://fuss10.elemecdn.com/8/71/c5cf5715740998d5040dda6e66abfjpeg.jpeg?imageView2/1/w/180/h/180",
//       "http://fuss10.elemecdn.com/b/6c/75bd250e5ba69868f3b1178afbda3jpeg.jpeg?imageView2/1/w/180/h/180",
//       "http://fuss10.elemecdn.com/f/96/3d608c5811bc2d902fc9ab9a5baa7jpeg.jpeg?imageView2/1/w/180/h/180",
//       "http://fuss10.elemecdn.com/6/ad/779f8620ff49f701cd4c58f6448b6jpeg.jpeg?imageView2/1/w/180/h/180"
//     ],
//     "infos": [
//       "该商家支持发票,请下单写好发票抬头",
//       "品类:其他菜系,包子粥店",
//       "北京市昌平区回龙观西大街龙观置业大厦底商B座102单元1340",
//       "营业时间:10:00-20:30"
//     ]
//   }