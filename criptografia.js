const axios = require('axios');
const fs = require('fs');

const getDataUrl = 'https://api.codenation.dev/v1/challenge/dev-ps/generate-data?token=';
const token = '03fa9e9517555f15a0d6349b252a9024be4c517f';

axios.get(getDataUrl+token)
    .then((result) => {
        fs.appendFile('answer.json', JSON.stringify(result.data), (error) => {
            console.log(error);
        });
    });

