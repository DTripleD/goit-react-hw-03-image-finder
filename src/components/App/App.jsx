import { Component } from 'react';
import { AppWrapper, Warning } from './App.styled';
import { Searchbar, ImageGallery, Modal, Button, Loader } from 'components';
import * as Images from '../../services/ApiService';

export class App extends Component {
  state = {
    photoList: [],
    input: '',
    modalImg: '',
    isOpen: false,
    isLoading: false,
    isEmpty: false,
    isSeeMore: false,
    page: 1,
    error: null,
  };

  componentDidUpdate(_, prevState) {
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
    this.setState(prevState => ({
      page: prevState.page + 1,
      isSeeMore: false,
      isLoading: true,
    }));
  };

  toggleModal = largeImageURL => {
    this.setState({
      modalImg: largeImageURL,
      isOpen: !this.state.isOpen,
    });
  };

  render() {
    const {
      isEmpty,
      photoList,
      isSeeMore,
      isLoading,
      error,
      modalImg,
      isOpen,
    } = this.state;
    return (
      <AppWrapper>
        <Searchbar onSubmit={this.onFormSubmit} />
        {isEmpty ? (
          <Warning>Oops... Something went wrong</Warning>
        ) : (
          <ImageGallery photoList={photoList} modalOpen={this.toggleModal} />
        )}

        {isOpen && (
          <Modal largeImageURL={modalImg} modalClose={this.toggleModal} />
        )}
        {isSeeMore && <Button onLoadMore={this.onLoadMore}></Button>}
        {isLoading && <Loader />}
        {error && <Warning textAlign="center">Sorry. {error} ... 😭</Warning>}
      </AppWrapper>
    );
  }
}
