import './index.css';
import Header from 'components/Header';
import React from 'react';
import { useSelector } from 'react-redux';
import Course from 'components/Course';
import ProfileDetails from 'components/ProfileDetails';
import profileImage from '../../images/profile-image.png';

function ProfilePage() {
  const initialState = useSelector(state => state);
  const { global } = initialState;
  const searchedEnrolledCoursesInfo = global.searchResultsEnrolledCourses;
  return (
    <>
      <Header isHome />
      <div className="profile-body">
        <img src={profileImage} alt="profile" className="profileImage" />
        <div className="profile-containers">
          <div className="profile-container1">
            <div className="user-details-container2 user-details-container">
              <div className="initial-container initial-container1">
                <p className="initial initial3">{global.loggedinUserInitial}</p>
              </div>
              <div className="username-container">
                <p className="profile-name">{global.loggedinUsername}</p>
                <p className="email">{global.loggedinUserEmail}</p>
              </div>
            </div>
            <ProfileDetails />
          </div>
          <div className="profile-container2">
            <h1 className="profile-name registered-for">You Registered For</h1>
            <div className="profile-course-cards">
              {searchedEnrolledCoursesInfo.map(eachItem => (
                <Course
                  key={eachItem._id}
                  coursedetails={eachItem}
                  isenroll={false}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
