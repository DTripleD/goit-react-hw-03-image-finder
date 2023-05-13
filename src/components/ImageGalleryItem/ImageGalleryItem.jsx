import { GalletyItem, GalleryItemImage } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({
  webformatURL,
  toggleModal,
  largeImageURL,
  tag,
}) => {
  return (
    <GalletyItem onClick={() => toggleModal(largeImageURL)}>
      <GalleryItemImage src={webformatURL} alt={tag} />
    </GalletyItem>
  );
};

// PROPS { id, webformatURL, largeImageURL }
