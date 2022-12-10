import {Link} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import PlayPause from './PlayPause';
import { playPause,setActiveSong} from '../redux/features/playerSlice';

const SongCard = ({song, i, isPlaying, activeSong, data}) => {

   const dispatch= useDispatch()
   const handlePauseClick = () => {
    dispatch(playPause(false))
   
  
    }
  
  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({i, data, song}))
    dispatch(playPause(true))
  }

  
 return (
  <div className='flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animated-slideup rounded-lg cursor-pointer'>
    <div className='relative w-full h-56 group'>
       <div className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${activeSong?.title === song.title ? 'flex bg-black bg-opacity-70' : 'hidden'}`}>
          

          
       <PlayPause
          key={song.key}
          song={song}
          i={i}
          isPlaying={isPlaying}
          activeSong={activeSong}
          handlePauseClick={handlePauseClick}
          handlePlayClick={() =>handlePlayClick(song, i)}
        />  


        </div>
         <img alt='song_img' src={song.images?.coverart}/>
     </div>

     <div className='mt-4 flex flex-col'>
       <p className='font-semibold text-lg text-white truncate'>
          <Link to={`/songs/${song?.key}`}>
            {song.title}
          </Link>
       </p>
       <p className='font-sm text-lg text-gray-500 mt-1 truncate'>
          <Link to={song.artists ? `/artists/${song?.artists[0]?.adamid}` : '/top-artists'}>
            {song.subtitle}
          </Link>
       </p>

     </div>
  </div>
 )
 };

export default SongCard;


// const SongCard = () => (
//   <div>SongCard</div>
// );

// export default SongCard;
