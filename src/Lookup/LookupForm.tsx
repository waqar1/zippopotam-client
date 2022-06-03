import React, { useContext, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Select from '@mui/material/Select';
import { useDebouncedCallback } from 'use-debounce';
import { useQuery } from '@apollo/client';
import { countries } from '../utils/countries';
import { zipCodeService } from '../utils/query';
import { searchResultsContext } from '../App';
import { LookupResult } from './LookupResult';

const DEFAULT_COUNTRY = 'US';

const createSearchResult = (zipCodeInfo: any) => ({
  zipCode: zipCodeInfo?.postCode,
  city: zipCodeInfo?.places[0].placeName,
  state: zipCodeInfo?.places[0].state
});

export const LookupForm = () => {
  const [searchResults, setSearchResults] = useContext(searchResultsContext);
  const [countryCode, setCountryCode] = useState(DEFAULT_COUNTRY);
  const [zipCode, setZipCode] = useState('');
  const {loading, error, data} = useQuery(zipCodeService.getZipCodeInfo(), {
    skip: !zipCode || !countryCode,
    variables: {
      countryCode,
      zipCode
    }
  });
  const { zipCodeInfo } = data || {};

  const debouncedZipCodeChange = useDebouncedCallback(
    (value) => {
      setZipCode(value);
    },
    2000
  );

  useEffect(() => {
    if (zipCodeInfo) setSearchResults([...searchResults.slice(-4), createSearchResult(zipCodeInfo)]);
  }, [zipCodeInfo]);

  return (
    <>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Zip Code Details
          </Typography>
          <Box component="form" sx={{ flexGrow: 1, p: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="select-label">Country</InputLabel>
                  <Select
                    required
                    labelId="select-label"
                    id="select"
                    value={countryCode}
                    label="Country"
                    onChange={(e) => setCountryCode(e.target.value)}
                  >
                    {countries.map((country) =>
                      <MenuItem key={country.code} value={country.code}>{country.name}</MenuItem>)}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <TextField
                    required
                    id="search-zip"
                    label="Enter ZIP Code"
                    type="search"
                    onChange={(e) => debouncedZipCodeChange(e.target.value)}
                  />
                </FormControl>
              </Grid>
            </Grid>
            {
              loading ?
                <Typography component="h6" variant="h6" align="left">
                  Fetching results...
                </Typography> : 
                <LookupResult
                  error={error}
                  data={data}
                />
            }
          </Box>
        </Paper>
      </Container>
    </>
  );
};