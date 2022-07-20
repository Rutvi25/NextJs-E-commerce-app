import { useContext, useEffect, useRef } from 'react';
import { updateItem } from '../store/Actions';
import { DataContext } from '../store/GlobalState';
import { patchData } from '../utils/fetchData';

const PaypalBtn = ({ order }) => {
  const refPaypalBtn = useRef();
  const [state, dispatch] = useContext(DataContext);
  const { auth, orders } = state;
  useEffect(() => {
    paypal_sdk
      .Buttons({
        createOrder: function (data, actions) {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: order.total
                }
              },
            ],
          });
        },
        onApprove: function (data, actions) {
          dispatch({ type: 'NOTIFY', payload: { loading: true } });

          return actions.order.capture().then(function (orderData) {
            console.log(
              'Capture result',
              orderData,
              JSON.stringify(orderData, null, 2)
            );
            patchData(
              `order/payment/${order._id}`,
              null,
              auth.token
            ).then((res) => {
              if (res.error)
                return dispatch({
                  type: 'NOTIFY',
                  payload: { error: res.error },
                });
              // dispatch({ type: 'ADD_CART', payload: [] });
              
              // const newOrder = {
              //   ...res.newOrder,
              //   user: auth.user
              // }
              dispatch(updateItem(orders, order._id, {
                ...order, paid: true, dateOfPayment: new Date().toISOString()
              }, 'ADD_ORDERS'));
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
