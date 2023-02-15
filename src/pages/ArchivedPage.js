import React from "react";
import { getArchivedNotes, deleteNote, unarchiveNote } from "../utils/network";
import { useSearchParams } from "react-router-dom";
import CardList from "../component/CardList";
import SearchBar from "../component/SearchBar";
// import PropTypes from 'prop-types';
import LocaleContext from "../context/LocaleContext";

function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [archived_notes, setNotes] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [keyword, setKeyword] = React.useState(() => {
    return searchParams.get("keyword") || "";
  });
  const { localeContext } = React.useContext(LocaleContext);
  React.useEffect(() => {
    getArchivedNotes().then(({ data }) => {
      setNotes(data);
      setTimeout(() => {
        setLoading(true);
      }, 400);
    });
  }, []);
  async function onDeleteHandler(id) {
    await deleteNote(id);
    // const { data } = await getArchivedNotes();
    const result = archived_notes.filter(e => e.id !== id)
    setNotes(result);
  }
  async function ononUnArchivedHandler(id) {
    await unarchiveNote(id);
    // const { data } = await getArchivedNotes();
    const result = archived_notes.filter(e => {
      if(e.id === id){
        return null
      }
      return e
    })
    setNotes(result);
  }
  function onKeywordChangeHandler(keyword) {
    setKeyword(keyword);
    setSearchParams({ keyword });
  }
  const filteredNotes = archived_notes.filter((note) => {
    return note.title.toLowerCase().includes(keyword.toLowerCase());
  });
  return (
    <section>
      {console.log("loading data")}
      <SearchBar keyword={keyword} keywordChange={onKeywordChangeHandler} />
      <h2>{localeContext === "id" ? "Daftar Catatan Arsip" : "Archived Notes List"}</h2>
      {loading === true ? (
        <CardList
        notes={filteredNotes}
        onUnArchived={ononUnArchivedHandler}
        onDelete={onDeleteHandler}
      />
      ) : (
        <h3 style={{textAlign : 'center'}}>Loading Data</h3>
      )}
    </section>
  );
}
export default HomePage;
