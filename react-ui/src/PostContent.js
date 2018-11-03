// PostContent.js
// PostList.js
import React from 'react'
import PropTypes from 'prop-types'
import renderHTML from 'react-render-html'

const PostContent = ({ postdata }) => {
    return (
        <div className = "postBoxContent">
            <p>{postdata.history && postdata.history.length && renderHTML(postdata.history[0].content)}</p>
            {postdata.children && postdata.children.length && postdata.children.map((comment, i) => (
              <div key={i}>
                {(comment.type === "s_answer" || comment.type === "i_answer") ? (
                  <div className='isAnswer'>
                    {(comment.type === "s_answer") ? (<h5>Student Answer:</h5>) : (<h5>Instructor Answer:</h5>)} 
                    {comment.history && comment.history.length && renderHTML(comment.history[0].content)}</div>
                ) : (
                  <div className='TwoLevel'><p>Follow Up:</p><hr className="invisBreak" />{renderHTML(comment.subject)}</div>
                )}
                {comment.children.length ? comment.children.map((reply, i) => (
                  <div key={i} className='ThreeLevel'>
                    {reply.type === "feedback" && (<div><p>Feedback:</p><hr className="invisBreak" />{renderHTML(reply.subject)}</div>)}
                  </div>
                )) : null}
              </div>
            ))}
        </div>
    );
};

PostContent.propTypes = {
    postdata: PropTypes.arrayOf( PropTypes.shape({
        id: PropTypes.string,
        history: PropTypes.arrayOf(PropTypes.shape({
            subject: PropTypes.string,
            content: PropTypes.string
        })),
        t: PropTypes.number,
        children: PropTypes.arrayOf(PropTypes.shape({
            history: PropTypes.arrayOf(PropTypes.shape({
                subject: PropTypes.string,
                content: PropTypes.string
            })),
            type: PropTypes.string,
        })),
    }))
};

PostContent.defaultProps = {
    postdata: []
};

export default PostContent;