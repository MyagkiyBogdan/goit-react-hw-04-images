import { Component } from 'react';
import styles from './Button.module.css';
import imagesAPI from '../../services/pixabay-api';
import PropTypes from 'prop-types';
import Loader from '../Loader';

class Button extends Component {
  page = this.props.page;

  // idle
  // pending

  state = {
    status: 'idle',
  };

  handleClickFetchMore = async () => {
    this.setState({ status: 'pending' });
    this.page += 1;
    // pixibay-api import
    const fetchedImages = await imagesAPI.fetchImages(
      this.props.searchInfo,
      this.page
    );
    const images = fetchedImages.hits;

    this.setState({ status: 'idle' });
    return images;
  };

  render() {
    const { status } = this.state;

    if (status === 'pending') {
      return <Loader />;
    }
    if (status === 'idle') {
      return (
        <button
          type="button"
          className={styles.Button}
          onClick={() => this.props.moreImgs(this.handleClickFetchMore())}
        >
          Load more
        </button>
      );
    }
  }
}

Button.propTypes = {
  page: PropTypes.number.isRequired,
  searchInfo: PropTypes.string.isRequired,
  moreImgs: PropTypes.func.isRequired,
};

export default Button;
