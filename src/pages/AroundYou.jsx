import {ReactComponentElement, useState, useEffect} from 'react';
import axios from 'axios';
import {useSelector} from 'react-redux';
import {Error, loader, SongCard} from '../components';



const AroundYou = () => {
  const [country, setCountry] = useState('');
  const [loading, setLoading] = useState(true);
  const {activeSong, isPlaying} = useSelector((state) => state.player);
  
  return(
    <div>CountryTracks</div>
  )
};

export default AroundYou;
