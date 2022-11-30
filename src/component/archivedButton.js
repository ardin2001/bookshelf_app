import React from 'react';
import PropTypes from 'prop-types';

function ArchivedButton({ id, onArchived,type,style }) {
  return <button className={`btn btn-${style}`} onClick={() => onArchived(id)}>{type}</button>
}

ArchivedButton.propTypes = {
  id: PropTypes.string.isRequired,
  onArchived : PropTypes.func.isRequired,
  type : PropTypes.object.isRequired,
  style : PropTypes.string.isRequired,
}

export default ArchivedButton;