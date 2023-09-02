import { axiosDataClient } from "./dataService";

const getOrders = async () => axiosDataClient.get("/PizzaOrder");

const getOrder = async (id) =>
  axiosDataClient.get(`/PizzaOrder/id:int?id=${id}`);

const createOrder = async (data) => axiosDataClient.post("/PizzaOrder", data);

const deleteOrder = async (id) => {
  axiosDataClient.delete(`/PizzaOrder/id:int?id=${id}`);
};
const updateOrder = async (id, data) =>
  axiosDataClient.put(`/PizzaOrder/id:int?id=${id}`, data);

export { getOrders, getOrder, createOrder, deleteOrder, updateOrder };
