import React from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import styles from './App.module.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      currentPage: 1,
      searchTerm: '',
      isLoading: false,
      modalImage: null,
      totalHits: 0
    };
    this.fetchImages = this.fetchImages.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    this.loadMore = this.loadMore.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    this.fetchImages();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchTerm !== this.state.searchTerm) {
      this.fetchImages();
    }
  }

  async fetchImages() {
    this.setState({ isLoading: true });
    const API_KEY = '40897578-245d0fcba4e598e8b9a6aae4d';
    const url = `https://pixabay.com/api/?q=${encodeURIComponent(
      this.state.searchTerm
    )}&page=${this.state.currentPage}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      this.setState(prevState => ({
        images: [...prevState.images, ...data.hits],
        totalHits: data.totalHits
      }));
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      this.setState({ isLoading: false });
      if (this.state.currentPage > 1) {
        setTimeout(() => {
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          });
        }, 100);
      }
    }
  }

  handleSearchSubmit(searchValue) {
    if (searchValue.trim() !== '' && searchValue !== this.state.searchTerm) {
      this.setState({
        images: [],
        currentPage: 1,
        searchTerm: searchValue
      });
    }
  }

  loadMore() {
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1
    }), () => {
      this.fetchImages();
    });
  }

  openModal(image) {
    this.setState({ modalImage: image });
  }

  closeModal() {
    this.setState({ modalImage: null });
  }

  render() {
    const { images, isLoading, totalHits, modalImage } = this.state;
    return (
      <div className={styles.container}>
        <Searchbar onSubmit={this.handleSearchSubmit} />
        <ImageGallery images={images} onImageClick={this.openModal} />
        {isLoading && <Loader />}
        {images.length > 0 && images.length < totalHits && !isLoading ? (
          <Button onClick={this.loadMore} />
        ) : null}
        {images.length > 0 && images.length >= totalHits && !isLoading ? (
          <p className={styles.noMoreResults}>No more results</p>
        ) : null}
        {modalImage && (
          <Modal largeImageURL={modalImage.largeImageURL} onClose={this.closeModal} />
        )}
      </div>
    );
  }
}

export default App;