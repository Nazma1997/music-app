import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';



  export const shazamCoreApi = createApi({
    reducerPath: 'shazamCoreApi',
    baseQuery: fetchBaseQuery({
      baseUrl: 'https://shazam-core.p.rapidapi.com/v1',
      prepareHeaders: (headers) => {
        // headers.set('X-RapidAPI-Key', 'd3270d8198mshb4ce5816e015cdbp157ca7jsn9e0536db20e8');
        headers.set('X-RapidAPI-Key', 'd33ab5f90bmsh3f931b9ad21f046p1d6f48jsn5b8657bccc07');

        return headers;
      },
    }),
    endpoints: (builder) => ({
      getTopCharts: builder.query({query: () => '/charts/world'}),
      getSongDetails: builder.query({query: ({songid}) => `/tracks/details?track_id=${songid}`}),
      getSongRelated: builder.query({query: ({songid}) => `/tracks/related?track_id=${songid}`}),
      getArtistDetails: builder.query({query: (artistId) => `/artists/details?artist_id=${artistId}`}),
    })

  });


  export const {
    useGetTopChartsQuery,
    useGetSongDetailsQuery,
    useGetSongRelatedQuery,
    useGetArtistDetailsQuery,
  } = shazamCoreApi;