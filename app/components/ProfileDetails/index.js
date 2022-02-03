import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './index.css';
import { trackPromise, usePromiseTracker } from 'react-promise-tracker';
import LoadingSpinnerComponent from 'components/LoadingIndicator';
import axios from 'axios';
import { URL } from '../../containers/App/constants';

function ProfileDetails() {
  const initialState = useSelector(state => state);
  const dispatch = useDispatch();
  const { global } = initialState;
  const [name, setName] = useState(global.loggedinUsername);
  const [email, setEmail] = useState(global.loggedinUserEmail);
  const [password, setPassword] = useState(global.loggedinUserPassword);
  const [success, setSuccess] = useState('');
  const [errorMsg, setError] = useState('');
  const updateProfile = () => {
    trackPromise(
      axios
        .patch(`${URL}/v1/users/${global.loggedinUserId}`, {
          name,
          email,
          password,
        })
        .then(function(response) {
          if (response.statusText === 'OK' && response.status === 200) {
            dispatch({
              type: 'UPDATE_PROFILE',
              profileinfo: [name, email, password],
            });
            setSuccess('Profile updated successfully');
            setError('');
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
  const updateName = event => {
    setName(event.target.value);
  };
  const updateEmail = event => {
    setEmail(event.target.value);
  };
  const updatePassword = event => {
    setPassword(event.target.value);
  };
  const { promiseInProgress } = usePromiseTracker();
  return promiseInProgress ? (
    <LoadingSpinnerComponent />
  ) : (
    <>
      {errorMsg && (
        <>
          <small style={{ color: 'red' }}>{errorMsg}</small>
          <br />
        </>
      )}
      <div className="details-container">
        <div className="firstname">
          <h1 className="input-title">Name</h1>
          <input
            type="text"
            className="profile-input"
            value={name}
            onChange={updateName}
          />
        </div>
        <div className="firstname">
          <h1 className="input-title">Email</h1>
          <input
            type="text"
            className="profile-input"
            defaultValue={email}
            onChange={updateEmail}
          />
        </div>
        <div className="firstname">
          <h1 className="input-title">Password</h1>
          <input
            type="text"
            className="profile-input"
            defaultValue={password}
            onChange={updatePassword}
          />
        </div>
      </div>
      {success && (
        <>
          <p style={{ color: 'green' }}>{success}</p>
          <br />
        </>
      )}
      {errorMsg && (
        <>
          <br /> <p style={{ color: 'red' }}>{errorMsg}</p>
          <br />
        </>
      )}
      <button
        type="button"
        className="addCourse update-btn"
        onClick={() => updateProfile()}
      >
        Update
      </button>
    </>
  );
}

export default ProfileDetails;
