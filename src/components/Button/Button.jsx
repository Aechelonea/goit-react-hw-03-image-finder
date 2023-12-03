import React from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.css';

class Button extends React.Component {
  render() {
    const { onClick } = this.props;

    return (
      <button className={styles.button} onClick={onClick}>
        Load more
      </button>
    );
  }
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Button;
