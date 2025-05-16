import { client } from "../../api/client";

export const newAdvert = async (formData: FormData) => {
  await client.post("/api/v1/adverts", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getAdverts = async () => {
  const response = await client.get("/api/v1/adverts");

  return response.data;
};

export const getAdvert = async (id: string) => {
  const response = await client.get(`/api/v1/adverts/${id}`);

  return response.data;
};

export const deleteAdvert = async (id: string) => {
  await client.delete(`/api/v1/adverts/${id}`);
};

export const getTags = async () => {
  const response = await client.get("/api/v1/adverts/tags");

  return response.data;
};
