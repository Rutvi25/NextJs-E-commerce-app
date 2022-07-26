import Head from 'next/head';
import { useContext, useState } from 'react';
import { DataContext } from '../store/GlobalState';
import { postData, putData } from '../utils/fetchData';
import { updateItem } from '../store/Actions';

const Categories = () => {
  const [name, setName] = useState('');
  const [state, dispatch] = useContext(DataContext);
  const { categories, auth } = state;
  const [id, setId] = useState('');

  const createCategory = async () => {
    if (auth.user.role !== 'admin')
      return dispatch({
        type: 'NOTIFY',
        payload: 'Authentication is not valid',
      });
    if (!name)
      return dispatch({ type: 'NOTIFY', payload: 'category name is required' });
    dispatch({ type: 'NOTIFY', payload: { loading: true } });
    let res;
    if (id) {
      res = await putData(`categories/${id}`, { name }, auth.token);
      if (res.error)
        return dispatch({ type: 'NOTIFY', payload: { error: res.error } });
      dispatch(updateItem(categories, id, res.category, 'ADD_CATEGORIES'));
    } else {
      res = await postData('categories', { name }, auth.token);
      if (res.error)
        return dispatch({ type: 'NOTIFY', payload: { error: res.error } });
      dispatch({
        type: 'ADD_CATEGORIES',
        payload: [...categories, res.newCategory],
      });
    }
    setId('');
    setName('');
    return dispatch({ type: 'NOTIFY', payload: { success: res.message } });
  };
  const handleEditCategory = (category) => {
    console.log(category);
    setId(category._id);
    setName(category.name);
  };

  return (
    <div className='col-md-6 mx-auto my-3'>
      <Head>
        <title>Categories</title>
      </Head>
      <div className='input-group mb-3'>
        <input
          type='text'
          className='form-control'
          placeholder='add new category'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button className='btn btn-secondary ml-2' onClick={createCategory}>
          {id ? 'Update' : 'Create'}
        </button>
      </div>
      {categories.map((category) => (
        <div key={category._id} className='card my-2 text-capitalize'>
          <div className='card-body d-flex justify-content-between'>
            {category.name}
            <div style={{ cursor: 'pointer' }}>
              <i
                className='fas fa-edit mr-2 text-info'
                onClick={() => handleEditCategory(category)}
              ></i>
              <i
                className='fas fa-trash-alt text-danger'
                data-toggle='modal'
                data-target='#deleteModal'
                onClick={() =>
                  dispatch({
                    type: 'ADD_MODAL',
                    payload: [
                      {
                        data: categories,
                        id: category._id,
                        title: category.name,
                        type: 'ADD_CATEGORIES',
                      },
                    ],
                  })
                }
              ></i>{' '}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Categories;
