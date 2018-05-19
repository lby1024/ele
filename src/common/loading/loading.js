import React from 'react';
import './loading.css'
import pic_loading from '../../assets/img/loading.gif'

const Loading = () => {
    return (
        <div className="loading">
            <img src={pic_loading} alt="loading"/>
            loading...
        </div>
    )
}


export default Loading