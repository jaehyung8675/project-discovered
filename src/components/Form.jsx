import React, { useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import supabase from '../supabase';

const Form = ({ setFacts, categories, setToggleForm }) => {
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const words = description.length;

  async function handleSubmit(e) {
    e.preventDefault();

    if (category && words <= 120 && link) {
      const { data: newFact, error } = await supabase
        .from('data')
        .insert([{ category, description, link }])
        .select();

      if (!error) setFacts((facts) => [newFact[0], ...facts]);

      setCategory('');
      setDescription('');
      setLink('');
      setToggleForm(false);
    }
  }

  return (
    <form className='fact-form' onSubmit={handleSubmit}>
      <button className='btn btn-close' onClick={() => setToggleForm(false)}>
        <CloseIcon className='icon-close' />
      </button>
      <h3 className='form__title'>Add New Fact</h3>
      <div className='form__item'>
        <label className='item__label' htmlFor='category'>
          Category
        </label>
        <select
          className='item__input form-category'
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value=''>Choose Category</option>

          {categories.map((cat) => (
            <option key={cat.name} value={cat.name}>
              {cat.name.toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      <div className='form__item'>
        <label className='item__label' htmlFor='description'>
          Description
        </label>
        <div className='textarea-wrap'>
          <textarea
            className='item__input input-description'
            placeholder='Share a fact you discovered!'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <span className='word-count'>{120 - words}</span>
        </div>
      </div>

      <div className='form__item'>
        <label className='item__label' htmlFor='link'>
          Link
        </label>
        <input
          className='item__input'
          type='text'
          placeholder='http://example.com'
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
      </div>
      <button className='btn btn-share'>Share</button>
    </form>
  );
};

export default Form;
