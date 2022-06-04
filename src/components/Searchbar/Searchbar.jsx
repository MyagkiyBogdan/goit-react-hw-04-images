import React, { useState } from 'react';
import styles from './Searchbar.module.css';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

function Searchbar({ onSubmit }) {
  const [searchInputInfo, setSearchInputInfo] = useState('');

  const handleInputChange = event => {
    setSearchInputInfo(event.target.value.toLocaleLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();

    // Что бы не шли запросы с пустой строкой
    if (searchInputInfo.trim() === '') {
      return toast.error('Write what you want to find');
    }

    onSubmit(searchInputInfo);
    setSearchInputInfo('');
  };

  return (
    <header className={styles.Searchbar}>
      <form className={styles.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={styles.SearchFormButton}>
          <span className={styles.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          onChange={handleInputChange}
          value={searchInputInfo}
          className={styles.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};

export default Searchbar;
