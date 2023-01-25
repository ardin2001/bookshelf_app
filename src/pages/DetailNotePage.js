import React from 'react';
import NoteDetail from '../component/NotesDetail';
import { getNote } from '../utils/network';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

function DetailNotePage() {
  const { id } = useParams();
  return <DetailNote id={id} />;
}
class DetailNote extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      detail_note: null
    };
  }
  async componentDidMount() {
    const { data } = await getNote(this.props.id);
    
    this.setState(() => {
      return {
        detail_note: data
      }
    })
  }

  render() {
    if (this.state.detail_note === null) {
      return <p>Data Loading!...</p>;
    }

    return (
      <>
      {console.log(this.state.detail_note)}
      <h1>Detail Catatan</h1>
      <div className='card-detail'>
        <NoteDetail {...this.state.detail_note} />
      </div>
      </>
    );
  }
}

DetailNote.propTypes = {
  id: PropTypes.string.isRequired,
}

export default DetailNotePage;
