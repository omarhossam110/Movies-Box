import axios from "axios";

export const postData = async (url, newData) => {
  let data = null;
  data = await axios.post(url, newData);
  return data;
};
