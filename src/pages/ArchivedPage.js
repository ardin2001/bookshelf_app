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
  const { locale } = React.useContext(LocaleContext);
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
    const { data } = await getArchivedNotes();
    setNotes(data);
    setTimeout(() => {
      setLoading(true);
    }, 400);
  }
  async function ononUnArchivedHandler(id) {
    await unarchiveNote(id);
    const { data } = await getArchivedNotes();
    setNotes(data);
    setTimeout(() => {
      setLoading(true);
    }, 400);
  }
  function onKeywordChangeHandler(keyword) {
    setKeyword(keyword);
    setSearchParams({ keyword });
  }
  const filteredNotes = archived_notes.filter((note) => {
    return note.title.toLowerCase().includes(keyword.toLowerCase());
  });
  return loading === true ? (
    <section>
      <SearchBar keyword={keyword} keywordChange={onKeywordChangeHandler} />
      <h2>
        {locale === "id" ? "Daftar Catatan Arsip" : "Archived Notes List"}
      </h2>
      <CardList
        notes={filteredNotes}
        onUnArchived={ononUnArchivedHandler}
        onDelete={onDeleteHandler}
      />
    </section>
  ) : (
    <h2>Data Loading!</h2>
  );
}
export default HomePage;
