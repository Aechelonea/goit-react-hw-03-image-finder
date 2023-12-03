import React from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import styles from './ImageGallery.module.css';

class ImageGallery extends React.Component {
  render() {
    const { images, onImageClick } = this.props;

    return (
      <ul className={styles.gallery}>
        {images.map((image, index) => (
          <ImageGalleryItem key={`${image.id}-${index}`} image={image} onImageClick={onImageClick} />
        ))}
      </ul>
    );
  }
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
    })
  ).isRequired,
  onImageClick: PropTypes.func.isRequired,
};

export default ImageGallery;
