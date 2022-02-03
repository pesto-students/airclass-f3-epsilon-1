import React, { useState, useEffect} from 'react';
import './index.css';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import DiscussionSolution from '../../components/DiscussionSolution';
import Header from '../../components/Header';
import { URL } from '../../containers/App/constants';
import { trackPromise } from 'react-promise-tracker';
import { usePromiseTracker } from "react-promise-tracker";
import LoadingSpinnerComponent from 'components/LoadingIndicator';
import axios from 'axios';

function DiscussionSoultionsPage() {
  const initialState = useSelector(state => state);
  const { global } = initialState;
  const { selectedDiscussion, selectedDiscussionSolutions } = global;
  const [errorMsg, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [replyValue, setReplyValue] = useState('');
  const [toggleReply, setToggleReply] = useState(false);
  const updateReply = event => {
    setReplyValue(event.target.value);
  };
  const openReply = () => {
    setToggleReply(!toggleReply);
  };

  const dispatch = useDispatch();
  const updateSolution = () => {
    if(!replyValue){
      setError('Enter your Reply')
      setSuccess('')
    }
    else{
    const addDiscussionSolution =  () => {
          trackPromise(
           axios.post(`${URL}/v1/discussions/create_newDiscussionReply/${selectedDiscussion._id}`,{
            userID: global.loggedinUserId,
            discussionReply: replyValue,
            name: global.loggedinUsername,
            initialName:global.loggedinUserInitial
           })
          .then(function(response) {
            if (response.statusText === 'Created' && response.status === 201) {
              dispatch({
                type: 'ADD_SOLUTION',
                solutioninfo: response.data,
              });
              setSuccess('Reply added Successfully')
              setError('')
            }
          }).catch(function(error) {
            if (error.response.status === 401)
            setError(error.response.data.message);
          else if (error.response.status === 400)
            setError(error.response.data.message);
          else setError('Something went wrong. Please try again later.');
          setSuccess('');
          }))
        };
    
    addDiscussionSolution();
      }
  };
  const { promiseInProgress } = usePromiseTracker()
  return (
    <>
    {errorMsg && (
                <>
                  <small style={{ color: 'red' }}>{errorMsg}</small>
                  <br />
                </>
              )}
      <Header isHome />
      <div className="body">
        <div className="content">
        {promiseInProgress ? <LoadingSpinnerComponent/>: 
        <div>
          <h1 className="courses discussion">Discussions</h1>
          <NavLink className="nav-link" to="/discussionforum">
            <BiArrowBack className="back-arrow backarrow" />
          </NavLink>
          <div className="discussion-box">
            <div className="title-box1">
              <h1 className="course-title">
                {selectedDiscussion.discussionTitle}
              </h1>
              <div className="user-details-container1">
                <div className="initial-container2">
                  <p className="initial2">
                    {selectedDiscussion.initialName}
                  </p>
                </div>
                <p className="name1">
                  {selectedDiscussion.name}
                </p>
              </div>
            </div>
            <p className="discussion-details">
              {selectedDiscussion.discussionInfo}
            </p>

            <button
              type="button"
              onClick={() => openReply()}
              className="reply-btn1"
            >
              Reply
            </button>
            <div className={toggleReply ? 'reply-box' : 'no-reply-box'}>
              <textarea
                rows="5"
                cols="60"
                name="description"
                onChange={updateReply}
                className="courseinfoInput reply-area"
                placeholder="enter your reply here"
                value={replyValue}
              />
              {success && (
              <>
                <small style={{ color: 'green' }}>{success}</small>
                <br />
              </>
            )}
            {errorMsg && (
              <>
                <small style={{ color: 'red' }}>{errorMsg}</small>
                <br /> <br />
              </>
            )}
              <button
                onClick={() => updateSolution()}
                type="button"
                className="reply-btn"
              >
                Reply
              </button>
            </div>
          </div>
          <h1 className="courses">SOLUTIONS</h1>
          <div className="solutions">
            {selectedDiscussionSolutions && selectedDiscussionSolutions.map(eachItem => (
              <DiscussionSolution key={eachItem._id} solutionslist={eachItem} />
            ))}
          </div>
          </div>
           }
        </div>       
      </div>
    </>
  );
}

export default DiscussionSoultionsPage;
