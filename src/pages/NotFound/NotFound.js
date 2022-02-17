import "./NotFound.css";
import { Link } from "react-router-dom";
import picture from "../../static/nowayhome.jpeg";

const NotFound = () => {
  return (
    <div className="notFound">
      <h2>Error 404 : Page not found</h2>
      <span>Sorry, you are lost in the multiverse of madness.</span>
      <span>But, unlike Spider-Man, there is a way Home.</span>
      <img className="img-notFound" src={picture} alt="lost Spidey" />
      <Link to="/">
        <button>Click here to come back</button>
      </Link>
    </div>
  );
};

export default NotFound;
