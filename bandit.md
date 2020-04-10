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

```
