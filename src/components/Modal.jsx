import './css/modal.css'

function Modal({data}) {
    return (
        <div className="modal">
            <div className='modal-container'>
                <div className="modal-title">{data.title}</div>
                <div className="modal-message">
                    {data.message}
                </div>
                <div className="modal-buttons">
                    <button  
                        className="modal-button-agree"
                        onClick={() => data.active(()=> false)}
                        >
                        Aceptar
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Modal;