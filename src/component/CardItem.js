import React from 'react';
import {showFormattedDate} from '../utils/index';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import DeleteButton from './DeleteButton';
import ArchivedButton from './archivedButton';
import {AiFillFolderAdd} from 'react-icons/ai';
import {AiFillBackward} from 'react-icons/ai';

function CardItem({id,title,body,createdAt,onDelete,onArchived,onUnArchived}){
    return(
        <div className='card-item'>
            <h3>
                <Link to={`/note/${id}`}>{title}</Link>
            </h3>
            <p className='tanggal'>{showFormattedDate(createdAt)}</p>
            <p>{body}</p>            
            <DeleteButton id={id} onDelete={onDelete} />
            <ArchivedButton 
            id={id} onArchived={onUnArchived || onArchived} 
            type={onArchived === undefined ? <AiFillBackward/> : <AiFillFolderAdd/>} 
            style={onArchived === undefined ? 'Pindahkan' : 'Arsipkan'} />
        </div>
    )
}

CardItem.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    onDelete: PropTypes.func,
    onArchived: PropTypes.func,
    onUnArchived: PropTypes.func,
}

export default CardItem;