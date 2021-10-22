import PropTypes from "prop-types";
// import s from "./ImageGallery.module.css";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";

const ImageGallery = ({ data, handleLargeImage }) => {
  return (
    <ul className="ImageGallery">
      {data.map(({ id, webformatURL, largeImageURL }) => (
        <li key={id} className="ImageGalleryItem">
          <ImageGalleryItem
            webformatURL={webformatURL}
            largeImageURL={largeImageURL}
            onClick={handleLargeImage}
          />
        </li>
      ))}
    </ul>
  );
};

ImageGallery.prototype = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    }).isRequired
  ),
  handleLargeImage: PropTypes.func.isRequired,
};

export default ImageGallery;
