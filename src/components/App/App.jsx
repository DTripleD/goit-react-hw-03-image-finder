import { Component } from 'react';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { AppWrapper } from './App.styled';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Modal } from 'components/Modal/Modal';

const API_KEY = '34891295-3c871ab0268d353f15c88782f';

export class App extends Component {
  state = {
    photoList: [],
    input: '',
    isOpen: false,
    modalImg: '',
  };

  onFormSubmit = searchQuery => {
    this.setState({ input: searchQuery });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.input !== this.state.input) {
      fetch(
        `https://pixabay.com/api/?q=cat&page=1&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(response => {
          return response.json();
        })
        .then(data => {
          console.log(data);
          this.setState({ photoList: data.hits });
        });

      this.setState({ status: true });
    }
  }

  modalOpen = id => {
    this.setState({ isOpen: true });
    this.setState({
      modalImg: this.state.photoList.find(item => item.id === id).largeImageURL,
    });
  };

  modalClose = e => {
    console.log(e.code)
    if(e.key === "Escape"){
      console.log("dfdf");
      this.setState({ isOpen: false });
    }
  };

  render() {
    return (
      <AppWrapper onKeyDown={this.modalClose}>
        <Searchbar onSubmit={this.onFormSubmit} />
        {this.state.status && (
          <ImageGallery
            photoList={this.state.photoList}
            modalOpen={this.modalOpen}
          ></ImageGallery>
        )}
        {this.state.isOpen && (
          <Modal largeImageURL={this.state.modalImg}></Modal>
        )}
      </AppWrapper>
    );
  }
}