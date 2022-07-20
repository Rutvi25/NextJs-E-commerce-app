import connectDB from '../../../../utils/connectDB';
import Orders from '../../../../models/orderModel';
import auth from '../../../../middleware/auth';

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case 'PATCH':
      await orderPayment(req, res);
      break;
  }
};
const orderPayment = async (req, res) => {
  try {
    const result = await auth(req, res);
    if (result.role === 'user') {
      const { id } = req.query;
      const { paymentId } = req.body;
      await Orders.findOneAndUpdate(
        { _id: id },
        {
          paid: true,
          dateOfPayment: new Date().toISOString(),
          paymentId,
          method: 'Paypal',
        }
      );
      res.json({ message: 'Payment success!' });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
