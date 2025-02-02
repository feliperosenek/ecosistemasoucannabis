const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

async function directusRequest(query, data, method) {
  var requestData = [];

  let config = {
    method: method,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type,Authorization,Access-Control-Allow-Origin,Access-Control-Allow-Headers',
      'Authorization': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU2ZjAzMTVmLTc5ZWEtNGQ0ZS04Mzg0LTI3NTMxZTNmNDU2MiIsInJvbGUiOiI3ZWE3NzA0Mi1hZDhlLTQ5YTgtOTg3YS0zMzRkYThhYTI2MjEiLCJhcHBfYWNjZXNzIjp0cnVlLCJhZG1pbl9hY2Nlc3MiOnRydWUsImlhdCI6MTY4NjcwODM1MCwiZXhwIjoxNjg2NzA5MjUwLCJpc3MiOiJkaXJlY3R1cyJ9.Yzwml_u-KZr2OAd_pmyQkoMkuItE2WyczDuuo9wvDnc"
    },
    maxBodyLength: Infinity,
    url: process.env.REACT_APP_DIRECTUS_API_URL + query,
    data: data
  };

  try {
    const response = await axios.request(config);
    if (query == "/folders") {
      requestData = response.data.data;
    } else {
      requestData = response.data.data[0];
    }
    // delete requestData.id; 
    return requestData;
  } catch (error) {
    console.log("Erro")
    console.log(error.response.data.errors);
  }
}

module.exports = directusRequest;
