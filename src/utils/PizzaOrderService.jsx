import { axiosDataClient } from "./dataService";

const getOrders = async () => axiosDataClient.get("/");

const getOrder = async (id) => axiosDataClient.get(`/id:int?id=${id}`);

const createOrder = async (data) => axiosDataClient.post("/", data);

const deleteOrder = async (id) => {
  axiosDataClient.delete(`/id:int?id=${id}`);
};
const updateOrder = async (id, data) =>
  axiosDataClient.put(`/id:int?id=${id}`, data);

export { getOrders, getOrder, createOrder, deleteOrder, updateOrder };
