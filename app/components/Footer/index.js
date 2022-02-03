import './index.css';
import { MdEmail } from 'react-icons/md';
import { IoCall } from 'react-icons/io5';
import React from 'react';
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
} from 'react-icons/fa';
import logo from '../../images/logo3.png';

function Footer() {
  return (
    <div className="footer">
      <div className="footer-container">
        <div className="container">
          <div className="images-container">
            <img className="logo3" src={logo} alt="website-logo" />

            <div className="icons-container">
              <div className="circle-classes">
                <FaFacebookF className="icon" />
              </div>
              <div className="circle-classes">
                <FaTwitter className="icon" />
              </div>
              <div className="circle-classes">
                <FaLinkedinIn className="icon" />
              </div>
              <div className="circle-classes">
                <FaYoutube className="icon" />
              </div>
            </div>
          </div>
          <div className="reachus-container">
            <h1 className="reachus">Reach Us</h1>
            <div className="email">
              <MdEmail className="icon2" />
              <p className="email-address">suppport@airclass.tech</p>
            </div>
            <div className="email">
              <IoCall className="icon2" />
              <p className="email-address">1234567890</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
