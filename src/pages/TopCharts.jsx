import {useState, useRef, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';

import PlayPause from '../components/PlayPause';
import { playPause,setActiveSong } from '../redux/features/playerSlice';
import { useGetTopChartsQuery } from '../redux/services/shazamCore';




const TopChartCard =({i, song, isPlaying, activeSong, handlePauseClick, handlePlayClick}) => (
  <div className='w-full flex flex-row items-center hover:bg-[#4c426e] py-2 p-4 rounded-lg cursor-pointer mb-2'>
     <h3 className='font-bold text-base text-white mr-3'>{i + 1}</h3>

     <div className='flex-1 flex flex flex-row justify-between items-center'>
      <img  className='w-20 h-20 rounded-lg' src={song?.images?.coverart} alt={song?.title}/>
       
       <div className='flex-1 flex flex-col justify-center mx-3'>
         <Link to={`/songs/${song.key}`}>
          <p className='text-xl font-bold text-white'>{song?.title}</p>
         </Link>
         <Link to={`/artists/${song?.artists[0].adamid}`}>
          <p className='text-base  text-gray-500 mt-1'>{song?.subtitle}</p>
         </Link>

       </div>
        <PlayPause
          isPlaying={isPlaying}
          activeSong={activeSong}
          song={song}
          handlePause={handlePauseClick}
          handlePlay={handlePlayClick}
        />
     </div>
  </div>
)
const TopCharts = () =>{
  const dispatch = useDispatch();
  const {activeSong, isPlaying} = useSelector((state) => state.player);
  const {data} = useGetTopChartsQuery();
  const divRef = useRef(null)
  

  
  useEffect(()=> {
      divRef.current.scrollIntoView({behavior: 'smooth'})
  })
  const topPlays = data?.slice(0, 30);

  const handlePauseClick = () => {
    dispatch(playPause(false))
   
  
    }
  
  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({i, data, song}))
    dispatch(playPause(true))
  }


  return (
    <div ref={divRef} className='xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[500px] max-w-full flex flex-col'>
       <div className='w-full flex flex-col'>
          <div className='flex flex-row justify-between items-center mt-4'>
             <h2 className='text-white font-bold text-2xl mr-5'>
                Top Charts
             </h2>
             <Link to='/top-charts'>
                <p className='text-gray-300 text-base cursor-pointer'>See More</p>
             </Link>

          </div>

          <div className='mt-4 flex flex-col gap-1'>
             {topPlays?.map((song, i) => (
              <TopChartCard 
                key={song.key}
                song={song}
                i={i}
                isPlaying={isPlaying}
                activeSong={activeSong}
                handlePauseClick={handlePauseClick}
                handlePlayClick={() =>handlePlayClick(song, i)}
              />
             ))}
          </div>
       </div>

       
        {/* <SongDetails /> */}
    </div>
  )
};

export default TopCharts;
