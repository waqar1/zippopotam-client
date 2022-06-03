import React, { useContext } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/material';
import { searchResultsContext } from '../App';

export const RecentSearch = () => {
  const [ searchResults, setSearchResults ] = useContext(searchResultsContext);
  return (
    <>
      <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 1, md: 2 } }}>
          <Typography component="h1" variant="h4" align="center">
            Last 5 Searches
          </Typography>
          <TableContainer component={Paper}>
            <Table aria-label="Search results table">
              <TableHead>
                <TableRow>
                  <TableCell>Zipcode</TableCell>
                  <TableCell>City</TableCell>
                  <TableCell>State</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {searchResults.map((result, index) => (
                  <TableRow
                    key={`${result.zipCode}-${index}`}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell>{result.zipCode}</TableCell>
                    <TableCell>{result.city}</TableCell>
                    <TableCell>{result.state}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box sx={{ p: 2 }}>
            <Button
              variant="contained"
              disabled={!searchResults.length}
              onClick={() => setSearchResults([])}
            >
              Clear Search results
            </Button>
          </Box>
        </Paper>
      </Container>

    </>
  );
};