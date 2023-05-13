import {
  SearchForm,
  SearchbarWrapper,
  SearchFormButton,
  SearchFormInput,
  SearchFormButtonLabel,
} from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  return (
    <SearchbarWrapper>
      <SearchForm
        onSubmit={event => {
          onSubmit(event);
        }}
      >
        <SearchFormButton type="submit">
          <SearchFormButtonLabel>Search</SearchFormButtonLabel>
        </SearchFormButton>
        <SearchFormInput
          type="text"
          name="input"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </SearchbarWrapper>
  );
};
