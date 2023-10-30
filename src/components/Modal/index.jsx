import React from "react"
import Modal from "react-modal";
import "./style.css"

const customStyles = {
    content: {
      top: "40%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
      borderRadius: "8px",
      background: "#40b9ff",
    },
    overlay: { zIndex: 1000 },
  };


const MyModal = ({isOpen, onClose, children}) => {
    
    return (
        <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        style={customStyles}
        shouldCloseOnOverlayClick={false}
      >
        <div className="container-modal">
          {children}
        </div>
      </Modal>
    )
}

export default MyModal