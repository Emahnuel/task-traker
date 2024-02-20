import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <p>Copyright &copy; 2022</p>
      <Link to="/about">About Us</Link>
    </footer>
  );
};

export default Footer;
