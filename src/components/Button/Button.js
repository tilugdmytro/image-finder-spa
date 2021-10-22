import PropTypes from "prop-types";
// import s from "./Button.module.css";

const Button = ({ handleLoadMore }) => {
  return (
    <button type="button" className="button" onClick={handleLoadMore}>
      Load more
    </button>
  );
};

Button.prototype = {
  handleLoadMore: PropTypes.func.isRequired,
};

export default Button;
