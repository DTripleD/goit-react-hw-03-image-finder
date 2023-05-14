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
  render() {
    return (
      <SearchbarWrapper>
        <SearchForm
          onSubmit={event => {
            event.preventDefault();
            this.props.onSubmit(this.state.input);
            event.target.input.value = '';
          }}
        >
          <SearchFormButton type="submit">
            <SearchFormButtonLabel>Search</SearchFormButtonLabel>
          </SearchFormButton>
          <SearchFormInput
            onChange={this.onInput}
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

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
