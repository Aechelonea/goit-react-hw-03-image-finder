import React from 'react';
import { Puff } from 'react-loader-spinner';
import styles from './Loader.module.css';

class Loader extends React.Component {
  render() {
    return (
      <div className={styles.spinner}>
        <Puff color="#00BFFF" height={100} width={100} />
      </div>
    );
  }
}

export default Loader;
