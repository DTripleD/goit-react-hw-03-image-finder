import { Component } from 'react';
import PropTypes from 'prop-types';
import {
  SearchForm,
  SearchbarWrapper,
  SearchFormButton,
  SearchFormInput,
  SearchFormButtonLabel,
} from './Searchbar.styled';

export class Searchbar extends Component {
  state = {
    input: '',
  };

  onInput = event => {
    this.setState({ input: event.target.value.trim() });
  };

  onSearchbarSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state.input);
    this.setState({ input: '' });
  };

  render() {
    return (
      <SearchbarWrapper>
        <SearchForm onSubmit={this.onSearchbarSubmit}>
          <SearchFormButton type="submit">
            <SearchFormButtonLabel>Find</SearchFormButtonLabel>
          </SearchFormButton>
          <SearchFormInput
            onChange={this.onInput}
            type="text"
            name="input"
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.input}
          />
        </SearchForm>
      </SearchbarWrapper>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
