import axios from 'axios';

const { REACT_APP_API_KEY } = process.env;
export default axios.create({
  baseURL: "https://gnews.io/api/v4",
  params: {
    token: REACT_APP_API_KEY,
  },
});
