import React, { useState } from 'react';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const CategoryList = ({ categories, setCategory }) => {
  const [catActive, catSetActive] = useState(0);
  const [toggle, setToggle] = useState(false);

  return (
    <div className='category-wrap'>
      <h3 className='category__label' onClick={() => setToggle(!toggle)}>
        All Categories <ExpandMoreIcon className='icon-expand' />
      </h3>

      <ul className={`category__links ${toggle ? 'active' : ''}`}>
        <button
          className='category-close'
          onClick={() => setToggle(!toggle)}
        ></button>

        {categories.map((category, index) => {
          return (
            <li key={category.name} className='category-link__item'>
              <button
                className={`btn-category ${
                  catActive === index ? 'active' : ''
                }`}
                onClick={() => {
                  setCategory(category.name);
                  catSetActive(index);
                }}
              >
                {category.name}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CategoryList;
