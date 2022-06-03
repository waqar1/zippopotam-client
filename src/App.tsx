import React, { createContext, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { LookupForm } from './Lookup/LookupForm';
import { RecentSearch } from './RecentSearch/RecentSearch';
import './App.css';

export interface ISearchResult {
  zipCode: string;
  city: string;
  state: string;
}

export type ISearchResultContext = [
  searchResults: ISearchResult[],
  setSearchResults: React.Dispatch<React.SetStateAction<ISearchResult[]>>
];

export const searchResultsContext = createContext<ISearchResultContext>([[], () => null]);

const App = () => {
  const [searchResults, setSearchResults] = useState<ISearchResult[]>([]);

  return (
    <div className="App">
      <searchResultsContext.Provider value={[searchResults, setSearchResults ]}>
        <AppBar position="static">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: 'flex' },
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                Search City/State by ZIP Code
              </Typography>
            </Toolbar>
          </Container>
        </AppBar>
        <LookupForm />
        <RecentSearch />
      </searchResultsContext.Provider>
    </div>
  );
}

export default App;
