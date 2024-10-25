import instance from "@/lib/axios/instance";

const transactionServices = {
  getTransaction: () => instance.get("/api/transaction"),
  postTransaction: (data: any) => instance.post("/api/transaction", { data }),
  deleteTransaction: (id: any, idUser: any) =>
    instance.delete(`/api/transaction/${id}`, { params: { idUser } }),
};

export default transactionServices;
