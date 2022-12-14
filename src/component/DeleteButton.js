import React from 'react';
import PropTypes from 'prop-types';
import { AiFillDelete } from 'react-icons/ai';

function DeleteButton({ id, onDelete }) {
  return <button className='btn btn-delete' onClick={() => onDelete(id)}><AiFillDelete /></button>
}

DeleteButton.propTypes = {
  id: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
}

export default DeleteButton;