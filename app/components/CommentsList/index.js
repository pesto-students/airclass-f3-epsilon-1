import React from 'react';
import './index.css';
import PropTypes from 'prop-types';

function CommentsList(props) {
  const { commentsItem } = props;
  return (
    <div className="comments-box">
      <div className="comment-user">
        <div className="initial-container">
          <p className="initial">{commentsItem.initial}</p>
        </div>
        <p className="comment-name">{commentsItem.username}</p>
      </div>
      <p className="user-comment">{commentsItem.comment}</p>
    </div>
  );
}
CommentsList.propTypes = {
  commentsItem: PropTypes.object.isRequired,
};

export default CommentsList;
