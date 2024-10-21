import { retrieveDataById } from "@/lib/firebase/services";
import { verify } from "@/utils/verifyToken";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    verify(req, res, async (decoded: { id: string }) => {
      const profile: any = await retrieveDataById("users", decoded.id);
      console.log("Profile:", profile);
      if (profile) {
        profile.id = decoded.id;
        res
          .status(200)
          .json({ statusCode: 200, message: "Success", data: profile });
      } else {
        res.status(404).json({ statusCode: 404, message: "Not Found" });
      }
    });
  } else if (req.method === "POST") {
    console.log("hello");
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}

export const config = {
  api: {
    externalResolver: true,
  },
};
