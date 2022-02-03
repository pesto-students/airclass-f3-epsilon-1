import React from 'react';
import { usePromiseTracker } from "react-promise-tracker";
import { LoopCircleLoading } from 'react-loadingg';

const LoadingIndicator = () => {
  const { promiseInProgress } = usePromiseTracker();
   return (
    <div style={{
             width: "100%",
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }} >
    {
      promiseInProgress === true ?
        <LoopCircleLoading/>
      :
        null
    }
  </div>
  );  
 }

export default LoadingIndicator;
