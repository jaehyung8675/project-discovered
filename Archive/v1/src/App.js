import { useEffect, useState } from 'react';
import supabase from './supabase';
import './style.css';

const CATEGORIES = [
  { name: 'all' },
  { name: 'technology' },
  { name: 'science' },
  { name: 'finance' },
  { name: 'society' },
  { name: 'history' },
  { name: 'news' },
];

{
  /*
const initialFacts = [
  {
    id: 1,
    text: "React is being developed by Meta (formerly facebook)",
    source: "https://opensource.fb.com/",
    category: "technology",
    votesInteresting: 24,
    votesMindblowing: 9,
    votesFalse: 4,
    createdIn: 2021,
  },
  {
    id: 2,
    text: "Millennial dads spend 3 times as much time with their kids than their fathers spent with them. In 1982, 43% of fathers had never changed a diaper. Today, that number is down to 3%",
    source:
      "https://www.mother.ly/parenting/millennial-dads-spend-more-time-with-their-kids",
    category: "society",
    votesInteresting: 11,
    votesMindblowing: 2,
    votesFalse: 0,
    createdIn: 2019,
  },
  {
    id: 3,
    text: "Lisbon is the capital of Portugal",
    source: "https://en.wikipedia.org/wiki/Lisbon",
    category: "society",
    votesInteresting: 8,
    votesMindblowing: 3,
    votesFalse: 1,
    createdIn: 2015,
  },
];
*/
}

function App() {
  const [showForm, setShowForm] = useState(false);
  const [facts, setFacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCategory, setCurrentCategory] = useState('all');

  useEffect(
    function () {
      async function getFacts() {
        setIsLoading(true);

        let query = supabase.from('facts').select('*');

        if (currentCategory !== 'all')
          query = query.eq('category', currentCategory);

        const { data: facts, error } = await query
          .order('votesInteresting', { ascending: false })
          .limit(1000);

        if (!error) setFacts(facts);
        else alert('There was a problem getting data');
        setIsLoading(false);
      }
      getFacts();
    },
    [currentCategory]
  );

  return (
    <>
      <Header />
      <main className='main'>
        <CategoryFilter setCurrentCategory={setCurrentCategory} />
        {isLoading ? (
          <Loader />
        ) : (
          <FactList
            facts={facts}
            setFacts={setFacts}
            showForm={showForm}
            setShowForm={setShowForm}
          />
        )}
      </main>
    </>
  );
}

function Loader() {
  return <p className='message'>Loading...</p>;
}

function Header() {
  const appTitle = 'discovered';
  return (
    <header className='header'>
      <h1 className='logo'>{appTitle}</h1>
    </header>
  );
}

function CategoryFilter({ currentCategory, setCurrentCategory }) {
  const [active, setActive] = useState(0);

  return (
    <ul className='category-list'>
      {CATEGORIES.map((category, index) => (
        <li key={category.name} className='category'>
          <button
            className={`btn ${active === index ? 'active' : ''}`}
            onClick={() => {
              setCurrentCategory(category.name);
              setActive(index);
            }}
          >
            {category.name}
          </button>
        </li>
      ))}
    </ul>
  );
}

function isValidHttpUrl(string) {
  let url;
  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }
  return url.protocol === 'http:' || url.protocol === 'https:';
}

function NewFactForm({ setFacts, setShowForm }) {
  const [text, setText] = useState('');
  const [source, setSource] = useState('http://example.com'); // Change State back to ""
  const [category, setCategory] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const textLength = text.length;

  async function handleSubmit(e) {
    // 1. Prevent browser reload
    e.preventDefault();
    console.log(text, source, category);

    // 2. Check if data is valid. If so, create a new fact
    if (text && isValidHttpUrl(source) && category && textLength <= 200) {
      // 3. Upload fact to Supabase and recieve the new fact object
      setIsUploading(true);
      const { data: newFact, error } = await supabase
        .from('facts')
        .insert([{ text, source, category }])
        .select();
      setIsUploading(false);

      // 4. Add the new fact to the UI: Add the fact to state
      if (!error) setFacts((facts) => [newFact[0], ...facts]);

      // 5. Reset input fields
      setText('');
      setSource('');
      setCategory('');

      // 6. Close the form
      setShowForm(false);
    }
  }

  return (
    <form className='fact-form' onSubmit={handleSubmit}>
      <select
        className='form-category'
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        disabled={isUploading}
      >
        <option value=''>Choose category</option>
        {CATEGORIES.map((category) => (
          <option key={category.name} value={category.name}>
            {category.name.toUpperCase()}
          </option>
        ))}
      </select>

      <section className='text-container'>
        <textarea
          className='text-box'
          type='text'
          placeholder='Share a fact you discovered..'
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={isUploading}
        />
        <span>{200 - textLength}</span>
      </section>

      <input
        value={source}
        type='text'
        placeholder='http://example.com'
        onChange={(e) => setSource(e.target.value)}
        disabled={isUploading}
      />

      <button className='btn btn-share' disabled={isUploading}>
        Share
      </button>
    </form>
  );
}

function FactList({ facts, setFacts, showForm, setShowForm }) {
  if (facts.length === 0)
    return (
      <p className='message'>
        No facts for this category. Create the first one!
      </p>
    );

  return (
    <section>
      <ul className='facts-list'>
        <li className='fact new-fact-form'>
          <button
            className={`btn btn-fact-add ${showForm ? 'btn-close' : ''}`}
            onClick={() => setShowForm((show) => !show)}
          >
            +
          </button>

          {showForm ? (
            <NewFactForm setFacts={setFacts} setShowForm={setShowForm} />
          ) : null}
        </li>
        {facts.map((fact) => (
          <Fact key={fact.id} fact={fact} setFacts={setFacts} />
        ))}
      </ul>
    </section>
  );
}

function Fact({ fact, setFacts }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const isDisputed =
    fact.votesInteresting + fact.votesMindblowing < fact.votesFalse;

  async function handleVote(columnName) {
    setIsUpdating(true);
    const { data: updateFact, error } = await supabase
      .from('facts')
      .update({ [columnName]: fact[columnName] + 1 })
      .eq('id', fact.id)
      .select();
    setIsUpdating(false);

    if (!error)
      setFacts((facts) =>
        facts.map((f) => (f.id === fact.id ? updateFact[0] : f))
      );
  }

  return (
    <li className='fact'>
      <div className='fact-container'>
        <div className='fact-header'>
          <span className='tag'>{fact.category}</span>
          <a className='source' href={fact.source} target='_blank'></a>
        </div>
        <p className='fact-copy'>
          {isDisputed ? <span className='disputed'>[DISPUTED]</span> : null}
          {fact.text}
        </p>
      </div>

      <div className='vote-buttons'>
        <button
          onClick={() => handleVote('votesInteresting')}
          disabled={isUpdating}
        >
          <span className='vote-icon-interesting'></span>{' '}
          {fact.votesInteresting}
        </button>
        <button
          onClick={() => handleVote('votesMindblowing')}
          disabled={isUpdating}
        >
          <span className='vote-icon-mindblowing'></span>{' '}
          {fact.votesMindblowing}
        </button>
        <button onClick={() => handleVote('votesFalse')} disabled={isUpdating}>
          <span className='vote-icon-false'></span> {fact.votesFalse}
        </button>
      </div>
    </li>
  );
}

export default App;
