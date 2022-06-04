import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImageGallery from './ImageGallery';
import Searchbar from './Searchbar';
import Modal from './Modal';
import React, { useState } from 'react';

export function App() {
  const [searchInfo, setSearchInfo] = useState('');
  const [showModal, setshowModal] = useState(false);
  const [modalSrc, setmodalSrc] = useState('');
  const [modalAlt, setmodalAlt] = useState('');

  const toggleModal = (src, alt) => {
    setshowModal(prevState => !prevState);
    setmodalSrc(src);
    setmodalAlt(alt);
  };

  const handleFormSubmit = searchInfo => {
    setSearchInfo(searchInfo);
  };

  return (
    <div className="App">
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery searchInfo={searchInfo} toggleModal={toggleModal} />
      {showModal && (
        <Modal src={modalSrc} alt={modalAlt} toggleModal={toggleModal} />
      )}
      <ToastContainer autoClose={2500} />
    </div>
  );
}
