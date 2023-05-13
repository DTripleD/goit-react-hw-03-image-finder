import { Component } from 'react';
import {
  SearchForm,
  SearchbarWrapper,
  SearchFormButton,
  SearchFormInput,
  SearchFormButtonLabel,
} from './Searchbar.styled';

export class Searchbar extends Component {
  state = {
    inputValue: '',
  };

  changeState = event => {
    event.preventDefault();
    this.setState({ inputValue: event.target.value.trim() });
  };

  render() {
    return (
      <SearchbarWrapper>
        <SearchForm
          onSubmit={event => {
            console.log();
            event.preventDefault();
            this.props.onSubmit(this.state.inputValue);
            event.target.input.value = '';
          }}
        >
          <SearchFormButton type="submit">
            <SearchFormButtonLabel>Search</SearchFormButtonLabel>
          </SearchFormButton>
          <SearchFormInput
            onChange={this.changeState}
            type="text"
            name="input"
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </SearchForm>
      </SearchbarWrapper>
    );
  }
}
