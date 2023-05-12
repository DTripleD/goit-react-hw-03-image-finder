import { GalletyItem, GalleryItemImage } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ webformatURL, modalOpen , largeImageURL, tag }) => {
  return (
    <GalletyItem onClick={() => modalOpen(largeImageURL)}>
      <GalleryItemImage src={webformatURL} alt={tag} />
    </GalletyItem>
  );
};

// PROPS { id, webformatURL, largeImageURL }
