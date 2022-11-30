import React from 'react';
import CardItem from './CardItem';
import PropTypes from 'prop-types';

function CardList({notes,onDelete,onArchived,onUnArchived}){
    return(
        <div className='card-list'>
            {
                (notes.length !== 0 ?
                    notes.map(note => <CardItem
                    key={note.id}
                    id={note.id}
                    title={note.title}
                    body={note.body}
                    createdAt={note.createdAt}
                    onDelete={onDelete}
                    onArchived={onArchived}
                    onUnArchived={onUnArchived}
                     />)
                     : <h3>Catatan kosong!</h3>
                )
            }
        </div>
    )
}

CardList.propTypes = {
    notes: PropTypes.arrayOf(PropTypes.object),
    onDelete: PropTypes.func.isRequired,
    onArchived: PropTypes.func,
    onUnArchived: PropTypes.func,
}

export default CardList;