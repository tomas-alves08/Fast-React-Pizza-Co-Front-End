import { axiosDataClient } from "./dataService";

const getPizzas = async () => axiosDataClient.get("/PizzaData");

export { getPizzas };
