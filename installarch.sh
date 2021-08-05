#!/bin/bash
initial_setup() {
  timedatectl set-ntp true
}
select_disk() {
  lsblk
  echo "Which disk do you want to install to?"
  read diskinstall
  echo "Do you want to set up new partitions?"
  select yn in "Yes" "No"; do
    case $yn in
        Yes ) cfdisk $diskinstall; break;;
        No ) break;;
    esac
  done
}
select_partitions() {
  echo "Which is the root parition?"
  read rootpart
  echo "Which is the EFI system partition?"
  read efisyspart
  echo "Format the disk now?"
  select yn in "Yes" "No"; do
    case $yn in
        Yes ) mkfs.ext4 $rootpart; mkfs.fat -F 32 $efisyspart; break;;
        No ) break;;
    esac
  done
}
mount_disks() {
  mount $rootpart /mnt
  mkdir /mnt/boot
  mount $efisyspart /mnt/boot
}
install_base() {
  reflector
  pacstrap /mnt base base-devel linux linux-firmware iwd modemmanager nano man-db man-pages texinfo python3 grub efibootmgr
  genfstab -U /mnt >> /mnt/etc/genfstab
}
select_timezone() {
  cat <<EOF > /mnt/installer_select_timezone.sh
  echo "Your timezone?"
  select tzregion in /usr/share/zoneinfo/*; do
    select tzfile in $tzregion/*; do
       ln -sf $tzfile /etc/localtime
      break
    done
    break
  done
  hwclock --systohc
  exit
  EOF
  arch-chroot /mnt /installer_select_timezone.sh
}
select_locale() {
  cat <<EOF > /mnt/installer_select_locale.sh
  #!/bin/bash
  echo "Choose a locale, e.g. en_US"
  read localemain
  echo $localemain.UTF-8 UTF-8 > /etc/locale.gen
  locale-gen
  echo $localemain.UTF-8 > /etc/locale.conf
  exit
  EOF
  arch-chroot /mnt /installer_select_locale.sh
}
select_hostname() {
  cat <<EOF > /mnt/installer_select_hostname.sh
  echo "Your hostname?"
  read hostnamechoice
  echo $hostnamechoice > /etc/hostname
  cat <<END > /etc/hosts
  127.0.0.1 $hostnamechoice
  ::1 $hostnamechoice
  127.0.1.1 $hostnamechoice.localdomain $hostnamechoice
  END
  exit
  EOF
  arch-chroot /mnt /installer_select_hostname.sh
}
select_root_password() {
  cat <<EOF > /mnt/installer_select_root_password.sh
  echo "Your root password?"
  passwd
  exit
  EOF
  arch-chroot /mnt /installer_select_root_password.sh
}
install_grub_bootloader() {
  cat <<EOF > /mnt/installer_install_grub_bootloader.sh
  grub-install --target=x86_64-efi --efi-directory=/boot --bootloader-id=GRUB
  exit
  EOF
  arch-chroot /mnt /installer_install_grub_bootloader.sh
}
initial_setup
select_disk
select_partitions
mount_disks
install_base
select_timezone
select_locale
select_hostname
select_root_password
install_grub_bootloader
