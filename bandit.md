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
cd /tmp
nano aa.sh
# We need a script that outputs all entries. So we create a script to make that script.
# The first line only has 6 numbers because server gives a timeout if we bruteforce all at once.
# So we do it in two segments ([0, 1, 2, 3, 4, 5] AND [6, 7, 8, 9])
for a in 0 1 2 3 4 5
        do
        for b in 0 1 2 3 4 5 6 7 8 9
                do
                for c in 0 1 2 3 4 5 6 7 8 9
                        do
                        for d in 0 1 2 3 4 5 6 7 8 9
                                do
                                echo "echo \"UoMYTrfrBFHyQXmg6gzctqAwOmw1IohZ $a$b$c$d\""
                                done
                        done
                done
        done
# ---
chmod 777 aa.sh
# Output of this script (aa.sh) is the script we actually need (testdata.sh)
./aa.sh > testdata.sh
chmod 777 testdata.sh

# execute the script piped to the netcat connection and get the output in a file (result)
./testdata | nc localhost 30002 > result

# Find the output by grepping and printing a few extra lines.
grep -n -A 3 "Correct" result
```

Level 25 `uNG9O58gUE7snukf3bvZ0rxhtnjzSGzG`
```shell
cat bandit26.privatekey
```

Level 26 `5czgV9L3Xx8JPOyRbXh6lQbmIOWvPT6Z`
```shell
cat /etc/passwd
# This file show that bandit26's shell is some showtext file. So we open that.
cat /usr/bin/showtext
# Here a more command is being used. And then exit is executed to throw us out.
# So we have to stop the execution at the more command, before exit.
# For this we make terminal window extremely strong heighted so that it stops at more.
# Yes, this is actually the way to solve this.

# Now we press v to open this file in vim
# Vim has a command :e that opens any file. So to get the passwd of this level we open bandit26
:e /etc/bandit_pass/bandit26

# Vim also has a command :set so we use it to change the shell
:set shell=/bin/bash

# Vim also has a command to start :shell
:shell

# -------------------------------------------------
# Now we can actually start looking for level 27's password
ls -la
./bandit27-do cat /etc/bandit_pass/bandit27
```

Level 27 `3ba3118a22e93127a4ed485be72ef5ea`
```shell
cd /tmp
git clone ssh://bandit27-git@localhost/home/bandit27-git/repo repo-ankush
cd repo-ankush
cat README
```

Level 28 `0ef186ac70e04ea33b4c1853d2526fa2`
```shell
cd /tmp
git clone ssh://bandit28-git@localhost/home/bandit28-git/repo repo-ankush-2
cd repo-ankush-2
git log
git checkout 186a1038cc54d1358d42d468cdc8e3cc28a93fcb
git status
cat README.md
```

Level 29 `bbc96594b4e001778eee9975372716b2`
```shell
cd /tmp
git clone ssh://bandit29-git@localhost/home/bandit29-git/repo repo-ankush-3
cd repo-ankush-3
git log
git checkout 186a1038cc54d1358d42d468cdc8e3cc28a93fcb
# Found Nothing.
git checkout master
git branch
git branch -r
git checkout dev
cat README.md
```

Level 30 `5b90576bedb2cc04c86a9e924ce42faf`
```shell
cd /tmp
git clone ssh://bandit30-git@localhost/home/bandit30-git/repo repo-ankush-5
cd repo-ankush-5
git tag
# There's a tag called secret.
git show secret
```

Level 31 `47e603bb428404d265f59c42920d81e5`
```shell
cd /tmp
git clone ssh://bandit31-git@localhost/home/bandit31-git/repo repo-ankush-6
cd repo-ankush-6
cat README.md
nano key.txt
# "May I come in?"
git add .
git status
# File doesn't show up
git add key.txt
# The following paths are ignored by one of your .gitignore files:
# key.txt
# Use -f if you really want to add them.
nano .gitignore
# remove *.txt
git add .
git commit -m "asdf"
git push origin master
```

Level 32 `56a9bf19c63d650ce78e6ec0354ee45e`
```shell
ls
# sh: 1: LS: not found
cat readme
# sh: 1: CAT: not found
# So we see, this is the sh shell but every commmand we type is being converted to UPPERCASE.
# There is a special variable $0 which is equal to shell (sh or bash etc). So we execute that variable.
$0
# Now the shell is sh
ls -la
cat /etc/bandit_pass/bandit33
# can also convert the shell to bash using "/bin/bash"
```

Level 33 `c9c3199ddf4121b10cf581a98d51caee`

FIN.
<hr>