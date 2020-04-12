# Bandit Solutions

Connecting to the machine.
```shell
ssh bandit0@bandit.labs.overthewire.org -p 2220
```



Level 0
```shell
cat readme
```

Level 1 `boJ9jbbUNNfktd78OOpsqOltutMc3MY1`
```shell
cat ./-
```

Level 2 `CV1DtqXWVFXTvM2F0k09SHz0YwRINYA9`
```shell
cat spaces\ in\ this\ filename
```

Level 3 `UmHadQclWmgdLOKQ3YNgjWxGoRMb5luK`
```shell
cd inhere
ls -a
cat .hidden
```

Level 4 `pIwrPrtPN36QITSp3EQaw936yaFoFgAB`
```shell
cd inhere
find . -type f -exec cat {} \; -exec echo -e "\n\n" \;
```

Level 5 `koReBOKuIDDepwhWk7jZC0RTdopnAYKh`
```shell
cd inhere
find . -type f -size 1033c -exec cat {} \;
```

Level 6 `DXjZPULLxYr17uwoI01bNLQbtFemEgo7`
```shell
find / -type f -user bandit7 -exec cat {} \;
```

Level 7 `HKBPTKQnIay4Fw76bEy8PVxKEDQRKTzs`
```shell
grep "millionth" data.txt
```

Level 8 `cvX2JJa4CFALtqS87jk27qwqGhBM9plV`
```shell
sort data.txt | uniq -c
```

Level 9 `UsvVyFSfZZWbi6wgC7dAFyFuR6jQQUhR`
```shell
cat data.txt | tr -d '\000' | grep "="
```

Level 10 `truKLdjsbJ5g7yyJ2X2R0o3a5HQJFuLk`
```shell
base64 -d data.txt
```

Level 11 `IFukwKGsFW8MOq3IRFqrxE1hxTNEbUPR`
```shell
cat data.txt | tr 'N-ZA-Mn-za-m' 'A-Za-z'
```

Level 12 `5Te8Y4drgCRfCx8ugdwuEX8KFC6k2EUu`
```shell
mkdir /tmp/ankush123
mv data.txt /tmp/ankush123/asdf.txt
cd /tmp/ankush123
xxd -r asdf.txt > data
file data
# Retured: 
# data1: gzip compressed data, was "data2.bin", last modified: Tue Oct 16 12:00:23 2018, max compression, from Unix
mv data data.gz
gzip -d data.gz
ls
file data
# data: bzip2 compressed data, block size = 900k
mv data data.bz2
bzip2 -d data.bz2
file data
# data: gzip compressed data, was "data4.bin", last modified: Tue Oct 16 12:00:23 2018, max compression, from Unix
mv data data.gz
gzip -d data.gz
file data
# data: POSIX tar archive (GNU)
tar -xvf data
tar -xvf data5.bin
bzip2 -d data6.bin
tar -xvf data6.bin.out
mv data8.bin data8.gz
gzip -d data8.gz
cat data8
```

Level 13 `8ZjyCRiBWFYkneahHwxCv3wb2a1ORpYL`
```shell
cat ssh.privatekey
```

This level gives a private key instead of a password for the next level (level-14).

Use this private key to log into Level 14 and get the password of level 14 from /etc/bandit_pass/bandit14

Level 14 `4wcYUJFw0k0XLShlDzztnTBHiqxU3b3e`
```shell
telnet localhost 30000
# paste this level's password
```

Level 15 `BfMYroe26WYalil77FoDi9qh59eK5xNr`
```shell
openssl s_client -connect localhost:30001
# paste this level's password
```

Level 16 `cluFn7wTiGryunymYOu4RcffSxQluehd`
```shell
nmap -vv localhost -p 31000-32000
# try making an ssl connection on both ports
# Only one connects 
openssl s_client -connect localhost:31790
# paste this level's password
# It returns a private key
```

Level 17 `{private-key}`
```shell
diff passwords.new passwords.old
```

Level 18 `kfBf3eYk5BPBRzwjqutbbfE887SVc5Yd`
```shell
#Run this on your own machine
scp -P 2220 bandit18@bandit.labs.overthewire.org:/home/bandit18/readme ./
cat readme
```

Level 19 `IueksS7Ubh8G3DCwVzrTd8rAVOwq3M5x`
```shell
./bandit20-do cat /etc/bandit_pass/bandit20
```

Level 20 `GbKksEFF4yrVs6il55v6gwY5aVje5f0j`
```shell
# open multiple tabs with tmux
tmux
# divide in two panes by: Ctrl+b "
# on first pane start a netcat connection listener
nc -l -p 8888
# move to the second pane Ctrl+b ↓
# connect to this port
./suconnect 888
# move back to the first pane Ctrl+b ↑
# Paste to current password
```

Level 21 `gE269g2h3mw3pwgrj0Ha9Uoqen1c9DGr`
```shell
cd /etc/cron.d/
ls -la
cat cronjob_bandit22
cat /usr/bin/cronjob_bandit22.sh
# Following is printed
# #!/bin/bash
# chmod 644 /tmp/t7O6lds9S0RqQh9aMcz6ShpAoZKF7fgv
# cat /etc/bandit_pass/bandit22 > /tmp/t7O6lds9S0RqQh9aMcz6ShpAoZKF7fgv
cat /tmp/t7O6lds9S0RqQh9aMcz6ShpAoZKF7fgv
```

Level 22 `Yk7owGAcWjwMVRwrTesJEwB7WVOiILLI`
```shell
cd /etc/cron.d/
ls -la
cat cronjob_bandit23
cat /usr/bin/cronjob_bandit23.sh
# #!/bin/bash
# myname=$(whoami)
# mytarget=$(echo I am user $myname | md5sum | cut -d ' ' -f 1)
# echo "Copying passwordfile /etc/bandit_pass/$myname to /tmp/$mytarget"
# cat /etc/bandit_pass/$myname > /tmp/$mytarget
echo I am user bandit23 | md5sum | cut -d ' ' -f 1
# 8ca319486bfbbc3663ea0fbe81326349
cat /tmp/8ca319486bfbbc3663ea0fbe81326349
```

Level 23 `jc1udXuA1tiHqjIsL8yaapX5XIAI6i0n`
```shell
cd /etc/cron.d/
ls -la
cat cronjob_bandit23
cat /usr/bin/cronjob_bandit23.sh
# Following script is printed:
# #!/bin/bash
# myname=$(whoami)
# cd /var/spool/$myname
# echo "Executing and deleting all scripts in /var/spool/$myname:"
# for i in * .*;
# do
#     if [ "$i" != "." -a "$i" != ".." ];
#     then
# 	echo "Handling $i"
# 	timeout -s 9 60 ./$i
# 	rm -f ./$i
#     fi
# done

# Make a file which is writable by all users.
touch /tmp/ankush-level-24
chmod 777 /tmp/ankush-level-24

cd /var/spool/bandit24
nano ankush.sh

# Put the following script in ankush.sh
cat /etc/bandit_pass/bandit24 > /tmp/ankush-level-24
# Make this file executable for all users
chmod 777 ankush123.sh

# after the cron is executed.
cat /tmp/ankush-level-24
```

Level 24 `UoMYTrfrBFHyQXmg6gzctqAwOmw1IohZ`
```shell

```

Level 25 ``
```shell

```

Level 26 ``
```shell

```

Level 27 ``
```shell

```

Level 28 ``
```shell

```

Level 29 ``
```shell

```

Level 30 ``
```shell

```

Level 31 ``
```shell

```

Level 32 ``
```shell

```

Level 33 ``
```shell

```

