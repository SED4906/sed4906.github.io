import PIL
import PIL.Image

sheet = PIL.Image.open(r"spritesheet-strip.png")
img = PIL.Image.new("RGB", (96,4), 'black')
for ch in range(96):
    for y in range(4):
        red = 0
        green = 0
        blue = 0
        if sheet.getpixel((ch * 3, y)) == (255, 255, 255, 255):
            red = 255
        if sheet.getpixel((ch * 3 + 1, y)) == (255, 255, 255, 255):
            green = 255
        if sheet.getpixel((ch * 3 + 2, y)) == (255, 255, 255, 255):
            blue = 255
        img.putpixel((ch, y), (red, green, blue))
img.save("1x4.png", "PNG")
