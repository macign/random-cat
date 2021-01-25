import axios from "axios";

export default axios.create({
  baseURL: "https://api.thecatapi.com/v1/",
  headers: { "x-api-key": "88a31046-1bab-4f4d-a49c-b389ac230e72" },
});
