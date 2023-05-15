import PropTypes from 'prop-types';
import { ImageGalleryList } from './ImageGallery.styled';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ photoList, modalOpen }) => {
  return (
    <ImageGalleryList>
      {photoList.map(item => {
        return (
          <ImageGalleryItem
            key={item.id}
            webformatURL={item.webformatURL}
            largeImageURL={item.largeImageURL}
            modalOpen={modalOpen}
            tag={item.tags}
          />
        );
      })}
    </ImageGalleryList>
  );
};

ImageGallery.propTypes = {
  photoList: PropTypes.arrayOf(PropTypes.object),
  modalOpen: PropTypes.func,
};
