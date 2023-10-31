import "./style.css";
import React, { useState } from "react";
import Wordbox from "../Wordbox";
import wordList from "../../word-list";
import { consecutiveCorrectCount } from "../Stage";
import MyModal from "../Modal";
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

const Practice = () => {
  const [words, setWords] = useState([
    generateWord(3),
    generateWord(3),
    generateWord(3),
  ]);
  const [mistakes, setMistakes] = useState(0);
  const [count, setCount] = useState(0);
  const [currentWordLength, setCurrentWordLength] = useState(3);
  const [finishedWords, setfinishedWords] = useState([]);
  const [mistakeInWord, setMistakeInWord] = useState(0);
  const [modalIsOpen, setIsOpen] = useState(false);

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

  const handleMistake = () => {
    setMistakes(mistakes + 1);
    setMistakeInWord((prev) => prev + 1);
  };

  const handleFinishPractice = () => {
    setIsOpen(true);
  };

  return (
    <div className="practice">
      <div className="practice_links">
        <Link to="/">Úvodní strana</Link>
        <Link to="/datlovani">Hra s časovým cílem</Link>
        <Link to="/results">Výsledky</Link>
      </div>
       

        <h1>Procvičování</h1>
        <div className="practice_score">
        <div className="practice__mistakes">Počet chyb: {mistakes} </div>
        <div className="practice__correct">Počet správných slov: {count} </div>
        </div>
        <div className="practice__words">
          {words.map((word, index) => (
            <Wordbox
              word={word}
              key={word}
              onFinish={handleFinish}
              active={index === 0 && !modalIsOpen ? true : false}
              onMistake={handleMistake}
            />
          ))}
        </div>
        <button className="button-finish" onClick={handleFinishPractice}>
          Ukončit procvičování
        </button>

        <MyModal isOpen={modalIsOpen}>
          <h2 className="modal_h2_practice">GAME OVER</h2>
          <h3 className="modal_mistakes">Počet chyb: {mistakes}</h3>
          <h3 className="modal_count">Počet správných slov: {count} </h3>
          {finishedWords
            .filter((word) => word.mistake !== 0)
            .map((item) => (
              <li className="modal_mistakes_in_word"key={item.word}>
                Počet chyb: {item.mistake} ve slově: {item.word}
              </li>
            ))}
          <Link className="modal_link" to="/">Úvodní stránka</Link>
        </MyModal>
    </div>
  );
};

export default Practice;
