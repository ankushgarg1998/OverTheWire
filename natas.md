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
- Press Enter
```

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
