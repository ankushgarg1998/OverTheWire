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
