import React from "react";
import "./Footer.css";
import FavoriteIcon from '@material-ui/icons/Favorite';

const Footer = () => {
  return <div className="footer">
    <p>
      Created with <FavoriteIcon className="heart" fontSize="small" /> by Sanyam
    </p>
  </div>;
};

export default Footer;
