import React from 'react'
import ReactDom from 'react-dom'

import WorkoutForm from './WorkoutForm';

const Modal = ({ handleClose, workout: {title, reps, sets, _id} }) => {

  return ReactDom.createPortal(
    <div className='modal display-block'>
      <section className="modal-main">
        <WorkoutForm handleClose={handleClose} workout={{title, reps, sets, id: _id}} />
        <button className='modal-button material-symbols-outlined delete' type="button" onClick={handleClose}>
          Close
        </button>
      </section>
    </div>,
    document.getElementById('portal')
  )
}

export default Modal;