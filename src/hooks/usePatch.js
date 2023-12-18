import axios from "axios";

export const patchData = async (url, newData) => {
  let data = null;
  data = await axios.patch(url, newData);
  return data;
};
