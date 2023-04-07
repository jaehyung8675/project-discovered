import React, { useEffect, useState } from 'react';
import supabase from './supabase';

import Aside from './components/Aside';
import Main from './components/Main';
import './styles/style.css';

const CATEGORIES = [
  { name: 'all' },
  { name: 'technology' },
  { name: 'science' },
  { name: 'finance' },
  { name: 'society' },
  { name: 'history' },
  { name: 'news' },
];

const App = () => {
  const [facts, setFacts] = useState([]);
  const [currentCategory, setCategory] = useState('all');

  useEffect(
    function () {
      async function getFacts() {
        let query = supabase.from('data').select('*');

        if (currentCategory !== 'all')
          query = query.eq('category', currentCategory);

        const { data: facts, error } = await query
          .order('like', { ascending: false })
          .limit(100);

        if (!error) {
          setFacts(facts);
        } else alert('There was a problem getting data');
      }
      getFacts();
    },
    [currentCategory]
  );

  return (
    <div className='app'>
      <Aside categories={CATEGORIES} setCategory={setCategory} />
      <Main categories={CATEGORIES} facts={facts} setFacts={setFacts} />
    </div>
  );
};

export default App;
