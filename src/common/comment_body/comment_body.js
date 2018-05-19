import React, { Component } from 'react'
import { connect } from "react-redux"
// import { actions } from "../../redux/reducer.js"
import Loading from '../../common/loading/loading.js'
import './comment_body.css'
import no from '../../../src/assets/img/no.png'
import yes from '../../../src/assets/img/yes.png'
import user from '../../../src/assets/img/default_header.png'
import { api_comments } from '../../../src/tools/api.js'
import Stars02 from '../../common/start/star.js'

class ComponentBody extends Component {
    constructor (props) {
        super(props)
        this.state = {
            cur: 0,                 // 0 : 全部, 1 : 满意,  2 : 不满意    
            comments_data: null,    // 从服务器端获取的评论数据
            yse_or_no: false,       // 是否只显示有内容的评论
        }
    }

    change_cur (cur) {
        this.setState({cur})
    }
    filter02 () {
        if (this.state.yse_or_no===true) {
            this.setState({yse_or_no: false})
        } 
        else {
            this.setState({yse_or_no: true})
        }
    }
    get_commets_data () {
        if (this.props.comments) {
            this.setState({comments_data: this.props.comments})
        } 
        else {
            api_comments().then(res => {
                let data = res.data.data
                console.log(data, 'comments')
                this.setState({comments_data: data})
            })
        }
    }

    componentDidMount () {
        this.get_commets_data()
    }
    get_time (ms) {
        let time = new Date(ms)
        let year = time.getFullYear()
        let month = time.getMonth()+1
        let day = time.getDate()
        let hours = time.getHours()+1
        let min = time.getMinutes()+1
        let t = `${year}-${month}-${day}   ${hours}:${min}`
        return t
    }
    render() {
        let seller_data = this.props.seller_data
        let comments_data = this.state.comments_data
        let cur = this.state.cur
        let yes_no = this.state.yse_or_no===true?yes:no
        if (seller_data===null||comments_data===null) return <Loading></Loading>    
        
        let data_list
        if (this.state.cur===0) {                       // cur===0, 显示全部内容
            if (this.state.yse_or_no===true) {          // 是否只看有内容的评论
                data_list = comments_data.filter(item => item.text!=='')
            }
            else {
                data_list = comments_data             
            }
        }
        else if (this.state.cur===1) {                      // cur===1, 查看好评
            if (this.state.yse_or_no===true) {              // 是否只看有内容的评论
                data_list = comments_data.filter(item => item.text!==''&&item.rateType===0)    // rateType===0好评            
            }
            else {
                data_list = comments_data.filter(item => item.rateType===0)                
            }
        }
        else {
            if (this.state.yse_or_no===true) {
                data_list = comments_data.filter(item => item.text!==''&&item.rateType===1)         // rateType===1表示差评         
            }
            else{
                data_list = comments_data.filter(item => item.rateType===1)                
            }
        }
        let ___card_list___ = data_list.map((item, index) => {
            let ___lab___ = null
            let time = this.get_time(item.rateTime)           
            if (item.recommend&&item.recommend.length!==0) {
                let lab = item.recommend.map((item, index) => {
                    return <li key={index}>{item}</li>
                })
                let icon = <li className="icon" key="icon"></li>
                ___lab___ = [icon, ...lab]
            }
            return (
                <div className="card" key={index}>
                    <div className="left">
                        <img src={user} alt="user"/>
                    </div>
                    <div className="right">
                        <h1>{item.username}</h1>
                        <Stars02 score={item.score}></Stars02>
                        <p>{item.text}</p>
                        <ul className="labs">
                            {___lab___}
                        </ul>
                    </div>
                    <div className="time">{time}</div>
                </div>
            )
        })

        return (
            <div className='comment-body'>
                <div className="filter">
                    <span className={cur===0?'cur':''} onClick={()=>{this.change_cur(0)}}>全部 <i></i></span>
                    <span className={cur===1?'cur':''} onClick={()=>{this.change_cur(1)}}>满意</span>
                    <span className={cur===2?'cur':''} onClick={()=>{this.change_cur(2)}}>不满意</span>
                </div>
                <div className="filter02" onClick={()=>{this.filter02()}}>
                    <img src={yes_no} alt='√' />
                    <span>只看有内容的评价</span>
                </div>
                {___card_list___}
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

ComponentBody = connect(mapStatetoProps)(ComponentBody)

export default ComponentBody