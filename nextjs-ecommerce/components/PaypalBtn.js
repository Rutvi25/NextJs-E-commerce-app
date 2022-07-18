import { useEffect, useRef } from 'react';

const PaypalBtn = ({ total, address, mobile, state, dispatch }) => {
  const refPaypalBtn = useRef();
  const { cart, auth } = state
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
            var transaction = orderData.purchase_units[0].payments.captures[0];
            alert(
              'Transaction ' +
                transaction.status +
                ': ' +
                transaction.id +
                '\n\nSee console for all available details'
            );
          });
        },
      })
      .render(refPaypalBtn.current);
  }, []);
  return <div ref={refPaypalBtn}></div>;
};

export default PaypalBtn;
