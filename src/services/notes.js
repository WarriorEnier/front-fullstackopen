import axios from "axios";
const baseUrl = "https://back-fullstackopen.onrender.com/api/notes";
//const baseUrl = "http://localhost:3001/api/notes";

const getAll = async () => {
  const req = axios.get(baseUrl);
  try {
    const res = await req;
    return res.data;
  } catch (error) {
    console.error("No se pudo cargar las notas: ", error);
  }
};

const create = async (newObject) => {
  const req = axios.post(baseUrl, newObject);
  try {
    const res = await req;
    return res.data;
  } catch (error) {
    console.error("No se pudo guardar la nota: ", error);
  }
};

const update = async (id, newObject) => {
  const req = axios.put(`${baseUrl}/${id}`, newObject);
  try {
    const res = await req;
    return res.data;
  } catch (error) {
    console.error("No se encontro este id: ", error);
  }
};

export default {
  getAll,
  create,
  update,
};
