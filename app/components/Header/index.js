import './index.css';
import React, { useState } from 'react';
import { IoIosSearch } from 'react-icons/io';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';
import logo from '../../images/logo2.png';
import discussion from '../../images/discussion3.png';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';

function Header(props) {
  const initialState = useSelector(state => state);
  const { global } = initialState;
  const { isHome } = props;
  const [searchInput, setsearchInput] = useState('');
  const dispatch = useDispatch();
  const updateSearchValue = event => {
    setsearchInput(event.target.value);
  };

  const searchCourse = () => {
    dispatch({
      type: 'SEARCH_COURSE',
      searchinfo: searchInput,
    });
  };
  return (
    <>
      <header className="header">
        <div className="header-container">
          <div className={isHome ? 'logo-search-home' : 'logo-search'}>
            <img className="header-logo" src={logo} alt="website-logo" />
            {!isHome && (
              <div className="searchbox">
                <IoIosSearch className="search-logo" />
                <input
                  placeholder="search"
                  className="input"
                  type="search"
                  value={searchInput}
                  onChange={updateSearchValue}
                  onKeyUp={() => searchCourse(searchInput)}
                />
              </div>
            )}
          </div>

          <div className="header-box">
            <NavLink className="profilepage-link" to="/discussionforum">
              <img
                className="msg-icon"
                src={discussion}
                alt="discussion-logo"
              />
            </NavLink>

            {isHome && (
              <NavLink className="nav-link-home" to="/homepage">
                <p className="home">Home</p>
              </NavLink>
            )}
            <div className="user-details-container">
              <p className="name">{global.loggedinUsername}</p>

              <Menu
                menuButton={
                  <MenuButton>
                    <div className="initial-container">
                      <p className="initial">{global.loggedinUserInitial}</p>
                    </div>
                  </MenuButton>
                }
                transition
              >
                <NavLink className="profilepage-link" to="/profilepage">
                  <MenuItem>PROFILE</MenuItem>
                </NavLink>
                <NavLink className="profilepage-link" to="/login">
                  <MenuItem>LOGOUT</MenuItem>
                </NavLink>
              </Menu>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
Header.propTypes = {
  isHome: PropTypes.bool.isRequired,
};
export default Header;
