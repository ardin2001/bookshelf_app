import React from 'react';
import PropTypes from 'prop-types';

function Footer({actor,message}) {
    return (
      <footer>
        <h2>{actor}</h2>
        <p>{message}</p>
      </footer>
    )
  }
 
Footer.propTypes = {
  actor: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
}

export default Footer;