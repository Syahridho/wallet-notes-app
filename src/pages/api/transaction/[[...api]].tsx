import {
  createTransaction,
  deleteTransactionById,
  retrieveDataByIdTransaction,
  updateTransaction,
} from "@/lib/firebase/services";
import { verify } from "@/utils/verifyToken";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // const segments = req.query.api || [];

  if (req.method === "GET") {
    verify(req, res, async (decoded: { id: string }) => {
      try {
        // Ambil data transaksi berdasarkan user ID yang didekodekan dari token
        const transaction = await retrieveDataByIdTransaction(decoded.id);

        if (transaction) {
          transaction.id = decoded.id;
          res.status(200).json({
            statusCode: 200,
            message: "Success",
            data: transaction,
          });
        } else {
          res.status(404).json({ statusCode: 404, message: "Not Found" });
        }
      } catch (error) {
        console.error("Error retrieving transaction:", error);
        res.status(500).json({
          statusCode: 500,
          message: "Internal Server Error",
        });
      }
    });
  } else if (req.method === "POST") {
    verify(req, res, async (decoded: { id: string }) => {
      const { data } = req.body;

      try {
        if (!decoded?.id) {
          return res.status(400).json({
            statusCode: 400,
            message: "User ID not found in token",
            debug: { decoded }, // Untuk debugging
          });
        }

        const transactionData = {
          amount: data.amount,
          type: data.type, // atau sesuai dengan data.type
          description: data.description,
        };

        const result = await createTransaction(decoded.id, transactionData);

        return res.status(200).json({
          statusCode: 200,
          message: "Success",
          data: result,
        });
      } catch (error: any) {
        console.error("Error creating transaction:", error);
        return res.status(400).json({
          statusCode: 400,
          message: error.message || "Failed to create transaction",
        });
      }
    });
  } else if (req.method === "PUT") {
    verify(req, res, async () => {
      const [idUser, id]: any = req.query.api || [];
      const { data } = req.body;

      if (!id || !idUser) {
        return res.status(400).json({
          statusCode: 400,
          message: "Missing required parameters",
        });
      }

      try {
        const result = await updateTransaction(idUser, id, data);

        return res.status(200).json({
          statusCode: 200,
          message: "Success update",
          data: result,
        });
      } catch (error: any) {
        console.error("Error creating transaction:", error);
        return res.status(400).json({
          statusCode: 400,
          message: error.message || "Failed to create transaction",
        });
      }
    });
  } else if (req.method === "DELETE") {
    verify(req, res, async () => {
      const [idUser, id]: any = req.query.api || [];

      if (!id || !idUser) {
        return res.status(400).json({
          statusCode: 400,
          message: "Missing required parameters",
        });
      }

      try {
        const result = await deleteTransactionById(idUser, id);

        return res.status(200).json({
          statusCode: 200,
          message: "Success",
          data: result,
        });
      } catch (error: any) {
        console.error("Error creating transaction:", error);
        return res.status(400).json({
          statusCode: 400,
          message: error.message || "Failed to create transaction",
        });
      }
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
