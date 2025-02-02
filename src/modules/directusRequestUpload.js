import axios from 'axios'

async function directusRequest(query, data, method, headers) {

  console.log(data)

  var requestData = [];
  let config = {
    method: method,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type,Authorization,Access-Control-Allow-Origin,Access-Control-Allow-Headers',
      'Authorization': process.env.REACT_APP_DIRECTUS_API_TOKEN
    },
    maxBodyLength: Infinity,
    url: process.env.REACT_APP_DIRECTUS_API_URL + query,
    data: data,

  };

  config.headers = { ...config.headers, ...headers };
  
  try {    
    const response = await axios.request(config);
    requestData = response.data.data;
    
    return requestData;
  } catch (error) {
    console.log(error);
  }
}

export default directusRequest;
