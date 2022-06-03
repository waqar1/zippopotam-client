import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface ILookupResultProps {
  data: any;
  error: any;
}

export const LookupResult = ({ data, error }: ILookupResultProps) => {

  if (error) {
    return (
      <Typography component="h6" variant="h6" align="left">
        Error fetching results
      </Typography>
    );
  }

  if (!data?.zipCodeInfo) return null;

  return (
    <>
      <Box sx={{ mt: 2 }}>
        <>
          <Typography component="h6" variant="h6" align="left">
            City: {data.zipCodeInfo?.places[0]?.placeName}
          </Typography>
          <Typography component="h6" variant="h6" align="left">
            State: {data.zipCodeInfo?.places[0]?.state}
          </Typography>
        </>
      </Box>
    </>
  );
};