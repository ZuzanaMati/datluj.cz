import React, { useEffect, useState, useRef } from 'react';
import Wordbox from '../Wordbox';
import wordList from '../../word-list';
import './style.css';

const generateWord = (size) => {
  const sizeIndex = size === undefined
    ? Math.floor(Math.random() * wordList.length)
    : size - 3;

  if (sizeIndex < 0 || sizeIndex >= wordList.length) {
    return null;
  }

  const words = wordList[sizeIndex];
  const wordIndex = Math.floor(Math.random() * words.length);
  return words[wordIndex];
};



const Stage = () => {
  const [words, setWords] = useState([generateWord(6), generateWord(6), generateWord(6)]);
  const [mistakes, setMistakes] = useState(0);
  const [count, setCount] = useState(5)

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
  
  // Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
  Modal.setAppElement('#yourAppElement');
  
  
    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);
  
    function openModal() {
      setIsOpen(true);
    }
  
    function afterOpenModal() {
      // references are now sync'd and can be accessed.
      subtitle.style.color = '#f00';
    }

    function closeModal() {
      setIsOpen(false);
    }





  const handleFinish = () => {
    setWords([...words.slice(1), generateWord(6)])
  }

  const handleMistake = () => {
    setMistakes(mistakes + 1)
  }

  
    useEffect(() => {
      const timer = setInterval(() => {
        setCount((prev) => prev - 1)
      }, 1000) 
      if (count === 0) {
        clearInterval(timer)
      }

      return () => {
        clearInterval(timer)
      }
  }, [count])


  return (
    <div className="stage">
      <div className="stage__mistakes">Chyb: {mistakes} </div>
      <div className="count">Count: {count}</div>
      <div className="stage__words">
        {words.map((word, index) =>
          <Wordbox word={word}
            key={word}
            onFinish={handleFinish}
            active={index === 0 ? true : false}
            onMistake={handleMistake} />)
        }
      </div>

      <div>
      <button onClick={openModal}>Open Modal</button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
        <button onClick={closeModal}>close</button>
        <div>I am a modal</div>
        <form>
          <input />
          <button>tab navigation</button>
          <button>stays</button>
          <button>inside</button>
          <button>the modal</button>
        </form>
      </Modal>
    </div>
    </div>
  );
};

export default Stage;
