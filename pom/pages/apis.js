const axios = require('axios');

class ApiPage {

async addUserViaAPI(email, password, url){

    const bodyParameters = {
      email: email,
      password: password
    };
  
    return await axios.post(url+"/api/auth/register",bodyParameters,{headers:{Accept:'application/json'}})
    .then((response) => {
        return response;
    })
};

}

module.exports = new ApiPage();