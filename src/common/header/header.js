import React, { Component } from 'react';
import Nav from './components/nav.js'
import Banner from './components/banner.js'

class Header extends Component {
    render() {
        return (
            <div className="header">
                <Banner></Banner>
                <Nav></Nav>
            </div>
        );
    }
}

export default Header;