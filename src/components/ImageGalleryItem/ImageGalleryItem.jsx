import { GalletyItem, GalleryItemImage } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ webformatURL, id, modalOpen }) => {
  return (
    <GalletyItem className="gallery-item" onClick={() => modalOpen(id)}>
      <GalleryItemImage src={webformatURL} alt="" />
    </GalletyItem>
  );
};

// PROPS { id, webformatURL, largeImageURL }
