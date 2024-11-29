import axios from "axios";
const base_url = "http://localhost:3001/api/requests";

export const addRequest = async (to_id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    `${base_url}/add-friend-request/${to_id}`,
    {},
    config
  );

  return response.data;
};

export const getMyRequests = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${base_url}/my-requests`, config);
  return response.data;
};
