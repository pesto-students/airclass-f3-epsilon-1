import './index.css';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { trackPromise, usePromiseTracker } from 'react-promise-tracker';

import LoadingSpinnerComponent from 'components/LoadingIndicator';
import { URL } from '../../containers/App/constants';

function Course(props) {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const history = useHistory();
  const initialState = useSelector(state => state);
  const { global } = initialState;
  const { coursedetails, enrolledCourses, isenroll } = props;
  const dispatch = useDispatch();
  let filterCourse = [];
  const enrollCourse = () => {
    trackPromise(
      axios
        .post(`${URL}/v1/courses/enrollCourse/${coursedetails._id}`, {
          user_id: global.loggedinUserId,
        })
        .then(function(response) {
          if (response.statusText === 'OK' && response.status === 200) {
            const getCourseInfo = () => {
              // trackPromise(
              axios
                .get(`${URL}/v1/courses/courseSingle/${coursedetails._id}`)
                .then(function(response2) {
                  if (
                    response2.statusText === 'OK' &&
                    response2.status === 200
                  ) {
                    dispatch({
                      type: 'ENROLL_COURSE',
                      enrolledcourse: response2.data.course,
                    });
                  }
                })
                .catch(function(err) {
                  if (err.response.status === 401)
                    setError(err.response.data.message);
                  else if (err.response.status === 400)
                    setError(err.response.data.message);
                  else
                    setError('Something went wrong. Please try again later.');
                  setSuccess('');
                });
              // )
            };
            getCourseInfo();
          }
        })
        .catch(function(er) {
          if (er.response.status === 401)
            setError(er.response.data.message);
          else if (er.response.status === 400)
            setError(er.response.data.message);
          else setError('Something went wrong. Please try again later.');
          setSuccess('');
        }),
    );
  };
  if (enrolledCourses) {
    filterCourse = enrolledCourses.filter(el => el === coursedetails._id);
  }
  const { promiseInProgress } = usePromiseTracker();
  const updateSelectedCourse = () => {
    const getSelectedCourseInfo = () => {
      trackPromise(
        axios
          .get(`${URL}/v1/contents/${coursedetails._id}`)
          .then(function(response) {
            if (response.statusText === 'OK' && response.status === 200) {
              dispatch({
                type: 'UPDATE_SELECTED_COURSE',
                courseinfo: response.data,
              });
              history.push('/coursepage');
            }
          })
          .catch(function(error) {
            if (error.response.status === 401)
              setError(error.response.data.message);
            else if (error.response.status === 400)
              setError(error.response.data.message);
            else setError('Something went wrong. Please try again later.');
            setSuccess('');
          }),
      );
    };
    getSelectedCourseInfo();
  };

  let enrollbtn;
  if (isenroll) {
    enrollbtn =
      filterCourse.length !== 0 ? (
        <button id="enroll-btn" type="button" className="enrolled">
          enrolled
        </button>
      ) : (
        <button
          id="enroll-btn"
          type="button"
          className="enroll"
          onClick={() => enrollCourse(coursedetails)}
        >
          enroll
        </button>
      );
  } else {
    enrollbtn = <></>;
  }

  return promiseInProgress ? (
    <LoadingSpinnerComponent />
  ) : (
    <div
      tabIndex={0}
      role="button"
      onKeyDown={() => updateSelectedCourse()}
      onClick={() => (isenroll ? null : updateSelectedCourse())}
      className="course-container"
    >
      <img
        alt="course"
        className="course-image"
        src={coursedetails.courseImage}
      />
      <div className="course-details">
        <h1 className="course-title">{coursedetails.courseTitle}</h1>
        <p className="course-info">{coursedetails.courseInfo}</p>

        {isenroll && enrollbtn}
      </div>
      {error && (
        <>
          <p style={{ color: 'red' }}>{error}</p>
          <br />
        </>
      )}
      {success && (
        <>
          <p style={{ color: 'green' }}>{success}</p>
          <br />
        </>
      )}
    </div>
  );
}

Course.propTypes = {
  coursedetails: PropTypes.object.isRequired,
  enrolledCourses: PropTypes.array,
  isenroll: PropTypes.bool.isRequired,
};

export default Course;
