# Learnings from Natas


### PHP
- ***Natas 12***: If you can upload a php file on a server and open it in a browser, you can essentially run any terminal command on that server.

- ***Natas 13***: PHP's ```exif_imagetype``` function can be easily fooled, because it only read the first few bytes of the file to check for its signature. We can easily prepend any random bytes to a PHP file.


### SQL Injection
- ***Natas 14***: SQL Injection for ```WHERE column="?" AND ...``` is ```WHERE column="test" OR column LIKE "%" -- AND```

- ***Natas 15***: A DB query with a boolean return value (user exists OR not exists) can be combined with brute-force to get the value of a row in another column, if value in one column in the row is known.

