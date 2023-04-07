import React from 'react';

import LaunchIcon from '@mui/icons-material/Launch';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import supabase from '../supabase';

const Fact = ({ fact, setFacts }) => {
  async function handleVote(columnName) {
    const { data: updateFact, error } = await supabase
      .from('data')
      .update({ [columnName]: fact[columnName] + 1 })
      .eq('id', fact.id)
      .select();

    if (!error)
      setFacts((facts) =>
        facts.map((f) => (f.id === fact.id ? updateFact[0] : f))
      );
  }

  return (
    <li className='fact'>
      <div className='fact-wrap'>
        <div className='fact__header'>
          <span className='fact__label'>{fact.category}</span>
          <a
            className='fact__link'
            href={fact.link}
            target='_blank'
            rel='noopener noreferrer'
          >
            <LaunchIcon className='icon-link' />
          </a>
        </div>
        <p className='fact__copy'>{fact.description}</p>
      </div>
      <div className='btn-wrap'>
        <button className='btn-vote' onClick={() => handleVote('like')}>
          <ThumbUpIcon className='icon-like' /> {fact.like}
        </button>
        <button className='btn-vote' onClick={() => handleVote('dislike')}>
          <ThumbDownIcon className='icon-dislike' />
          {fact.dislike}
        </button>
      </div>
    </li>
  );
};

export default Fact;
