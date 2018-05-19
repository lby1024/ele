import React, { Component } from 'react';
import pic_star from '../../assets/img/star36_on@3x.png'
import pic_half_star from '../../assets/img/star36_half@3x.png'
import pic_off_star from '../../assets/img/star36_off@3x.png';
import './star.css'

class Start extends Component {

    constructor (props) {
        super(props)
        this.start_number = 0
    }

    has_half (score) {
         
    }
    render() {
        let start_number = Math.floor(this.props.score)
        let has_half = this.props.score%1>0.5?true:false
        let star_list = []
        for (let i=0; i<start_number; i++) {
            star_list.push(<img className="star" src={pic_star} alt="星星" key={i}/>)
        }
        if (has_half) star_list.push(<img className="star" src={pic_half_star} alt="半颗星" />)
        if (star_list.length<5) {
            let n = 5-star_list.length
            for (let i=0; i<n; i++) {
                star_list.push(<img className="star" src={pic_off_star} alt="暗色星星" key={'gray'+i} />)
            }
        }
        return (
            <div className="stars">
                {star_list}
            </div>
        );
    }
}

export default Start