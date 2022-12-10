
import {Link} from 'react-router-dom';

import {Swiper, SwiperSlide} from 'swiper/react';
import { FreeMode } from 'swiper';


import { useGetTopChartsQuery } from '../redux/services/shazamCore';
import 'swiper/css';
import 'swiper/css/free-mode';





const TopArtists = () =>{
  const {data} = useGetTopChartsQuery();
  const divRef = useRef(null)
  
  useEffect(()=> {
      divRef.current.scrollIntoView({behavior: 'smooth'})
  })
  const topPlays = data?.slice(0, 5);

 
  


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

       <div className='w-full flex flex-col mt-8'>
       <div className='flex flex-row justify-between items-center mt-4'>
             <h2 className='text-white font-bold text-2xl mr-5'>
                Top Artists
             </h2>
             <Link to='/top-artists'>
                <p className='text-gray-300 text-base cursor-pointer'>See More</p>
             </Link>

          </div>
          
          <Swiper 
            slidesPerView='auto'
            spaceBetween={5}
            freemode="true"
            centredslides="true"
            canteredslidesboundes="true"
            modules={[FreeMode]}
            className='mt-4'
          >
           {topPlays?.map((song, i) => (
            <SwiperSlide 
              key={song.key}
              style={{width: '24%', height: 'auto'}}
              className='shadow-lg rounded-full animate-slideright'
            >
             <Link to={`/artists/${song?.artists[0].adamid}`}>
              <img src={song?.images.background} alt='name' className='rounded-full w-full object-cover' />
             </Link>
            </SwiperSlide>
           ))}
          </Swiper>
       </div>
        {/* <SongDetails /> */}
    </div>
  )
};

export default TopArtists;
