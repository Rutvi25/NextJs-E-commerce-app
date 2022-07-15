import connectDB from '../../../utils/connectDB';
import Products from '../../../models/productModel';

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case 'GET':
      await getProduct(req, res);
      break;
  }
};

const getProduct = async (req, res) => {
  try {
    const { id } = req.query;
    const product = await Products.findById(id);
    if (!product)
      return res.status(400).json({ error: 'This product does not exist.' });
    res.json({ product });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
