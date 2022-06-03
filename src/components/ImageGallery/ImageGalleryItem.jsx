import styles from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

function ImageGalleryItem({
  id,
  webformatURL,
  largeImageURL,
  tags,
  toggleModal,
}) {
  return (
    <li className={styles.ImageGalleryItem}>
      <img
        src={webformatURL}
        alt={tags}
        className={styles.ImageGalleryItemImage}
        onClick={() => toggleModal(largeImageURL, tags)}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string,
  toggleModal: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
