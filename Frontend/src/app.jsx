/* eslint-disable perfectionist/sort-imports */
import 'src/global.css';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import Router from 'src/routes/sections';
import ThemeProvider from 'src/theme';
import Context from './contextprovider/Context';
import Searchquery, { SearchContext } from './contextprovider/searchquery';

// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();

  return (
  <Searchquery>
    <ThemeProvider>
      <Router />
    </ThemeProvider>
    </Searchquery>
  );
}
