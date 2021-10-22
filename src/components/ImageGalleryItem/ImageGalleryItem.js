import PropTypes from "prop-types";
import s from "./ImageGalleryItem.module.css";

const ImageGalleryItem = ({ webformatURL, largeImageURL, onClick }) => {
  return (
    <img
      src={webformatURL}
      alt={largeImageURL}
      className={s.ImageGalleryItemImage}
      onClick={onClick}
    />
  );
};

ImageGalleryItem.prototype = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
