import instance from "@/lib/axios/instance";

const transactionServices = {
  getProfile: () => instance.get("/api/transaction"),
};

export default transactionServices;
