import React, { Component } from 'react';
import CommentHeader from './components/header.js'
import CommentBody from '../../common/comment_body/comment_body.js'
import './comment.css'
import Scroll from '../../../src/page/goods/components/scroll.js'

class Comment extends Component {
    render() {
        return (
            <div className="page-comment">
                <Scroll>
                    <div className="container">
                        <CommentHeader></CommentHeader>
                        <CommentBody></CommentBody>
                    </div>
                </Scroll>
            </div>
        );
    }
}

export default Comment;