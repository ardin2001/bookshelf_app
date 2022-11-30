import React from 'react';
import useInput from "./useInput";
import PropTypes from 'prop-types';
function NoteInput({onAddNote}) {
    const [title, handleTitleChange] = useInput('');
    const [body, handleNoteChange] = useInput('');
    const onSubmitHandler = async (event) =>{
      event.preventDefault();
      onAddNote({title,body})
    }
    return (
      <form onSubmit={onSubmitHandler} className='login-input'>
        <input placeholder='Masukkan judul...' value={title} onChange={handleTitleChange} />
        <input placeholder='Masukkan catatan...' value={body} onChange={handleNoteChange} />
        <button>Masuk</button>
      </form>
    );
}
NoteInput.propTypes = {
  onAddNote: PropTypes.func.isRequired,
};
export default NoteInput