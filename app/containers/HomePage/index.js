import './index.css';
import Header from 'components/Header';
import Footer from 'components/Footer';
import Course from 'components/Course';
import Masterclass from 'components/Masterclass';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';
import LoadingSpinnerComponent from 'components/LoadingIndicator';
import { trackPromise, usePromiseTracker } from 'react-promise-tracker';
import { URL } from '../App/constants';

function Homepage() {
  const [errorMsg, setError] = useState(null);
  const initialState = useSelector(state => state);
  const { global } = initialState;
  const dispatch = useDispatch();
  useEffect(() => {
    const getCourses = () => {
      trackPromise(
        axios
          .get(`${URL}/v1/courses`)
          .then(function(response) {
            if (response.statusText === 'OK' && response.status === 200) {
              const resData = response;
              dispatch({
                type: 'FETCH_ALL_COURSES',
                coursesinfo: resData.data.courses,
              });
            }
          })
          .catch(function(error) {
            if (error.response.status === 401)
              setError(error.response.data.message);
            else if (error.response.status === 400)
              setError(error.response.data.message);
            else setError('Something went wrong. Please try again later.');
          }),
      );
    };

    getCourses();
  }, []);
  const isHome = false;
  const { promiseInProgress } = usePromiseTracker();
  const searchedAllCoursesInfo = global.allCoursesInfo;
  const searchedEnrolledCoursesInfo = global.searchResultsEnrolledCourses;
  const searchedMasterclassInfo = global.searchResultsMasterClasses;
  let noAllResults = null;
  let noEnrolledResults = null;
  let noMasterclassResults = null;
  if (searchedAllCoursesInfo.length === 0) {
    noAllResults = <h1 className="no-search-results">No results found</h1>;
  }
  if (searchedEnrolledCoursesInfo.length === 0) {
    noEnrolledResults = (
      <h1 className="no-search-results">No Courses available</h1>
    );
  }
  if (searchedMasterclassInfo.length === 0) {
    noMasterclassResults = (
      <h1 className="no-search-results">No results found</h1>
    );
  }
  return (
    <div className="page">
      {errorMsg && (
        <>
          <small style={{ color: 'red' }}>{errorMsg}</small>
          <br />
        </>
      )}
      <Header isHome={isHome} />

      <div className="body">
        <div className="content">
          {promiseInProgress ? (
            <LoadingSpinnerComponent />
          ) : (
            <div>
              <h3 className="displayname">Hi {global.loggedinUsername},</h3>
              <div className="courses-container">
                <div className="courses-box">
                  <h1 className="courses">Courses</h1>
                </div>
              </div>
              {noAllResults}
              <div className="courses-display">
                <div className="courses-cards">
                  {searchedAllCoursesInfo.map(eachItem => (
                    <Course
                      key={eachItem._id}
                      coursedetails={eachItem}
                      enrolledCourses={global.loggedinUserPurchased}
                      isenroll
                    />
                  ))}
                </div>
              </div>
              <div className="courses-container">
                <div className="courses-box">
                  <h1 className="courses">Enrolled Courses</h1>
                </div>
              </div>
              {noEnrolledResults}
              <div className="courses-display">
                <div className="courses-cards">
                  {searchedEnrolledCoursesInfo.map(eachItem => (
                    <Course
                      key={eachItem._id}
                      coursedetails={eachItem}
                      isenroll={false}
                    />
                  ))}
                </div>
              </div>
              <div className="courses-container">
                <div className="courses-box">
                  <h1 className="courses">Masterclass Series</h1>
                </div>
              </div>
              {noMasterclassResults}
              <div className="masterclass-container">
                {searchedMasterclassInfo.map(eachItem => (
                  <Masterclass key={eachItem.id} coursedetails={eachItem} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default Homepage;
