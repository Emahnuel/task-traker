import PropTypes from "prop-types";
import Button from "./Button";
import { useLocation } from "react-router-dom";
const Header = ({ title, onAdd, toggleButtonText }) => {
  // const addTask = () => {
  //   alert("Clicked");
  // };

  const location = useLocation();

  return (
    <header className="header" style={headerStyle}>
      <h1>{title}</h1>
      {location.pathname === "/" && (
        <Button
          color={toggleButtonText ? "#f1416c" : "#50cd89"}
          title={toggleButtonText ? "Close" : "Add More"}
          onClick={onAdd}
          symbol={toggleButtonText ? "x" : "+"}
        />
      )}
    </header>
  );
};

Header.defaultProps = {
  title: "Task Tracker",
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  onAdd: PropTypes.func,
};

// CSS in jsx
const headerStyle = {
  color: "#000",
  // fontWeight: 'bolder',
};

export default Header;
