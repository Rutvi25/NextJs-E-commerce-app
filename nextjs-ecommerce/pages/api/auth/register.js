import bcrypt from 'bcrypt';

import connectDB from '../../../utils/connectDB';
import Users from '../../../models/userModel';
import validate from '../../../utils/validate';

connectDB();

export default async (req, res) => {
  switch(req.method) {
    case 'POST':
      await register(req, res);
      break;
  }
}

const register = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    const errMsg = validate(name, email, password, confirmPassword);
    if(errMsg) return res.status(400).json({ error: errMsg });
    const user = await Users.findOne({ email })
    if(user) return res.status(400).json({ error: 'This email is already exists' });
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new Users({ name, email, password: hashedPassword, confirmPassword });
    console.log(newUser);
    await newUser.save()
    res.json({message: 'Registered successfully!'})
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}