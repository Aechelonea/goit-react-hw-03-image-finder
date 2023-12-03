import React from 'react';
import styles from './Modal.module.css';

class Modal extends React.Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      this.props.onClose();
    }
  }

  render() {
    const { onClose, largeImageURL } = this.props;

    return (
      <div className={styles.overlay} onClick={onClose}>
        <div className={styles.modal}>
          <img src={largeImageURL} alt="" />
        </div>
      </div>
    );
  }
}

export default Modal;
