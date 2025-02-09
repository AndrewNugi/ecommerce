import './Modal.css'

const Modal = ({isOpen, onClose, children}) => {
  return (
    <>
        { isOpen && (
            <div className="modal-overlay">
                <div className="modal-backdrop">
                    <div className="modal-content">
                        <button className="close-button" onClick={onClose}>
                            X
                        </button>
                        {children}
                    </div>
                </div>
            </div>
            
        )}
    </>
  )
}

export default Modal
