import React from 'react';
import CategoryList from './CategoryList';

const Aside = ({ categories, setCategory }) => {
  return (
    <aside>
      <div className='logo-wrap'>
        <a className='logo' href='/'>
          <span className='logo__symbol'>
            <svg viewBox='0 0 40 40' width='100%' height='100%'>
              <g>
                <path
                  className='st0'
                  d='M23.5,12.9H11.45l1.09,1.93V27.1H23.5c1.98,0,3.45-0.39,4.41-1.16c0.96-0.77,1.44-1.99,1.44-3.65v-4.61
       c0-1.63-0.48-2.83-1.45-3.61C26.93,13.29,25.47,12.9,23.5,12.9z M24.66,22.05c-0.02,1.14-0.64,1.72-1.88,1.72h-5.53v-7.58h5.53
       c1.26,0,1.88,0.56,1.88,1.69V22.05z'
                />
                <path
                  className='st0'
                  d='M20,0C8.97,0,0,8.97,0,20c0,11.03,8.97,20,20,20c11.03,0,20-8.97,20-20C40,8.97,31.03,0,20,0z M20,37.04
       C10.6,37.04,2.96,29.4,2.96,20C2.96,10.6,10.6,2.96,20,2.96c9.4,0,17.04,7.64,17.04,17.04C37.04,29.4,29.4,37.04,20,37.04z'
                />
              </g>
            </svg>
          </span>
          <span className='logo__copy'>Discovered</span>
        </a>
      </div>
      <CategoryList categories={categories} setCategory={setCategory} />
    </aside>
  );
};

export default Aside;
