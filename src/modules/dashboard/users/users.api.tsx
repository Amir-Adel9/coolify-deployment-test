import httpClient from "../../../utils/http-client";

// User CRUD
export const getUsers = async (page: number = 1) => {
  const { data } = await httpClient.get(`/dashboard/users`, {
    params: { page },
  });
  return data;
};

export const getUser = async (userID: string) => {
  const { data } = await httpClient.get(`/dashboard/users/${userID}`);
  return data;
};

export const createUsers = async (userData: any) => {
  const { data } = await httpClient.post(`/dashboard/users`, userData);
  return data;
};

export const deleteUsers = async (usersID: string) => {
  const { data } = await httpClient.delete(`/dashboard/users/${usersID}`);
  return data;
};

export const updateUser = async (userData: any) => {
  const { data } = await httpClient.put(`/dashboard/users/${userData.id}`, userData);
  return data;
};

// Get Roles
export const getRoles = async () => {
  const { data } = await httpClient.get(`/dashboard/roles`);
  return data;
};
