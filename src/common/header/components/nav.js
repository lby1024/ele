import React from 'react';
import {NavLink} from 'react-router-dom';
import './nav.css'

const Nav = () =>(
    <div className="nav">
        <NavLink exact to='/goods' className='nav-item'><h3>商品</h3></NavLink>
        <NavLink to='/comments' className='nav-item'><h3>评论</h3></NavLink>
        <NavLink to='/business' className='nav-item'><h3>商家</h3></NavLink>
    </div>
)

export default Nav;