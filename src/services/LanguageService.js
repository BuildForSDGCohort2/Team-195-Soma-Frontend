import http from "../apicommon";

const getAll = () => {
  return http.get("/admin");
};

const get = id => {
  return http.get(`/language/${id}`);
};

const create = data => {
  return http.post("/language", data);
};

const update = (id, data) => {
  return http.put(`/language/${id}`, data);
};

const remove = id => {
  return http.delete(`/language/${id}`);
};


const findByTitle = title => {
    return http.get(`/tutorials?title=${title}`);
  };


export default {
  getAll,
  get,
  create,
  update,
  remove,
  findByTitle
 
};