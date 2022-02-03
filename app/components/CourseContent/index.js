import './index.css';
import { BsClock } from 'react-icons/bs';
import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

function CourseContent(props) {
  const { classContent } = props;
  const dispatch = useDispatch();
  const playSelectedClass = () =>
    dispatch({
      type: 'PLAY_SELECTED_CLASS',
      selectedClass: classContent,
    });
  return (
    <div
      className="video-title"
      role="button"
      onClick={() => playSelectedClass()}
      onKeyDown={() => {}}
      tabIndex={0}
    >
      <h1 className="video-heading">{classContent.classTitle}</h1>
      <div className="time-group">
        <BsClock className="clock" />
        <p className="time-taken">{classContent.classDuration}</p>
      </div>
    </div>
  );
}

CourseContent.propTypes = {
  classContent: PropTypes.object.isRequired,
};

export default CourseContent;
