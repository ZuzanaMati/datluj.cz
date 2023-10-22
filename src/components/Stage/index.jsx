import React, { useEffect, useRef, useState } from "react";
import Wordbox from "../Wordbox";
import wordList from "../../word-list";
import "./style.css";
import MyModal from "../Modal";
import GameFinished from "../GameFinished";

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
  const timerFinishedRef = useRef(onTimerFinish);
  timerFinishedRef.current = onTimerFinish;

  useEffect(() => {
    let timer;
    if (countDownSeconds > 0) {
      setTimerValue(countDownSeconds);
      timer = setInterval(() => {
        setTimerValue((prev) => {
          if (prev === 1) {
            clearInterval(timer);
            timerFinishedRef.current();
          }
          return prev - 1;
        });
        console.log(countDownSeconds);
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => {
      clearInterval(timer);
    };
  }, [countDownSeconds]);

  return { timerValue };
};

const Stage = () => {
  const [words, setWords] = useState([
    generateWord(6),
    generateWord(6),
    generateWord(6),
  ]);
  const [mistakes, setMistakes] = useState(0);
  const [countDownSeconds, setCountDownSeconds] = useState(0);
  const [gameFinished, setGameFinished] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);

  const handleFinished = () => {
    setGameFinished(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const startGame = () => {
    setCountDownSeconds(5);
    closeModal();
  };

  const handleFinish = () => {
    setWords([...words.slice(1), generateWord(6)]);
  };

  const handleMistake = () => {
    setMistakes(mistakes + 1);
  };

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const { timerValue } = useTimer({
    countDownSeconds,
    onTimerFinish: handleFinished,
  });

  console.log({ countDownSeconds, timerValue });

  return (
    <div className="stage">
      <MyModal
        isOpen={modalIsOpen}
        onClose={closeModal}
        buttonProps={{ onClick: startGame, text: "START GAME" }}
      >
        <h2>
          Po kliknutí na tlačítko START se spustí odpočítávání. Napiš co nejvíce
          slov, za 60 sekund!!
        </h2>
      </MyModal>

      <div className="stage__mistakes">Chyb: {mistakes} </div>
      <div className="count">Count: {timerValue}</div>
      <div className="stage__words">
        {words.map((word, index) => (
          <Wordbox
            word={word}
            key={word}
            onFinish={handleFinish}
            active={index === 0 ? true : false}
            onMistake={handleMistake}
          />
        ))}
      </div>

      <div>{gameFinished ? <GameFinished /> : null}</div>
    </div>
  );
};

export default Stage;
