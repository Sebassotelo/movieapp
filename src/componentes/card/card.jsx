import React, { useState } from 'react'
import './card.css';
import Popup from '../popup/popup';

function Card({title , img }) {



  return (
    <div>
        <div className='card-container'>
          <div className='title'><h1>{title}</h1></div>
          <img src={`https://image.tmdb.org/t/p/w500/${img}`} alt="" />
        </div>  

    </div>
  )
}

export default Card;
