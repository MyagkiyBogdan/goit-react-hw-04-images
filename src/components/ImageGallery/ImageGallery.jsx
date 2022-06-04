import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import styles from './ImageGallery.module.css';
import ImageGalleryItem from './ImageGalleryItem';
import Button from '../Button';
import Loader from 'components/Loader';
import imagesAPI from '../../services/pixabay-api';

function ImageGallery({ searchInfo, toggleModal }) {
  // idle
  // pending
  // rejected
  // resolved
  const [images, setImages] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    if (searchInfo === '') {
      return;
    }

    setStatus('pending');
    // pixibay-api import
    imagesAPI
      .fetchImages(searchInfo, 1)
      .then(images => {
        setImages(images.hits);
        setStatus('resolved');
      })
      .catch(error => {
        setError(error);
        setStatus('rejected');
      });
  }, [searchInfo]);

  const handleImagesUpdate = moreImgs => {
    moreImgs.then(res => setImages(prevState => [...prevState, ...res]));
  };

  // render section

  if (status === 'idle') {
    return <p className={styles.text}> Hello! What you want to find?</p>;
  }

  if (status === 'pending') {
    return <Loader />;
  }

  if (status === 'rejected') {
    return <p className={styles.text}>{error.message}</p>;
  }

  if (status === 'resolved' && images.length === 0) {
    return <p className={styles.text}>No images on {searchInfo} topic</p>;
  }

  if (status === 'resolved') {
    return (
      <>
        <ul className={styles.ImageGallery}>
          {images &&
            images.map(img => (
              <ImageGalleryItem
                key={img.id}
                webformatURL={img.webformatURL}
                largeImageURL={img.largeImageURL}
                tags={img.tags}
                toggleModal={toggleModal}
              />
            ))}
        </ul>
        <Button searchInfo={searchInfo} moreImgs={handleImagesUpdate} />
      </>
    );
  }
}

ImageGallery.propTypes = {
  searchInfo: PropTypes.string,
  toggleModal: PropTypes.func.isRequired,
};

export default ImageGallery;
