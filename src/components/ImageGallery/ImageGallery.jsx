import { ImageGalleryList } from './ImageGallery.styled';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({photoList, isOpen, open}) => {
  console.log(open)
  return (
    <ImageGalleryList>
      {photoList.map(item => {
        return <ImageGalleryItem key={item.id} webformatURL={item.webformatURL} largeImageURL={item.largeImageURL} isOpen={isOpen} open={open}></ImageGalleryItem>
      })}
    </ImageGalleryList>
  );
};


