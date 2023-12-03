import React from 'react';
import PropTypes from 'prop-types';
import styles from './ImageGalleryItem.module.css';

class ImageGalleryItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { onImageClick, image } = this.props;
    if (onImageClick) {
      onImageClick(image);
    }
  }

  render() {
    const { image } = this.props;
    return (
      <li className={styles.galleryItem} onClick={this.handleClick}>
        <img src={image.webformatURL} alt={image.tags} />
      </li>
    );
  }
}

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    id: PropTypes.number.isRequired,
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string,
  }).isRequired,
  onImageClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;