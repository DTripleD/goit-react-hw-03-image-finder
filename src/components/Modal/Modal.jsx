import { Component } from 'react';
import PropTypes from 'prop-types';
import { Overlay, ModalWrapper } from './Modal.styled';

export class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.clickEsc);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.clickEsc);
  }

  clickEsc = e => {
    if (e.key === 'Escape') {
      this.props.modalClose();
    }
  };

  handleClick = event => {
    if (event.target === event.currentTarget) {
      this.props.modalClose();
    }
  };

  render() {
    return (
      <Overlay className="overlay" onClick={this.handleClick}>
        <ModalWrapper className="modal">
          <img src={this.props.largeImageURL} alt="" />
        </ModalWrapper>
      </Overlay>
    );
  }
}

Modal.propTypes = {
  modalClose: PropTypes.func,
  largeImageURL: PropTypes.string,
};
