import React from 'react';
import Fact from './Fact';

const FactList = ({ facts, setFacts }) => {
  if (facts.length === 0)
    return (
      <p className='message'>
        No facts for this category. Create the first one!
      </p>
    );

  return (
    <section className='facts-wrap'>
      <ul className='facts-list'>
        {facts.map((fact) => {
          return <Fact key={fact.id} fact={fact} setFacts={setFacts} />;
        })}
      </ul>
    </section>
  );
};

export default FactList;
