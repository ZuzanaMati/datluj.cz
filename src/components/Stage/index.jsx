import React, { useEffect, useRef, useState } from "react";
import Wordbox from "../Wordbox";
import wordList from "../../word-list";
import "./style.css";
import MyModal from "../Modal";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const generateWord = (size) => {
  const sizeIndex =
    size === undefined ? Math.floor(Math.random() * wordList.length) : size - 3;

  if (sizeIndex < 0 || sizeIndex >= wordList.length) {
    return null;
  }

  const words = wordList[sizeIndex];
  const wordIndex = Math.floor(Math.random() * words.length);
  return words[wordIndex];
};

const useTimer = ({ countDownSeconds, onTimerFinish }) => {
  const [timerValue, setTimerValue] = useState(countDownSeconds);
  const [isPaused, setIsPaused] = useState(false);
  const timerFinishedRef = useRef(onTimerFinish);
  timerFinishedRef.current = onTimerFinish;

  const isPausedRef = useRef(isPaused);
  isPausedRef.current = isPaused;

  const pause = () => {
    setIsPaused(!isPaused);
  };

  useEffect(() => {
    let timer;
    if (countDownSeconds > 0) {
      setTimerValue(countDownSeconds);
      timer = setInterval(() => {
        if (!isPausedRef.current)
          setTimerValue((prev) => {
            if (prev === 1) {
              clearInterval(timer);
              timerFinishedRef.current();
            }
            return prev - 1;
          });
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => {
      clearInterval(timer);
    };
  }, [countDownSeconds]);

  return { timerValue, pause, isPaused };
};

export const consecutiveCorrectCount = (words) => {
  const wordsCopy = [...words].reverse();
  const index = wordsCopy.reduce((acc, item, index) => {
    if (item.mistake === 0 && index - 1 === acc) return index;
    else return acc;
  }, -1);
  return index + 1;
};

const Stage = () => {
  const [currentWordLength, setCurrentWordLength] = useState(3);
  const [words, setWords] = useState([
    generateWord(currentWordLength),
    generateWord(currentWordLength),
    generateWord(currentWordLength),
  ]);
  const [mistakes, setMistakes] = useState(0);
  const [countDownSeconds, setCountDownSeconds] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [count, setCount] = useState(0);
  const [mistakeInWord, setMistakeInWord] = useState(0);
  const [finishedWords, setfinishedWords] = useState([]);
  const [playerTargetValue, setPlayerTargetValue] = useState("");
  const [players, setPlayers] = useState([]);

  const handleTimerFinish = () => {
    setGameOver(true);
  };

  const handleGameOver = () => {
    setGameOver(false);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const sixtySecondsStartGamee = () => {
    setCountDownSeconds(60);
    closeModal();
  };

  const twoMinuteStartGame = () => {
    setCountDownSeconds(120);
    closeModal();
  };

  const fiveMinuteStartGame = () => {
    setCountDownSeconds(300);
    closeModal();
  };

  const handleFinish = () => {
    const allWords = [
      ...finishedWords,
      { word: words[0], mistake: mistakeInWord },
    ];

    const correctCount = consecutiveCorrectCount(allWords);

    if (correctCount % 5 === 0 && correctCount) {
      if (currentWordLength < 20) setCurrentWordLength((prev) => prev + 1);
      setWords([
        generateWord(currentWordLength + 1),
        generateWord(currentWordLength + 1),
        generateWord(currentWordLength + 1),
      ]);
    } else {
      setWords([...words.slice(1), generateWord(currentWordLength)]);
    }
    setCount((prev) => prev + 1);
    setMistakeInWord(0);
    setfinishedWords(allWords);
  };

  // useEffect(() => {
  //   console.log({
  //     currentWordLength,
  //     words,
  //     mistakes,
  //     countDownSeconds,
  //     gameOver,
  //     modalIsOpen,
  //     count,
  //     mistakeInWord,
  //     finishedWords,
  //     playerTargetValue,
  //     players,
  //   });
  // }, [
  //   count,
  //   countDownSeconds,
  //   currentWordLength,
  //   finishedWords,
  //   gameOver,
  //   mistakeInWord,
  //   mistakes,
  //   modalIsOpen,
  //   playerTargetValue,
  //   players,
  //   words,
  // ]);

  const handleMistake = () => {
    setMistakes(mistakes + 1);
    setMistakeInWord((prev) => prev + 1);
  };

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    const newPlayer = {
      name: playerTargetValue,
      score: count,
      time: countDownSeconds,
    };

    localStorage.setItem("players", JSON.stringify([...players, newPlayer]));
    setPlayers(players.concat(newPlayer));
    navigate("/results");
  };

  useEffect(() => {
    if (localStorage.getItem("players")) {
      setPlayers(JSON.parse(localStorage.getItem("players")));
    }
  }, []);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const handlePause = () => {
    pause();
    console.log(isPaused);
  };

  const { timerValue, pause, isPaused } = useTimer({
    countDownSeconds,
    onTimerFinish: handleTimerFinish,
  });

  return (
    <div className="stage">
      <MyModal isOpen={modalIsOpen} onClose={closeModal}>
        <h2>Zvol si délku hry.</h2>
        <button className="button-modal" onClick={sixtySecondsStartGamee}>
          60 sekund
        </button>
        <button className="button-modal" onClick={twoMinuteStartGame}>
          2 minuty
        </button>
        <button className="button-modal" onClick={fiveMinuteStartGame}>
          5 minut
        </button>
      </MyModal>

      <MyModal isOpen={gameOver} onClose={handleGameOver}>
        <h2 className="modal_h2_stage">GAME OVER</h2>
        <h3 className="modal_h3_stage">Počet chyb: {mistakes}</h3>
        <h3 className="modal_h3_stage">Počet správných slov: {count}</h3>
        <h3 className="modal_h3_stage_mistakeword">Počet chyb ve slově: </h3>
        {finishedWords
          .filter((word) => word.mistake !== 0)
          .map((item) => (
            <li className="modal_li_stage" key={item.word}>
              {item.mistake} - {item.word}
            </li>
          ))}

        <form className="modal_stage_form" onSubmit={handleSubmit}>
          <label className="modal_stage_label">
            Zadej jméno hráče:
            <input
              id="player"
              onChange={(e) => setPlayerTargetValue(e.target.value)}
            ></input>
          </label>
          <button className="button-modal-stage" type="submit">
            Odeslat výsledky
          </button>
        </form>
        <Link className="modal_link_stage" to="/">
          Úvodní stránka
        </Link>
      </MyModal>

      <div className="stage_links">
        <Link to="/">Úvodní strana</Link>
        <Link to="/trenink">Procvičování</Link>
        <Link to="/results">Výsledky</Link>
      </div>

      <h1>Hra s časovým cílem</h1>
      <div className="stage_score">
        <div className="count">
          Zbývající čas:{" "}
          <strong>
            {Math.floor(timerValue / 60)}:{timerValue % 60}
          </strong>
        </div>
        <div className="stage__mistakes">Počet chyb: {mistakes}</div>
        <div className="stage__wordcount">Počet správných slov: {count} </div>
      </div>
      <div className="stage__words">
        {words.map((word, index) => (
          <Wordbox
            word={word}
            key={word}
            onFinish={handleFinish}
            active={
              index === 0 && !modalIsOpen && !gameOver && !isPaused
                ? true
                : false
            }
            onMistake={handleMistake}
          />
        ))}
      </div>
      <div className="buttons-stage">
        <button className="button-finish" onClick={handleTimerFinish}>
          Ukončit
        </button>
        <button className="button-finish" onClick={handlePause}>
          {isPaused ? "Pokračovat ve hře" : "Pauza"}
        </button>
      </div>
    </div>
  );
};

export default Stage;
