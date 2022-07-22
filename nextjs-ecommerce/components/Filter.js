import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import filterSearch from '../utils/filterSearch';
import { getData } from '../utils/fetchData';

const Filter = ({ state }) => {
  // const [title, setTitle] = useState('');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');
  const [category, setCategory] = useState('');
  const { categories } = state;
  const router = useRouter();
  const handleCategory = (e) => {
    setCategory(e.target.value);
    filterSearch({ router, category: e.target.value });
  };
  const handleSort = (e) => {
    setSort(e.target.value);
    filterSearch({ router, sort: e.target.value });
  };
  useEffect(() => {
    filterSearch({ router, search: search ? search.toLowerCase() : 'all' });
  }, [search]);
  return (
    <div className='input-group'>
      <div className='input-group-prepend col-md-2 px-0 mt-2'>
        <select
          className='custom-select text-capitalize'
          value={category}
          onChange={handleCategory}
        >
          <option value='all'>All Products</option>
          {categories.map((item) => (
            <option key={item._id} value={item._id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <form autoComplete='off' className='mt-2 col-md-8 px-0'>
        <input
          type='text'
          className='form-control'
          list='title-product'
          value={search.toLowerCase()}
          onChange={(e) => setSearch(e.target.value)}
        />
        {/* <datalist id='title-product'>
          <option value='name'>Title Name</option>
        </datalist>
        <button
          type='submit'
          className='position-absolute btn btn-info'
          style={{ top: 0, right: 0, visibility: 'hidden' }}
        >
          Search
        </button> */}
      </form>
      <div className='input-group-prepend col-md-2 px-0 mt-2'>
        <select
          className='custom-select text-capitalize'
          value={sort}
          onChange={handleSort}
        >
          <option value='-createdAt'>Newest</option>
          <option value='oldest'>oldest</option>
          <option value='-sold'>Best sales</option>
          <option value='-price'>High-Low</option>
          <option value='price'>Low-High</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
