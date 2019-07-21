import React from 'react';

import PropTypes from 'prop-types';
import Comment from '../Comment/Comment';

import './Post.css';

function Post({ data }) {
    
    return (
        <div id="post">
            <li>
                <div className="post-header">
                    <img src={data.author.avatar} />
                    <div className="details">
                        <strong>{data.author.name}</strong>
                        <span className="date">{data.date}</span>
                    </div>
                </div>
                <p className="post">
                    {data.content}
                </p>
                <div>
                    <ul>
                        <div className="divider" />
                        {data.comments.map(comment => (
                                <Comment key={comment.id} data={comment} />
                        ))}
                    </ul>
                </div>
            </li>
        </div>
    );
}

Post.propTypes = {
    data: PropTypes.any,
}


export default Post;