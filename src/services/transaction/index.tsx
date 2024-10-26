import instance from "@/lib/axios/instance";

const transactionServices = {
  getTransaction: () => instance.get("/api/transaction"),
  postTransaction: (data: any) => instance.post("/api/transaction", { data }),
  putTransaction: (data: any, idUser: any, id: any) =>
    instance.put(`/api/transaction/${idUser}/${id}`, { data }),
  deleteTransaction: (idUser: any, id: any) =>
    instance.delete(`/api/transaction/${idUser}/${id}`),
};

export default transactionServices;
