import {
  addDataById,
  deleteTransactionById,
  retrieveDataById,
} from "@/lib/firebase/services";
import { verify } from "@/utils/verifyToken";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const segments = req.query.api || [];

  if (req.method === "GET") {
    verify(req, res, async (decoded: { id: string }) => {
      const transaction: any = await retrieveDataById(
        "transaction",
        decoded.id
      );
      if (transaction) {
        transaction.id = decoded.id;
        res
          .status(200)
          .json({ statusCode: 200, message: "Success", data: transaction });
      } else {
        res.status(404).json({ statusCode: 404, message: "Not Found" });
      }
    });
  } else if (req.method === "POST") {
    verify(req, res, async () => {
      const { data } = req.body;

      await addDataById("transaction", data, (result: any) => {
        if (result) {
          res.status(200).json({ statusCode: 200, message: "Success" });
        } else {
          res.status(500).json({ statusCode: 500, message: "Faild Push" });
        }
      });
    });
  } else if (req.method === "DELETE") {
    verify(req, res, async () => {
      const id = segments[0];
      const { idUser } = req.query;

      if (!id || !idUser) {
        return res.status(400).json({
          statusCode: 400,
          message: "Missing required parameters",
        });
      }

      await deleteTransactionById(id, idUser as string, (result: any) => {
        if (result) {
          res.status(200).json({ statusCode: 200, message: "Success" });
        } else {
          res.status(500).json({ statusCode: 500, message: "Faild Push" });
        }
      });
    });
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}

export const config = {
  api: {
    externalResolver: true,
  },
};
