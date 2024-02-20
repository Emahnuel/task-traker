import PropTypes from "prop-types";

const Button = ({ title, symbol, color, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="btn btn-sm"
      style={{ backgroundColor: color }}
    >
      <span style={{ marginRight: '2px'}}>{symbol}</span>
      {title}
    </button>
  );
};

Button.defaultProps = {
  title: "Add",
  symbol: "+",
  color: "#50cd89",
};

Button.propTypes = {
  title: PropTypes.string,
  symbol: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

export default Button;
