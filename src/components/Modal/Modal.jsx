import styles from './Modal.module.css';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

const modalRoot = document.querySelector('#modal-root');

function Modal({ src, alt, toggleModal }) {
  useEffect(() => {
    console.log('add listener');
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      console.log('Remove listener');
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  function handleKeyDown(e) {
    if (e.code === 'Escape') {
      toggleModal();
    }
  }

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      toggleModal();
    }
  };

  return createPortal(
    <div className={styles.Overlay} onClick={handleBackdropClick}>
      <div className={styles.Modal}>
        <img src={src} alt={alt} />
      </div>
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  toggleModal: PropTypes.func.isRequired,
};

export default Modal;
