import {Overlay, ModalWrapper} from './Modal.styled'

export const Modal = ({largeImageURL}) => {
  return (
    <Overlay className="overlay">
      <ModalWrapper className="modal">
        <img src={largeImageURL} alt="" />
      </ModalWrapper>
    </Overlay>
  );
};
