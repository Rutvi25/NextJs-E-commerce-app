import { useEffect, useRef } from 'react';
import { postData } from '../utils/fetchData';

const PaypalBtn = ({ total, address, mobile, state, dispatch }) => {
  const refPaypalBtn = useRef();
  const { cart, auth, orders } = state;
  useEffect(() => {
    paypal
      .Buttons({
        createOrder: function (data, actions) {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: total,
                },
              },
            ],
          });
        },
        onApprove: function (data, actions) {
          return actions.order.capture().then(function (orderData) {
            console.log(
              'Capture result',
              orderData,
              JSON.stringify(orderData, null, 2)
            );
            dispatch({ type: 'NOTIFY', payload: { loading: true } });
            postData(
              'order',
              { address, mobile, cart, total },
              auth.token
            ).then((res) => {
              if (res.error)
                return dispatch({
                  type: 'NOTIFY',
                  payload: { error: res.error },
                });
              dispatch({ type: 'ADD_CART', payload: [] });
              
              const newOrder = {
                ...res.newOrder,
                user: auth.user
              }
              dispatch({ type: 'ADD_ORDERS', payload: [...orders, newOrder] });
              return dispatch({
                type: 'NOTIFY',
                payload: { success: res.message },
              });
            });
            
          });
        },
      })
      .render(refPaypalBtn.current);
  }, []);
  return <div ref={refPaypalBtn}></div>;
};

export default PaypalBtn;
