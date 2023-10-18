import React, { useEffect, useState } from 'react';
import './style.css';

const Wordbox = ({ word, onFinish, active, onMistake, firstWord }) => {
  const [lettersLeft, setLettersLeft] = useState(word);
  const [mistake, setMistake] = useState(false)

  useEffect(() => {

    const handleKeyUp = (e) => {
      if (lettersLeft[0] === e.key) {
        if (lettersLeft.length === 1) {
          onFinish()
        } else {
          setLettersLeft((prevLetter) => prevLetter.slice(1))
          setMistake(false)
        }
      } else {
        setMistake(true)
        onMistake()
        }
    }

    if (active) {
      document.addEventListener("keyup", handleKeyUp);
    }
    return () => document.removeEventListener("keyup", handleKeyUp)
  }, [lettersLeft, active, onMistake])

  return (
    <div className={mistake ? "wordbox wordbox--mistake" : "wordbox"}>{lettersLeft}</div>
  );
};

export default Wordbox;
