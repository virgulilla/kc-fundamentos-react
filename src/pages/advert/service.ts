import { client } from "../../api/client";
import { AdvertsSchema } from "./types";

export const newAdvert = async (formData: FormData) => {
  const response = await client.post("/api/v1/adverts", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const getAdverts = async () => {
  const response = await client.get<unknown>("/api/v1/adverts");
  return AdvertsSchema.parse(response.data);
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
