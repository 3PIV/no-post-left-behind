// PostList.js
import React from 'react'
import PropTypes from 'prop-types'
import Post from './Post'

const PostList = ({ data, updatePostID }) => {
    return (
        <div>
        {data.length && data.map((post, i) => (
            <div onClick={() => updatePostID(post.id)} key={i}>
              <Post
                  subject={post.history[0].subject}
                  id={post.id}
              />
            </div>
        ))}
        </div>
    );
};

PostList.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
          // An object taking on a particular shape
        history: PropTypes.arrayOf(PropTypes.shape({
            subject: PropTypes.string,
            content: PropTypes.string,
        })),
        id: PropTypes.string,
        content: PropTypes.string,
    })),

};

PostList.defaultProps = {
    data: [],
};

export default PostList;