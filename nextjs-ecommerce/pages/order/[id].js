import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';

import { DataContext } from '../../store/GlobalState';
import OrderDetails from '../../components/OrderDetails';

const OrderDetail = () => {
  const [state, dispatch] = useContext(DataContext);
  const { orders, auth } = state;
  const router = useRouter();
  const [orderDetail, setOrderDetail] = useState([]);
  useEffect(() => {
    const newArr = orders.filter((order) => order._id === router.query.id);
    setOrderDetail(newArr);
  }, [orders]);
  if(!auth.user) return null;
  return (
    <div className='my-3'>
      <Head>
        <title>Order Details</title>
      </Head>
      <div>
        <button className='btn btn-dark' onClick={() => router.back()}>
          <i className='fas fa-long-arrow-alt-left' aria-hidden='true'></i> Go Back
        </button>
      </div>
      <OrderDetails orderDetail={orderDetail} state={state} dispatch={dispatch} />
    </div>
  );
};

export default OrderDetail;
