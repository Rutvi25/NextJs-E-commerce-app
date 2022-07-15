import bcrypt from 'bcrypt';

import connectDB from '../../../utils/connectDB';
import Users from '../../../models/userModel';
import {
  createAccessToken,
  createRefreshToken,
} from '../../../utils/generateToken';

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case 'POST':
      await login(req, res);
      break;
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email });
    if (!user) return res.status(400).json({ error: 'User doesn\'t exists.' });

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch)
      return res.status(400).json({ error: 'Incorrect password!' });

    const access_token = createAccessToken({ id: user._id });
    const refresh_token = createRefreshToken({ id: user._id });

    res.json({
      message: 'Login successful!',
      refresh_token,
      access_token,
      user: { 
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        root: user.root,
        role: user.role
      },
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};