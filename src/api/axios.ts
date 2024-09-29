import axios from "axios";

const API_URL = "https://api.example.com"; // כתובת ה-API

// קריאה לשרת כדי לקבל נתוני bids
export const fetchBidsData = async () => {
  try {
    const response = await axios.get(`${API_URL}/bids`);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching bids data");
  }
};

// קריאה לשרת כדי לשלוח נתוני bids חדשים
export const postNewBid = async (bid: number) => {
  try {
    const response = await axios.post(`${API_URL}/bids`, { bid });
    return response.data;
  } catch (error) {
    throw new Error("Error posting new bid");
  }
};
