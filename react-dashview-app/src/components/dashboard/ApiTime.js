import {useState, useEffect} from 'react'

import CurrentTimeService from '../../ApiServices/currentTimeServices'
import logo from '../../logo.svg';
import '../../App.css';

function ApiTime() {

  // render utc date and time "NOT USED"
  
  const [currentTime, setCurrentTime] = useState(0);

  const onGetCurrentTimeSuccess = (response) => {
    let result = response.time;
    console.log(`result: ${result}`)
    setCurrentTime((prevState) => { 
      let newState = {...prevState};
      newState = result;
      console.log(`newState: ${newState}`)
      return newState;
    });
  };

  const onGetCurrentTimeError = (error) => {
    console.log({Error: error})
  };

  useEffect(() => {
    CurrentTimeService.getCurrentTime()
    .then(onGetCurrentTimeSuccess)
    .catch(onGetCurrentTimeError);
  },[]);
 
  return (
    <div className="text-center">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h3>CURRENT TIME IS: {currentTime}</h3>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default ApiTime;
