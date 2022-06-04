import { useRef, useState } from 'react';
import styles from './Button.module.css';
import imagesAPI from '../../services/pixabay-api';
import PropTypes from 'prop-types';
import Loader from '../Loader';

function Button({ page, searchInfo, moreImgs }) {
  const [status, setStatus] = useState('idle');
  // для того что бы page не сбрасывался при каждом ререндере и вызове функции используем хук useRef
  const fetchPage = useRef(page);

  const handleClickFetchMore = async () => {
    setStatus('pending');
    fetchPage.current += 1;
    console.log(fetchPage.current);
    // pixibay-api import
    const fetchedImages = await imagesAPI.fetchImages(
      searchInfo,
      fetchPage.current
    );
    const images = fetchedImages.hits;

    setStatus('idle');
    return images;
  };

  if (status === 'pending') {
    return <Loader />;
  }

  if (status === 'idle') {
    return (
      <button
        type="button"
        className={styles.Button}
        onClick={() => moreImgs(handleClickFetchMore())}
      >
        Load more
      </button>
    );
  }
}

Button.propTypes = {
  page: PropTypes.number.isRequired,
  searchInfo: PropTypes.string.isRequired,
  moreImgs: PropTypes.func.isRequired,
};

export default Button;
