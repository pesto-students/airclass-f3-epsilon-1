import React from 'react';
import './index.css';
import PropTypes from 'prop-types';

function DiscussionSolution(props) {
  const { solutionslist } = props;
  return (
    <>
      <div className="discussion-box">
        <div className="user-details">
          <div className="initial-container2">
            <p className="initial4">{solutionslist.initialName}</p>
          </div>
          <p className="name2">{solutionslist.name}</p>
        </div>
        <p className="solution">{solutionslist.discussionReply}</p>
      </div>
    </>
  );
}
DiscussionSolution.propTypes = {
  solutionslist: PropTypes.object.isRequired,
};

export default DiscussionSolution;
