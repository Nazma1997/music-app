import {useParams} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {DetailsHeader, Error, Loader, RelatedSongs} from '../components';
import { setActiveSong, playPause } from '../redux/features/playerSlice';
import { useGetSongDetailsQuery, useGetSongRelatedQuery} from '../redux/services/shazamCore';

const SongDetails = () => {
  
  const dispatch = useDispatch();
  const {songid} = useParams();
  const {activeSong, isPlaying} = useSelector((state) => state.player);
  const {data: songData, isFetching:isFetchingSongDetails} = useGetSongDetailsQuery({songid});
  const {data, isFetching:isFetchingRelatedSong, error} = useGetSongRelatedQuery({songid})

   console.log(songData)
  const handlePauseClick = () => {
    dispatch(playPause(false))
   
  
    }
  
  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({i, data, song}))
    dispatch(playPause(true))
  }


  if(isFetchingSongDetails || isFetchingRelatedSong)return <Loader title='Searching song details'/>

  if(error) return <Error />


  return (
    <div className='flex flex-col'>
      <DetailsHeader artistsId='' songData={songData} />




      
       {/* <div className='mb-10'>
        <h2 className='text-white text-3xl font-bold mt-5'>Lyrics:</h2>
          
          <div className='mt-5'>
          {
                  songData?.sections[0]?.type === 'SONG' ? songData?.sections[0]?.text?.map((line, i) => (
                   <p>{line}</p>
                  )) : <p>Sorry, no lyrics found</p>
                }
          </div>
      </div> */}
       
       <RelatedSongs 
         data={data}
         isPlaying={isPlaying}
         activeSong={activeSong}
         handlePauseClick={handlePauseClick}
         handlePlayClick={() => handlePlayClick(song, i)}
       />
    </div>
  )
};

export default SongDetails;
