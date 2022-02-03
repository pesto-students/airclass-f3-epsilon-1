import './index.css';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { URL } from '../../containers/App/constants';

function AddDiscussionPopup() {
  const dispatch = useDispatch();
  const initialState = useSelector(state => state);
  const { global } = initialState;
  const [discussiontitleValue, setdiscussiontitleValue] = useState('');
  const [discussioninfoValue, setdiscussioninfoValue] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const updateTitleInput = event => {
    setdiscussiontitleValue(event.target.value);
  };
  const updateInfoInput = event => {
    setdiscussioninfoValue(event.target.value);
  };
  const addDiscussion = () => {
    if (!discussiontitleValue || !discussioninfoValue) {
      setError('Enter Required details');
      setSuccess('');
    } else {
      axios
        .post(
          `${URL}/v1/discussions/create_newDiscussion/${global.loggedinUserId}`,
          {
            discussionTitle: discussiontitleValue,
            discussionInfo: discussioninfoValue,
            name: global.loggedinUsername,
            initialName: global.loggedinUserInitial,
          },
        )
        .then(function(response) {
          dispatch({
            type: 'ADD_DISCUSSION',
            discussioninfo: response.data,
          });
          setSuccess('Discussion posted successfully');
          setError('');
        })
        .catch(function(err) {
          if (err.response.status === 401) setError(err.response.data.message);
          else if (err.response.status === 400)
            setError(err.response.data.message);
          else setError('Something went wrong. Please try again later.');
          setSuccess('');
        });
    }
  };

  return (
    <>
      <div className="addcourseContainer">
        <div className="labelInputGroup">
          <h1 className="courseTitle">Discussion Title</h1>
          <input
            type="text"
            className="coursetitleInput"
            placeholder="enter discussion title"
            value={discussiontitleValue}
            onChange={updateTitleInput}
          />
        </div>

        <div className="labelInputGroup">
          <h1 className="courseTitle">Discussion Description</h1>
          <textarea
            rows="5"
            cols="60"
            name="description"
            onChange={updateInfoInput}
            className="courseinfoInput"
            placeholder="enter discussion description"
            value={discussioninfoValue}
          />
        </div>
        <button
          type="button"
          id="enroll-btn"
          className="addCourse "
          onClick={() => addDiscussion()}
        >
          Post Discussion
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
    </>
  );
}

export default AddDiscussionPopup;
