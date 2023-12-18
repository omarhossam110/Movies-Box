import axios from "axios";

export const fetchData = async (url, headers) => {
  let data = null;
  data = await axios.get(url, headers);
  return data;
};

