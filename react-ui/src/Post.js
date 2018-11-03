// Comment.js
import React from 'react';
import PropTypes from 'prop-types';
import renderHTML from 'react-render-html';

const Post = props => (
  <div className="postTitle">
    {renderHTML(props.subject)}
  </div>
);

Post.propTypes = {
    subject: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
};

Post.defaultProps = {
    subject: '',
    id: '',
}

export default Post;