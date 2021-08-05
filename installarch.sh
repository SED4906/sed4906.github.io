#!/bin/bash
timedatectl set-ntp true
lsblk
echo Which disk do you want to install to?
read diskinstall
cfdisk $diskinstall
echo Which is the root parition?
read rootpart
echo Which is the EFI system partition?
read efisyspart
mkfs.ext4 $rootpart
mkfs.fat -F 32 $efisyspart
mount $rootpart /mnt
mkdir /mnt/boot
mount $efisyspart /mnt/boot
reflector
pacstrap /mnt base base-devel linux linux-firmware iwd modemmanager nano man-db man-pages texinfo python3 grub efibootmgr
genfstab -U /mnt >> /mnt/etc/genfstab
arch-chroot /mount
echo Select a timezone.
select tzfile in /usr/share/zoneinfo/*/*
ln -sf $tzfile /etc/localtime
hwclock --systohc
echo Choose a locale, as in en_US
read localemain
echo $localemain.UTF-8 UTF-8 > /etc/locale.gen
locale-gen
echo $localemain.UTF-8 > /etc/locale-conf
echo Your hostname?
read hostnamechoice
echo $hostnamechoice > /etc/hostname
cat <<EOF>/etc/hosts
127.0.0.1 $hostnamechoice
::1 $hostnamechoice
127.0.1.1 $hostnamechoice.localdomain $hostnamechoice
EOF
echo Set the root password.
passwd
grub-install --target=x86_64-efi --efi-directory=/boot --bootloader-id=GRUB
echo Done.
