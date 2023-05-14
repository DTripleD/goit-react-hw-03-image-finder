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
    isEmpty: false,
    isSeeMore: false,
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { input, page } = this.state;

    if (prevState.input !== input || prevState.page !== page) {
      this.setState({ isLoading: true });
      Images.getImages(input, page)
        .then(({ hits, total }) => {
          if (!hits.length) {
            this.setState({
              isEmpty: true,
            });
            return;
          }

          this.setState(prevState => ({
            photoList: [...prevState.photoList, ...hits],
            isSeeMore: page < Math.ceil(total / 12),
          }));
        })
        .catch(error => {
          this.setState({ error: error.message });
        })
        .finally(() => {
          this.setState({ isLoading: false });
        });
    }
  }

  onFormSubmit = querry => {
    this.setState({
      input: querry,
      page: 1,
      photoList: [],
      isSeeMore: false,
      isEmpty: false,
      error: null,
    });
  };

  onLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1, isLoading: true }));
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
        {this.state.isEmpty ? (
          <Warning>Oops... Something went wrong</Warning>
        ) : (
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
        {this.state.error && (
          <Warning textAlign="center">Sorry. {this.state.error} ... 😭</Warning>
        )}
      </AppWrapper>
    );
  }
}
