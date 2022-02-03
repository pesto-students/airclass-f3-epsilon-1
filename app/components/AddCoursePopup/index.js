import './index.css';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ImageUploading from 'react-images-uploading';

function AddCoursePopup() {
  const initialState = useSelector(state => state);
  const { global } = initialState;
  const dispatch = useDispatch();
  const [images, setImages] = React.useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const maxNumber = 1;
  const onChange = imageList => {
    setImages(imageList);
  };
  const addCourse = (task = [images, coursetitleValue, courseinfoValue]) => {
    if (!images || !coursetitleValue || !courseinfoValue) {
      setError('Enter Required details');
      setSuccess('');
    } else {
      const searchResults = global.initialAllCoursesInfo.filter(
        el => el.courseTitle.toLowerCase() === coursetitleValue.toLowerCase(),
      );
      if (searchResults.length !== 0) {
        setError('Course already added');
        setSuccess('');
      } else {
        dispatch({
          type: 'ADD_COURSE',
          courseinfo: task,
        });
        setSuccess('Course added successfully');
        setError('');
      }
    }
  };
  const [coursetitleValue, setcoursetitleValue] = useState('');
  const [courseinfoValue, setcourseinfoValue] = useState('');
  const updateTitleInput = event => {
    setcoursetitleValue(event.target.value);
  };
  const updateInfoInput = event => {
    setcourseinfoValue(event.target.value);
  };

  return (
    <div className="addcourseContainer">
      <div className="labelInputGroup">
        <h1 className="courseTitle">Course Title</h1>
        <input
          type="text"
          className="coursetitleInput"
          placeholder="enter course title"
          value={coursetitleValue}
          onChange={updateTitleInput}
        />
      </div>

      <div className="labelInputGroup">
        <h1 className="courseTitle">Course Description</h1>
        <textarea
          rows="5"
          cols="60"
          name="description"
          onChange={updateInfoInput}
          className="courseinfoInput"
          placeholder="enter course description"
          value={courseinfoValue}
        />
      </div>
      <div className="Image-Upload">
        <ImageUploading
          multiple
          value={images}
          onChange={onChange}
          maxNumber={maxNumber}
          dataURLKey="data_url"
        >
          {({
            imageList,
            onImageUpload,
            onImageUpdate,
            onImageRemove,
            isDragging,
            dragProps,
          }) => (
            // write your building UI
            <div className="upload__image-wrapper">
              <button
                type="button"
                className="addCourse uploadImage"
                style={isDragging ? { color: 'red' } : null}
                onClick={onImageUpload}
                {...dragProps}
              >
                Upload Image
              </button>
              &nbsp;
              {imageList.map((image, index) => (
                <div className="image-item">
                  <img src={image.data_url} alt="" width="100" />
                  <div className="image-item__btn-wrapper">
                    <button
                      type="button"
                      className="enrolled"
                      onClick={() => onImageUpdate(index)}
                    >
                      Update
                    </button>
                    <button
                      type="button"
                      className="enrolled"
                      onClick={() => onImageRemove(index)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ImageUploading>
      </div>
      <button
        type="button"
        id="enroll-btn"
        className="addCourse "
        onClick={() => addCourse()}
      >
        Add Course
      </button>
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

export default AddCoursePopup;
