import React, { useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import Form from './Form';

const Nav = ({ categories, setFacts }) => {
  const [toggleForm, setToggleForm] = useState(false);

  return (
    <nav className='nav'>
      <h2 className='nav__headline'>Today what I found</h2>
      <button
        className='btn btn-add'
        onClick={() => setToggleForm(!toggleForm)}
      >
        <AddIcon className='icon-add' />
        <span className='add-copy'>Add New Fact</span>
      </button>

      {toggleForm ? (
        <>
          <Form
            setFacts={setFacts}
            categories={categories}
            setToggleForm={setToggleForm}
          />
          <div className='overlay'></div>
        </>
      ) : null}
    </nav>
  );
};

export default Nav;
