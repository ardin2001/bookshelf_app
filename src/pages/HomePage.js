import React from 'react';
import { useSearchParams } from 'react-router-dom';
import {getActiveNotes,archiveNote,deleteNote} from '../utils/network';
import CardList from '../component/CardList'
import SearchBar from '../component/SearchBar';
import LocaleContext from '../context/LocaleContext';
 
function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [active_notes, setNotes] = React.useState([]);
  const [keyword, setKeyword] = React.useState(() => {
    return searchParams.get('keyword') || ''
  });
  const { locale } = React.useContext(LocaleContext);
  React.useEffect(() => {
    getActiveNotes().then(({ data }) => {
      setNotes(data);
    });
  }, []);
  async function onDeleteHandler(id) {
    await deleteNote(id);
    const { data } = await getActiveNotes();
    setNotes(data);
  }
  async function onArchivedHandler(id) {
    await archiveNote(id);
    const { data } = await getActiveNotes();
    setNotes(data);
  }
  function onKeywordChangeHandler(keyword) {
    setKeyword(keyword);
    setSearchParams({ keyword });
  }
  const filteredNotes = active_notes.filter((note) => {
    return note.title.toLowerCase().includes(
      keyword.toLowerCase()
    );
  });
  return (
    <section>
      <SearchBar keyword={keyword} keywordChange={onKeywordChangeHandler} />
      <h2>{locale === 'id' ? 'Daftar Catatan' : 'Notes List'}</h2>
      <CardList notes={filteredNotes} onArchived={onArchivedHandler} onDelete={onDeleteHandler} />
    </section>
  )
}
export default HomePage;