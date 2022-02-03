import React, { useEffect, useState } from 'react';
import './index.css';
import CommentsList from 'components/CommentsList';
import { AiOutlineMenuFold, AiFillLike } from 'react-icons/ai';
import { BiLike } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import { URL } from '../../containers/App/constants';

function VideoSection(props) {
  const dispatch = useDispatch();
  const initialState = useSelector(state => state);
  const { global } = initialState;
  const [errorMsg, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const { commentsList } = global;
  const { videoContent, displaySidebar } = props;
  const [styleNotes, setStyleNotes] = useState('notes');
  const [styleComments, setStyleComments] = useState('comments-hide');
  const [styleNotesContainer, setStyleNotesContainer] = useState(
    'notes-container',
  );
  const [styleCommentsContainer, setStyleCommentsContainer] = useState(
    'comments-container-hide',
  );
  const [inputValue, setInputValue] = useState('');
  useEffect(() => {
    const getComments = async () => {
      if (videoContent._id) {
        const response2 = await axios({
          method: 'GET',
          url: `${URL}/v1/comments/${videoContent._id}`,
        });
        try {
          if (response2.statusText === 'OK' && response2.status === 200) {
            dispatch({
              type: 'GET_COMMENTS',
              commentsinfo: response2.data,
            });
          }
        } catch (error) {
          if (error.response.status === 401)
            setError(error.response.data.message);
          else if (error.response.status === 400)
            setError(error.response.data.message);
          else setError('Something went wrong. Please try again later.');
          setSuccess('');
        }
      }
    };
    getComments();
  }, [videoContent]);
  const clearCommentInput = () => {
    setInputValue('');
  };
  const addComment = async () => {
    if (!inputValue) {
      setError('Enter your Comment');
      setSuccess('');
    } else {
      const response = await axios({
        method: 'POST',
        url: `${URL}/v1/comments/create_newComment/${videoContent._id}`,
        data: {
          comment: inputValue,
          userID: global.loggedinUserId,
          name: global.loggedinUsername,
          initialName: global.loggedinUserInitial,
        },
      });
      try {
        dispatch({
          type: 'ADD_COMMENT',
          commentsinfo: response.data,
        });
        setError('');
        setSuccess('Comment added successfully');
      } catch (error) {
        if (error.response.status === 401)
            setError(error.response.data.message);
          else if (error.response.status === 400)
            setError(error.response.data.message);
          else setError('Something went wrong. Please try again later.');
          setSuccess('');
      }
    }
    clearCommentInput();
  };
  const likeClass = () =>{
    dispatch({
      type: 'LIKE_CLASS',
      classLikedInfo: videoContent,
    });
  }
  const updateInputValue = event => {
    setInputValue(event.target.value);
    setSuccess('');
  };
  const changeStyleComments = () => {
    setStyleComments('comments');
    setStyleNotes('notes-hide');
    setStyleNotesContainer('notes-container-hide');
    setStyleCommentsContainer('comments-container');
    setSuccess('');
    setError('');
  };
  const changeStyleNotes = () => {
    setStyleNotes('notes');
    setStyleComments('comments-hide');
    setStyleNotesContainer('notes-container');
    setStyleCommentsContainer('comments-container-hide');
    setSuccess('');
    setError('');
  };
  const displaySidebarMenu = () => {
    displaySidebar();
    setSuccess('');
    setError('');
  };

  return (
    <div className="video-content">
      <div className="title-box-course">
        <div className="menu-icon-box">
          <AiOutlineMenuFold
            className="menu-icon"
            onClick={displaySidebarMenu}
          />
        </div>

        <h1 className="title">{videoContent.classTitle}</h1>
      </div>
      <div className="coursepage-content">
        <div className="video-display">
          <div className="video-player">
            <div className="wise-iframe-wrapper">
              <iframe
                src={videoContent.classVideo}
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
                title="video"
                width="100%"
                height="100%"
              />
            </div>
          </div>
          <div className="like-section">
            <button
              type="button"
              className="like-box"
              onClick={() => likeClass()}
            >
              {videoContent.classLiked ? (
                <AiFillLike className="liked-icon" />
              ) : (
                <BiLike className="like-icon" />
              )}
              <h1 className="like">Like</h1>
            </button>
          </div>
        </div>

        <div className="notes-comments-container">
          <div className="notes-comments">
            <div
              role="button"
              onClick={changeStyleNotes}
              onKeyDown={() => {}}
              tabIndex={0}
            >
              <h1 className={styleNotes}>Notes</h1>
            </div>
            <div
              role="button"
              onKeyDown={() => {}}
              tabIndex={0}
              onClick={changeStyleComments}
            >
              <h1 className={styleComments}>Comments</h1>
            </div>
          </div>
          <div className={styleNotesContainer}>
            <ul className="notes-list">
              {videoContent.notes &&
                videoContent.notes.map(eachItem => (
                  <li key={eachItem} className="notes-text">
                    {eachItem}
                  </li>
                ))}
            </ul>
          </div>
          <div className={styleCommentsContainer}>
            <input
              type="text"
              placeholder="Enter your comments"
              className="comment-input"
              value={inputValue}
              onChange={updateInputValue}
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
              type="button"
              className="comment-button"
              onClick={() => addComment()}
            >
              Comment
            </button>
            {commentsList &&
              commentsList.map(eachItem => (
                <CommentsList key={eachItem._id} commentsItem={eachItem} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

VideoSection.propTypes = {
  videoContent: PropTypes.object.isRequired,
  displaySidebar: PropTypes.func,
};

export default VideoSection;
