import axios from "axios";

export const CreateScore = async (params) =>
  await axios.patch("http://localhost:3002/user/updateUser", params);
export const FetchScore = async (id) =>
  await axios.get(`http://localhost:3002/user/getUserScore/${id}`);
