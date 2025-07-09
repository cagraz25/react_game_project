import { useState, useEffect, useRef } from 'react';
import './App.css';
import den from "./den.png";
import bear from "./joe.png";

const hitSound = new Audio("./smash.mp3")
const missSound = new Audio('./woosh.wav')


function App() {
  const [score, setScore] = useState(0);
  const [bears, setBears] = useState(new Array(9).fill(false));

  const cursorRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * bears.length);
      showBear(randomIndex)
      setTimeout(() => {
        hideBear(randomIndex)
      }, 800);

    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [bears]);

  function showBear(index) {
    setBears(curBears => {
      const newBears = [...curBears];
      newBears[index] = true;
      return newBears;
    });
  }

  function hideBear(index) {
    setBears(curBears => {
      const newBears = [...curBears];
      newBears[index] = false;
      return newBears;
    });
  }

  function wackBear(index) {
    if (!bears[index]) return;
    hideBear(index);
    setScore((score) => score + 1);
  }

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;
    const onMouseMove = e => {
      cursor.style.top = e.pageY + 'px';
      cursor.style.left = e.pageX + 'px';
    };

    const onMouseDown = () => {
      cursor.classList.add('active');
    };

    const onMouseUp = () => {
      cursor.classList.remove('active');
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
    };

  }, []);

  return (
    <>
      <h1>Score: {score}</h1>
      <div className="grid">
        {bears.map((isBear, idx) => (
          <div key={idx} className="cell" onClick={() => {
            if (isBear) {
              wackBear(idx);
              new Audio("./smash.mp3").play();
            } else {
              new Audio("./woosh.wav").play();
            }
          }}>
            <img src={den} alt="Den" draggable="false" />
            {isBear && (
              <img src={bear} alt="Bear" className="bear" draggable="false" />
            )}
          </div>
        ))}
      </div>
      <div ref={cursorRef} className='cursor'></div>
    </>
  );

}

export default App;
