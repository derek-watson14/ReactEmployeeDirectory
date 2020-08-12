import axios from "axios";

export default {
  randomEmployees: async function () {
    return await axios.get("https://randomuser.me/api/?results=50&nat=us");
  },
};
