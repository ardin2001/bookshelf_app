import React from 'react';
import PropTypes from 'prop-types';
 
function SearchBar({ keyword, keywordChange }) {
  return (
    <div className='input-note'>
      <input
      className="search-note"
      type="text"
      placeholder="Masukkan judul catatan..."
      value={keyword}
      onChange={(event) => keywordChange(event.target.value)} />
    </div>
  )
}
 
SearchBar.propType = {
  keyword: PropTypes.string.isRequired,
  keywordChange: PropTypes.func.isRequired
}
 
export default SearchBar;