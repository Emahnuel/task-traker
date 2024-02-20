
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <div className="text-center">
      <h3>React: Task Tracker</h3>
      <p className="mt-4">
        A simple task tracker built with React.js to keep track of your daily
        to-do list of tasks.
      </p>
      <small className="mt-2" style={{ color: "blue" }}>
        Version 0.1.0
      </small>
      <Link to="/" className="btn btn-block">
        Back
      </Link>
    </div>
  );
};

export default AboutUs;
