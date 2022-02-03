import './index.css';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ImageUploading from 'react-images-uploading';

function AddMasterclassPopup() {
  const initialState = useSelector(state => state);
  const { global } = initialState;
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const dispatch = useDispatch();
  const [images, setImages] = useState([]);
  const maxNumber = 1;
  const onChange = imageList => {
    setImages(imageList);
  };
  const addMasterclass = (
    task = [
      images,
      masterclassTitleValue,
      masterclassSpeakerName,
      masterclassSpeakerProfession,
      masterclassSpeakerCollege,
    ],
  ) => {
    if (
      !images ||
      !masterclassTitleValue ||
      !masterclassSpeakerName ||
      !masterclassSpeakerProfession ||
      !masterclassSpeakerCollege
    ) {
      setError('Enter Required details');
      setSuccess('');
    } else {
      const searchResults = global.masterclassInfo.filter(
        el =>
          el.masterclassTitle.toLowerCase() ===
          masterclassTitleValue.toLowerCase(),
      );
      if (searchResults.length !== 0) {
        setError('Masterclass already added');
        setSuccess('');
      } else {
        dispatch({
          type: 'ADD_MASTERCLASS',
          courseinfo: task,
        });
        setSuccess('Masterclass added successfully');
        setError('');
      }
    }
  };
  const [masterclassTitleValue, setmasterclassTitleValue] = useState('');
  const [masterclassSpeakerName, setmasterclassSpeakerName] = useState('');
  const [
    masterclassSpeakerProfession,
    setmasterclassSpeakerProfession,
  ] = useState('');
  const [masterclassSpeakerCollege, setmasterclassSpeakerCollege] = useState(
    '',
  );
  const updateTitleInput = event => {
    setmasterclassTitleValue(event.target.value);
  };
  const updateSpeakerInput = event => {
    setmasterclassSpeakerName(event.target.value);
  };
  const updateSpeakerProfession = event => {
    setmasterclassSpeakerProfession(event.target.value);
  };
  const updateSpeakerCollege = event => {
    setmasterclassSpeakerCollege(event.target.value);
  };
  return (
    <div className="addcourseContainer">
      <div className="labelInputGroup">
        <h1 className="courseTitle">Masterclass Title</h1>
        <input
          type="text"
          className="masterclassTitleInput"
          placeholder="enter masterclass title"
          value={masterclassTitleValue}
          onChange={updateTitleInput}
        />
      </div>
      <div className="labelInputGroup">
        <h1 className="courseTitle">Masterclass Speaker</h1>
        <input
          type="text"
          className="masterclassTitleInput"
          placeholder="enter masterclass speaker"
          value={masterclassSpeakerName}
          onChange={updateSpeakerInput}
        />
      </div>
      <div className="labelInputGroup">
        <h1 className="courseTitle">Speaker Profession</h1>
        <input
          type="text"
          className="masterclassTitleInput"
          placeholder="enter masterclass speaker profession"
          value={masterclassSpeakerProfession}
          onChange={updateSpeakerProfession}
        />
      </div>
      <div className="labelInputGroup">
        <h1 className="courseTitle">Speaker College</h1>
        <input
          type="text"
          className="masterclassTitleInput"
          placeholder="enter masterclass speaker college"
          value={masterclassSpeakerCollege}
          onChange={updateSpeakerCollege}
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
        id="enroll-btn"
        type="button"
        className="addMasterclass enroll"
        onClick={() => addMasterclass()}
      >
        Add Masterclass
      </button>
      {error && (
        <>
          <br /> <p style={{ color: 'red' }}>{error}</p>
          <br />
        </>
      )}
      {success && (
        <>
          <br /> <p style={{ color: 'green' }}>{success}</p>
          <br />
        </>
      )}
    </div>
  );
}

export default AddMasterclassPopup;
