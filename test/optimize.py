from PIL import Image, ImageFilter
import rawpy
import numpy
import imageio
import glob, os

dirpath = os.getcwd()
os.mkdir(dirpath + "/optimized")

src = glob.glob("*.jpg")

size = 1500, 1500

for infile in src:
  file, ext = os.path.splitext(infile)
  im = Image.open(infile)
  im.thumbnail(size, Image.ANTIALIAS)
  im.save(dirpath + "/optimized/" + file + ".jpg", optimize=True, quality=75)