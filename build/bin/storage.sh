#!/bin/bash
# script for setting up external storage

homedir=${2:-/home/elabox}
storage=${1}
echo $storage
echo 'y' |  mkfs.ext4 /dev/$storage
sudo mount /dev/$storage $homedir
# check the unique identifier of /dev/sda
USD_UUID=$(sudo blkid | grep /dev/$storage | cut -d '"' -f 2)
# update the /etc/fstab file to auto-mount the disk on startup
echo "UUID=${USD_UUID} $homedir ext4 defaults 0 0" | tee -a /etc/fstab > /dev/null
chown -R elabox:elabox $homedir