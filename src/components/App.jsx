import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ImageGallery from './ImageGallery';
import Searchbar from './Searchbar';
import Modal from './Modal';
import React, { Component } from 'react';

export class App extends Component {
  state = {
    searchInfo: '',
    showModal: false,
    modalSrc: '',
    modalAlt: '',
  };

  toggleModal = (src, alt) => {
    this.setState(prevState => {
      return {
        showModal: !prevState.showModal,
        modalSrc: src,
        modalAlt: alt,
      };
    });
  };

  handleFormSubmit = searchInfo => {
    this.setState({ searchInfo: searchInfo });
  };

  render() {
    const { searchInfo, showModal, modalSrc, modalAlt } = this.state;
    return (
      <div className="App">
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery searchInfo={searchInfo} toggleModal={this.toggleModal} />
        {showModal && (
          <Modal src={modalSrc} alt={modalAlt} toggleModal={this.toggleModal} />
        )}
        <ToastContainer autoClose={2500} />
      </div>
    );
  }
}

// Сделать модалку и открытие больших изображений
