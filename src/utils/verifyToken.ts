import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

// Cek struktur decoded token
export const verify = (
  req: NextApiRequest,
  res: NextApiResponse,
  callback: Function
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    jwt.verify(
      token,
      process.env.NEXTAUTH_SECRET || "",
      async (error: any, decoded: any) => {
        if (decoded) {
          callback(decoded);
        } else {
          res.status(403).json({ message: "access denied 1 " });
        }
      }
    );
  } else {
    res.status(403).json({ message: "access denied 2" });
  }
};
