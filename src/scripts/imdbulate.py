from bs4 import BeautifulSoup
from urllib import request
import sys
import re

imdbUrl = "https://www.imdb.com/find/?q={query}"


def getGame(searchQuery):
    url = imdbUrl.format(query=searchQuery)
    
    content = request.urlopen(request.Request(url, headers={'User-Agent': 'Mozilla'})).read()
    soup = BeautifulSoup(content, features="html.parser")
    imageUrl = soup.find("img", {"class": "ipc-image"}).get("src")
    realUrl = "/".join(imageUrl.split("_V1_")[:-1]) + "_V1_.jpg"
    
    print(realUrl)



getGame( '+'.join(sys.argv[1:]) )