import { ImageGalleryList } from './ImageGallery.styled';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({photoList, modalOpen}) => {
  return (
    <ImageGalleryList>
      {photoList.map(item => {
        return <ImageGalleryItem key={item.id} id={item.id} webformatURL={item.webformatURL} largeImageURL={item.largeImageURL} modalOpen={modalOpen}></ImageGalleryItem>
      })}
    </ImageGalleryList>
  );
};


