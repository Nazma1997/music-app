import {useParams} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {DetailsHeader, Error, Loader, RelatedSongs} from '../components';
// import { setActiveSong, playPause } from '../redux/features/playerSlice';
import {  useGetArtistDetailsQuery} from '../redux/services/shazamCore';

const ArtistDetails = () => {
  
  const dispatch = useDispatch();
  const {id: artistId} = useParams();
  const {activeSong, isPlaying} = useSelector((state) => state.player);
  const {data: artistData, isFetching:isFetchingArtistDetails, error} = useGetArtistDetailsQuery({artistId});
  

 

  if(isFetchingArtistDetails)return <Loader title='Loading Artist details'/>

  if(error) return <Error />


  return (
    <div className='flex flex-col'>
      <DetailsHeader artistsId={artistId} songData={artistData} />




     
       <RelatedSongs 
         data={Object.values(artistData?.songs)}
         artistId={artistId}
         isPlaying={isPlaying}
         activeSong={activeSong}
        
       />
    </div>
  )
};

export default ArtistDetails;