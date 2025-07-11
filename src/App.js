import { useState, useEffect, useRef } from 'react';
import './App.css';
import den from './den.png';
import bear from './joe.png';

const hitSound = new Audio('./smash.mp3');
const missSound = new Audio('./woosh.wav');

function App() {
  const [score, setScore] = useState(0);
  const [bears, setBears] = useState(new Array(9).fill(false));
  const [hasStarted, setHasStarted] = useState(false);
  const [misses, setMisses] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const cursorRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = new Audio('./meatball.mp3');
    audio.loop = true;
    audio.load();
    audioRef.current = audio;
  }, []);

  const startGame = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(err =>
        console.log('Playback error:', err)
      );
    }
    setScore(0);
    setMisses(0);
    setGameOver(false);
    setHasStarted(true);
  };

  useEffect(() => {
    if (!hasStarted || gameOver) return;

    let isCancelled = false;

    function getRandomBetween(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function getRandomDelay(score) {
      if (score < 10) return getRandomBetween(1400, 1600);
      else if (score < 20) return getRandomBetween(1200, 1400);
      else if (score < 30) return getRandomBetween(900, 1200);
      else if (score < 40) return getRandomBetween(700, 900);
      else if (score < 50) return getRandomBetween(500, 700);
      else if (score < 60) return getRandomBetween(400, 500);
      else return 400;
    }

    function getVisibleTime(score) {
      if (score < 10) return getRandomBetween(1150, 1250);
      else if (score < 20) return getRandomBetween(1050, 1150);
      else if (score < 30) return getRandomBetween(1000, 1050);
      else if (score < 40) return getRandomBetween(950, 1000);
      else if (score < 50) return getRandomBetween(925, 950);
      else return getRandomBetween(825, 900);
    }

    function gameLoop() {
      const delay = getRandomDelay(score);
      const visibleTime = getVisibleTime(score);
      const randomIndex = Math.floor(Math.random() * bears.length);

      showBear(randomIndex);

      setTimeout(() => {
        hideBear(randomIndex);
        if (!isCancelled && !gameOver) {
          setTimeout(gameLoop, delay);
        }
      }, visibleTime);
    }

    gameLoop();

    return () => {
      isCancelled = true;
    };
  }, [hasStarted, score, bears.length, gameOver]);

  function showBear(index) {
    setBears((curBears) => {
      const newBears = [...curBears];
      newBears[index] = true;
      return newBears;
    });
  }

  function hideBear(index) {
    setBears((curBears) => {
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

    const onMouseMove = (e) => {
      cursor.style.top = e.pageY + 'px';
      cursor.style.left = e.pageX + 'px';
    };

    const onMouseDown = () => cursor.classList.add('active');
    const onMouseUp = () => cursor.classList.remove('active');

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
      {!hasStarted ? (
        <div className="start-screen">
          <img src="./title.png" alt="WHACK-A-BRUIN" className="title-image" />
          <h1 className="start-instruction">Five strikes and You're out</h1>
          <h1 className="start-instruction">Click the button to start</h1>
          <button className="start-button" onClick={startGame}>
            Start Game
          </button>
          <p className="footer-text">
            credits: Music from #Uppbeat (free for Creators!):<br />
            https://uppbeat.io/t/kevin-macleod/meatball-parade<br />
            License code: LY0HONXRY6QQCGTV
          </p>
        </div>
      ) : (
        <>
          <h1>Score: {score}</h1>
          <div className={`grid ${gameOver ? 'game-over-hidden' : ''}`}>
            {bears.map((isBear, idx) => (
              <div
                key={idx}
                className="cell"
                onClick={() => {
                  if (gameOver) return;

                  if (isBear) {
                    wackBear(idx);
                    hitSound.play();
                  } else {
                    missSound.play();
                    setMisses(prev => {
                      const nextMisses = prev + 1;
                      if (nextMisses >= 5) {
                        setGameOver(true);
                        if (audioRef.current) audioRef.current.pause();
                      }
                      return nextMisses;
                    });
                  }
                }}
              >
                <img src={den} alt="Den" draggable="false" />
                {isBear && (
                  <img
                    src={bear}
                    alt="Bear"
                    className="bear"
                    draggable="false"
                  />
                )}
              </div>
            ))}
          </div>

          {gameOver && (
            <div className="game-over">
              <h1>Game Over</h1>
              <p>You got 5 strikes!</p>
              <p>Your final score: {score}</p>
            </div>
          )}
        </>
      )}
      <div ref={cursorRef} className="cursor"></div>
    </>
  );
}

export default App;