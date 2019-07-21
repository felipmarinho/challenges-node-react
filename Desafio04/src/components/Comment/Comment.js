import React from 'react';

import PropTypes from 'prop-types';


import './Comment.css';

function Comment({ data }) {
    return (
        <>
        <div className="post-comments">
            <img src={data.author.avatar}/>
            <div className="comment">
            <strong>{data.author.name} </strong>{data.content}
            </div>
        </div>
        </>
    );
}

Comment.propTypes = {
    data: PropTypes.any,
}

export default Comment;