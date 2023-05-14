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
  };

  onFormSubmit = (querry) => {
    this.setState({
      input: querry,
      photoList: [],
      page: 1,
      isLoading: true,
      isEmpty: false,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    const { input, page } = this.state;
    if (prevState.input !== input || prevState.page !== page) {
      Images.getImages(input, page)
        .then(({ hits, total }) => {

          if (hits.length === 0) {
                      
            this.setState({
              isEmpty: true,
              input: '',
              isSeeMore: false,
            });
            return
          }
          if(hits.length > 0){
            console.log(total);
            return this.setState(prevState => ({
              photoList: [...prevState.photoList, ...hits],
              isSeeMore: page < Math.ceil(total / 12),
            }));
          }
        })
        .catch(error => console.log(error))
        .finally(() => {
          this.setState({ isLoading: false });
        });
    }
  }

  onLoadMore = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1, isLoading: true };
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
        {!this.state.isEmpty && (
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
