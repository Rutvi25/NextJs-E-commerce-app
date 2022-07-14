import { useState } from 'react';
import Head from 'next/head';

import { getData } from '../utils/fetchData';
import ProductItem from '../components/product/ProductItem';

const Home = (props) => {
  const [products, setProducts] = useState(props.products)
  console.log(products)
  return (
    <div>
      <Head>
        <title>Home Page</title>
      </Head>
      {
        products.length === 0
        ? <h2>No products to show</h2>
        : products.map(product => (
          <ProductItem key={product._id} product={product} />
        ))
      }
    </div>
  );
};

export const getServerSideProps = async () => {
  const res = await getData('product');
  console.log(res)
  return {
    props:{
      products: res.products,
      result: res.result
    }
  }
}

export default Home;