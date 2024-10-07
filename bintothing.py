import PIL
import PIL.Image

img = PIL.Image.new("RGB", (96,4), 'black')
bits = open("spritesheet-raw.bin", "rb")
bytes_array = bits.read(144)
for triplet in range(0,144*8,3):
    red = 0
    green = 0
    blue = 0
    if bytes_array[triplet // 8] & (128>>(triplet % 8)):
        red = 255
    if bytes_array[(triplet+1) // 8] & (128>>((triplet+1) % 8)):
        green = 255
    if bytes_array[(triplet+2) // 8] & (128>>((triplet+2) % 8)):
        blue = 255
    img.putpixel((triplet // 12, (triplet // 3) % 4), (red, green, blue))
img.save("2x5.png", "PNG")