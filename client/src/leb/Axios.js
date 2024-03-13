import axios from 'axios';




const Axios = axios.create({
  withCredentials: true,
 

 // baseURL: ,  Replace with your API base URL
   
});
/* const axiosInstance =
  () =>
  async ({ url, method, data, params }) => {
    try {
      const result = await axios({ url: "http://localhost:9003/" + url, method,data, params })
      return { data: result.data }
    } catch (axiosError) {
      let err = axiosError
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      }
    }
  } */



export default Axios;