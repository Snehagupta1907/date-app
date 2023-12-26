// src/App.js
import { useState, useRef, useEffect } from 'react';
import myGif1 from './assets/a5480113-7d1f-4c44-9b9e-3c365aa6ea7d_untitled_artwork (1).gif';
import myGif2 from './assets/429a890a39e70d522d52c7e52bce8535.gif';
import heartGif from './assets/giphy.gif';
import myGif3 from './assets/a5291aeaf0075ee44425e8f5d342e5c9.gif';

function App() {
  const [showHeartGif, setShowHeartGif] = useState(true);
  const [mainGif, setMainGif] = useState(myGif1);
  const [displayText, setDisplayText] = useState('Will you go on a date with me?❤️❤️');
  const [yesButtonStyle, setYesButtonStyle] = useState({});
  const [enterCounter, setEnterCounter] = useState(0);
  const [enableHover, setEnableHover] = useState(true);

  const yesButtonRef = useRef(null);

  const updateRandomPosition = () => {
    if (yesButtonRef.current) {
      const x = Math.random() * (window.innerWidth - yesButtonRef.current.offsetWidth);
      const y = Math.random() * (window.innerHeight - yesButtonRef.current.offsetHeight);

      setYesButtonStyle({
        top: `${y}px`,
        left: `${x}px`,
      });
    }
  };

  useEffect(() => {
    if (enterCounter >= 10) {
      // Reset styles and disable hover after 10 mouse enters
      setYesButtonStyle({});
      setEnterCounter(0);
      setEnableHover(false);
    }
  }, [enterCounter]);

  const handleYesClick = () => {
    setMainGif(myGif2);
    setShowHeartGif(false);
    setDisplayText('I love you! ❤️❤️');
  };

  const handleNoClick = () => {
    setMainGif(myGif3);
    setShowHeartGif(false);
    setDisplayText('Thk thk 😭😭');
  };

  const handleYesHover = () => {
    if (enableHover) {
      updateRandomPosition();
      setEnterCounter((prevCounter) => prevCounter + 1);
    }
  };

  return (
    <div className='container md:mx-auto mt-12'>
      <h1 className='font-bold text-gray-700 flex justify-center items-center text-4xl mb-6'>{displayText}</h1>
      <div className='flex flex-col items-center justify-center'>
        <img className='w-full sm:w-[300px] h-auto object-cover' src={mainGif} alt="My GIF" />
        {showHeartGif && (
          <div className='sm:absolute sm:top-44  sm:left-[700px] transform rotate-45'>
            <img className='w-16 h-16' src={heartGif} alt="Heart GIF" />
          </div>
        )}

        <div className='flex flex-row items-center justify-center gap-4 md:gap-16 mt-6'>
          <button
            ref={yesButtonRef}
            className='focus:outline-none text-white bg-pink-500 hover:bg-pink-800 focus:ring-4 focus:ring-pink-300 font-bold rounded-lg text-sm px-5 py-2.5 mb-2 yes-btn'
            type='button'
            onClick={handleYesClick}
            onMouseEnter={handleYesHover}
            style={{
              position: 'relative',
              top: yesButtonStyle.top,
              left: yesButtonStyle.left,
              transition: 'transform 0.3s ease',
            }}
          >
            Yes
          </button>
          <button className='focus:outline-none text-white bg-purple-500 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-bold rounded-lg text-sm px-5 py-2.5 mb-2' type='button' onClick={handleNoClick}>No</button>
        </div>
      </div>
    </div>
  );
}

export default App;
