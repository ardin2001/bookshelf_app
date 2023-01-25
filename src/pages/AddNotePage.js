import React from 'react';
import NoteInput from '../component/NoteInput';
import LocaleContext from '../context/LocaleContext';
import { addNote } from '../utils/network';
import { useNavigate } from 'react-router-dom';

function AddPage() {
  const {locale} = React.useContext(LocaleContext);
  const navigate = useNavigate();
  function onAddNoteHandler(note) {
    addNote(note)
    navigate('/');
  }
  return (
    <>
    {console.log('loading data addnote')}
      <h2>{locale === 'id' ? 'Tambah Catatan' : 'Add Note'}</h2>
      <NoteInput onAddNote={onAddNoteHandler} />
    </>
  )
}
 
export default AddPage;