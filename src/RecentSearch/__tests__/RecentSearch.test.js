import { render, screen } from '@testing-library/react';
import { RecentSearch } from '../RecentSearch';
import { searchResultsContext } from '../../App';

const zipCodeFixture = {
  zipCode: '90210',
  city: 'Beverly Hills',
  state: 'CA'
};
const setSearchResults = jest.fn();

const renderComponent = () => {
  render(
    <searchResultsContext.Provider value={[[zipCodeFixture], setSearchResults]}>
      <RecentSearch />
    </searchResultsContext.Provider>
  );
};

describe('RecentSearch', () => {
  it('renders search results', () => {
    renderComponent();
    expect(screen.getByText('90210')).toBeInTheDocument();
    expect(screen.getByText('Beverly Hills')).toBeInTheDocument();
    expect(screen.getByText('CA')).toBeInTheDocument();
  });
});
