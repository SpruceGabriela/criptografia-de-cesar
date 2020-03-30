const axios = require('axios');
const fs = require('fs');
const sha1 = require('sha1');

const getDataUrl = 'https://api.codenation.dev/v1/challenge/dev-ps/generate-data?token=';
const token = '03fa9e9517555f15a0d6349b252a9024be4c517f';

const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');

const decrypt = (crypted, number) => {
    let decrypted = '';

    for(word of crypted){
        const index = letters.indexOf(word);

        if(index < number && index != -1){
            decrypted += letters[letters.length - number + index];
        }else if(index == -1){
            decrypted += word;
        }
        else decrypted += letters[index - number];
    }

    return decrypted;
}

axios.get(getDataUrl+token)
    .then((result) => {
        const exist = fs.existsSync('answer.json');

        if(!exist){
            fs.appendFileSync('answer.json', JSON.stringify(result.data));
        }

        const decryptedPhrase = decrypt(result.data.cifrado, result.data.numero_casas);

        result.data.decifrado = decryptedPhrase;

        result.data.resumo_criptografico = sha1(decryptedPhrase);

        fs.writeFileSync('answer.json', JSON.stringify(result.data));
    });


