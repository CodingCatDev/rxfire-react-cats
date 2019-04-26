import './App.css';

import React from 'react';

import AddCat from './components/AddCat';
import ListCatFacts from './components/ListCatFacts';

function App() {
  return (
    <div style={{ display: 'flex' }}>
      <div>
        <h1>
          This is RxFire for Cats{' '}
          <span role="img" aria-label="fun-cat">
            😺
          </span>
        </h1>
        <AddCat />
        <ListCatFacts />
      </div>
    </div>
  );
}

export default App;
