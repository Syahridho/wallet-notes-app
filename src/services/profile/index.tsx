import instance from "@/lib/axios/instance";

const profileServices = {
  getProfile: () => instance.get("/api/profile"),
};

export default profileServices;
