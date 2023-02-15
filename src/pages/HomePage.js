import React from "react";
import { useSearchParams } from "react-router-dom";
import { getActiveNotes, archiveNote, deleteNote } from "../utils/network";
import CardList from "../component/CardList";
import SearchBar from "../component/SearchBar";
import LocaleContext from "../context/LocaleContext";

function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [active_notes, setNotes] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [keyword, setKeyword] = React.useState(() => {
    return searchParams.get("keyword") || "";
  });
  const { localeContext } = React.useContext(LocaleContext);
  React.useEffect(() => {
    getActiveNotes().then(({ data }) => {
      setNotes(data);
      setTimeout(() => {
        setLoading(true);
      }, 400);
    });
  }, []);
  async function onDeleteHandler(id) {
    await deleteNote(id);
    // const { data } = await getActiveNotes();
    const result = active_notes.filter( e => e.id !== id)
    setNotes(result);
  }
  async function onArchivedHandler(id) {
    await archiveNote(id);
    const { data } = await getActiveNotes();
    console.log(data)
    const result = active_notes.filter(e => {
      if(e.id === id){
        return null
      }
      return e
    })
    console.log(result)
    setNotes(result);
  }
  function onKeywordChangeHandler(keyword) {
    setKeyword(keyword);
    setSearchParams({ keyword });
  }
  const filteredNotes = active_notes.filter((note) => {
    return note.title.toLowerCase().includes(keyword.toLowerCase());
  });
  return (
    <section>
      <SearchBar keyword={keyword} keywordChange={onKeywordChangeHandler} />
      <h2>{localeContext === "id" ? "Daftar Catatan" : "Notes List"}</h2>
      {loading === true ? (
        <CardList
          notes={filteredNotes}
          onArchived={onArchivedHandler}
          onDelete={onDeleteHandler}
        />
      ) : (
        <h3 style={{textAlign : 'center'}}>Loading Data</h3>
      )}
    </section>
  );
}
export default HomePage;
