import axios from "axios";

const URL_ROOT = `http://localhost:4000/api/productos`;

const getProductsService = async () => {
  const response = await axios.get(`${URL_ROOT}`);
};

const getProductService = async () => {
  const response = await axios.get(`${URL_ROOT}/${id}`);
  return response;
};

export { getProductsService, getProductService };
