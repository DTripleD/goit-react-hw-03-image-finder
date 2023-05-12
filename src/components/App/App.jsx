import { Component } from 'react';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { AppWrapper } from './App.styled';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';

const API_KEY = '34891295-3c871ab0268d353f15c88782f';

export class App extends Component {
  state = {
    photoList: [],
    input: '',
    status: false,
    isOpen: false,
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

  modalOpen = () => {
    this.setState({isOpen: true})
  }
  
  modalClose = (e) => {
    return console.log(e.key);
  }

  render() {
    return (
      <AppWrapper onKeyDown={this.modalClose}>
        <Searchbar onSubmit={this.onFormSubmit} />
        {this.state.status && (
          <ImageGallery photoList={this.state.photoList} isOpen={this.modalOpen} open={this.state.isOpen}></ImageGallery>
        )}
      </AppWrapper>
    );
  }
}
