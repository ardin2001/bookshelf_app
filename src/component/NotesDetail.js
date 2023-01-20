import React from 'react';
import {showFormattedDate} from '../utils/index';
import PropTypes from 'prop-types';

function NoteDetail({title,body,createdAt}){
    return(
        <>
        {console.log('cukup')}
        <h2 className='id-title'>{title}</h2>
        <p className='tanggal'>{showFormattedDate(createdAt)}</p>
        <p>{body}</p>            
        </>
    )
}

NoteDetail.propTypes = {
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
}

export default NoteDetail;