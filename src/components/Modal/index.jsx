import React from "react"
import Modal from "react-modal";

const customStyles = {
    content: {
      top: "30%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
    },
    overlay: { zIndex: 1000 },
  };


const MyModal = ({isOpen, onClose, buttonProps, children}) => {
    
    return (
        <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        style={customStyles}
      >
        <div className="container-modal">
          {children}
          <button className="button-modal" onClick={buttonProps.onClick}>
            {buttonProps.text}
          </button>
        </div>
      </Modal>
    )
}

export default MyModal