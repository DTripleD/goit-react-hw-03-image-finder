import { Component } from 'react';
import { AppWrapper, Warning } from './App.styled';
import { Searchbar, ImageGallery, Modal, Button, Loader } from 'components';
import * as Images from '../../services/ApiService';

export class App extends Component {
  state = {
    photoList: [],
    input: '',
    isOpen: false,
    modalImg: '',
    isLoading: false,
    page: 1,
    status: false,
    isEmpty: false,
    isSeeMore: false,
  };

  onFormSubmit = searchQuery => {
    this.setState({ input: searchQuery, photoList: [], page: 1 });
  };

  componentDidUpdate(prevProps, prevState) {
    const { input, page } = this.state;
    if (prevState.input !== input || prevState.page !== page) {
      this.setState({ isLoading: true, isEmpty: false, isSeeMore: false });
      Images.getImages(input, page)
        .then(({ hits, total }) => {
          if (hits.length === 0 || this.state.input.trim() === '') {
            return this.setState({
              isEmpty: true,
              input: '',
            });
          }
          this.setState(prevState => ({
            photoList: [...prevState.photoList, ...hits],
            isSeeMore: page < Math.ceil(total / 12),
            status: true,
          }));
        })
        .catch(error => console.log(error))
        .finally(() => {
          this.setState({ isLoading: false });
        });
    }
  }

  onLoadMore = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  modalOpen = largeImageURL => {
    this.setState({
      modalImg: largeImageURL,
      isOpen: true,
    });
  };

  modalClose = () => {
    this.setState({ isOpen: false });
  };

  render() {
    return (
      <AppWrapper>
        <Searchbar onSubmit={this.onFormSubmit} />
        {this.state.isEmpty && <Warning>Oops... Something went wrong</Warning>}
        {this.state.status && (
          <ImageGallery
            photoList={this.state.photoList}
            modalOpen={this.modalOpen}
          />
        )}
        {this.state.isOpen && (
          <Modal
            largeImageURL={this.state.modalImg}
            modalClose={this.modalClose}
          />
        )}
        {this.state.isSeeMore && <Button onLoadMore={this.onLoadMore}></Button>}
        {this.state.isLoading && <Loader />}
      </AppWrapper>
    );
  }
}
