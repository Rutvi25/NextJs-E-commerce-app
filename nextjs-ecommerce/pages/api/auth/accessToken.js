import jwt from "jsonwebtoken";

import connectDB from "../../../utils/connectDB";
import Users from "../../../models/userModel";
import { createAccessToken } from "../../../utils/generateToken";

connectDB();

export default async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.status(400).json({ error: "Login now!" });

    const result = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    if (!result)
      return res
        .status(400)
        .json({ error: "Token is either incorrect or expired!" });

    const user = await Users.findById(result.id);
    if (!user) return res.status(400).json({ error: "User doesn't exists!" });
    
    const access_token = createAccessToken({ id: user._id });
    res.json({
      access_token,
      user: {
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        root: user.root,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
