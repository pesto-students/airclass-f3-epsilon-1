import './index.css';
import Header from 'components/Header';
import React from 'react';
import { useSelector } from 'react-redux';
import VideoSection from 'components/VideoSection';

function MasterclassPage() {
  const initialState = useSelector(state => state);
  const { global } = initialState;
  const { selectedMasterclassInfo } = global;
  return (
    <>
      <Header isHome />
      <div className="masterclass-lecture">
        <VideoSection videoContent={selectedMasterclassInfo} />
      </div>
    </>
  );
}

export default MasterclassPage;
