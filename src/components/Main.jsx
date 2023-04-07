import React from 'react';

import Nav from './Nav';
import FactList from './FactList';

const Main = ({ facts, setFacts, categories }) => {
  return (
    <main className='main-wrap'>
      <Nav categories={categories} setFacts={setFacts} />
      <FactList facts={facts} setFacts={setFacts} />
    </main>
  );
};

export default Main;
