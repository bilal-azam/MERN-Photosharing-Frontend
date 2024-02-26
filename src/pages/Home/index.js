import React, { useEffect, useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
import Header from './Components/Header';
import Masonry from '@mui/lab/Masonry';
import Image from '../../components/Image';

import { getAllPhotos, getPhotosByCategoryId } from '../../services/PhotoServices';
import { useSearchParams } from 'react-router-dom';

function Home() {
  const [photos, setPhotos] = useState([]);
  const [isPending, setPending] = useState(true);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setPending(true);

    if (searchParams.get('category')) {
      getPhotosByCategoryId(searchParams.get('category')).then((data) => {
        setPhotos(data.photos);
      });
    } else {
      getAllPhotos().then((data) => setPhotos(data.photos));
    }

    setTimeout(() => {
      setPending(false);
    }, 2000);
  }, [searchParams]);

  return (
    <Box>
      <Header />
      <Box sx={{ px: 5, py: 5, display: 'flex', justifyContent: 'center', color: '#E61605' }}>
        <Masonry
          columns={{ xs: 1, sm: 2, md: 3 }}
          spacing={3}
          sx={{ overflowX: 'hidden', display: isPending && 'none' }}
        >
          {
              photos.length > 0
              &&
              photos.map((photo, index) => {
                return (
                  <Image
                    key={index}
                    id={photo._id}
                    title={photo.title}
                    imageUrl={photo.imageUrl}
                    publisher={photo.publisher}
                    publisherName={photo.publisherName}
                  />
                );
              })}
            </Masonry>
        {
            (photos.length ===0 || isPending) 
            && 
            <Box>
              <CircularProgress sx={{ color: 'red' }} />
            </Box> 
        }
      </Box>
    </Box>
  );
}

export default Home;
