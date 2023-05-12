import { GalletyItem, GalleryItemImage } from './ImageGalleryItem.styled';

import {Modal} from '../Modal/Modal'

export const ImageGalleryItem = ({isOpen, largeImageURL, webformatURL, open}) => {



    return (
      <GalletyItem className="gallery-item" onClick={() => isOpen()}>
        <GalleryItemImage src={webformatURL} alt="" />
        {open && <Modal largeImageURL={largeImageURL}></Modal>}
      </GalletyItem>
    );
  }

// PROPS { id, webformatURL, largeImageURL }
