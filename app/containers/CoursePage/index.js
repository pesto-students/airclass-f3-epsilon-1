import './index.css';
import CourseContent from 'components/CourseContent';
import Header from 'components/Header';
import { BiArrowBack } from 'react-icons/bi';
import React, { useState } from 'react';
import { ImCross } from 'react-icons/im';
import { useSelector } from 'react-redux';
import VideoSection from 'components/VideoSection';
import { NavLink } from 'react-router-dom';

function CoursePage() {
  const initialState = useSelector(state => state);
  const { global } = initialState;
  const { selectedCourseInfo } = global;
  const { selectedClassInfo } = global;
  const [isSidebarVisible, setisSidebarVisible] = useState(true);
  const [courseSidebar, setCourseSidebar] = useState('course-sidebar-display');
  const [menuBox, setMenuBox] = useState(false);
  const displaySidebar = () => {
    setisSidebarVisible(!isSidebarVisible);
    setMenuBox(!menuBox);
    if (isSidebarVisible) {
      setCourseSidebar('course-sidebar');
    } else {
      setCourseSidebar('course-sidebar-display');
    }
  };
  return (
    <>
      <Header isHome />
      <div className="description-container">
        <div className="description-text-container">
          <h1 className="course-title1">
            {selectedCourseInfo[0].courseID.courseTitle}
          </h1>
          <p className="course-description">
            {selectedCourseInfo[0].courseID.courseDescription}
          </p>
        </div>
      </div>
      <div className="course-contents">
        <div className={courseSidebar}>
          <div className="contents-group">
            <NavLink className="nav-link" to="/homepage">
              <BiArrowBack className="back-arrow" />
            </NavLink>

            <h1 className="contents">Contents</h1>
            <ImCross className="cross-icon" onClick={displaySidebar} />
          </div>
          <div className="video-info">
            {selectedCourseInfo.map(eachItem => (
              <CourseContent
                key={eachItem._id}
                classContent={eachItem}
                className="video-selected"
              />
            ))}
          </div>
        </div>
        <VideoSection
          videoContent={selectedClassInfo}
          displaySidebar={displaySidebar}
        />
      </div>
    </>
  );
}

export default CoursePage;
