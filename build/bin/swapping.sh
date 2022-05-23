#!/bin/bash
# script for setting memory swapping/paging
if [ ! -d "/var/cache/swap" ]; then 
    echo "Setting up cache swap files..."
    sudo mkdir -v /var/cache/swap
    cd /var/cache/swap
    sudo dd if=/dev/zero of=swapfile bs=1K count=4M
    sudo chmod 600 swapfile
    sudo mkswap swapfile
    sudo swapon swapfile
    echo "/var/cache/swap/swapfile none swap sw 0 0" | sudo tee -a /etc/fstab
    top -bn1 | grep -i swap
elif ! grep -q '/var/cache/swap/swapfile none swap sw 0 0' /etc/fstab ; then
    # bug fix for build #2. swapfile was not registered to fstab
    echo "/var/cache/swap/swapfile none swap sw 0 0" | sudo tee -a /etc/fstab
fi