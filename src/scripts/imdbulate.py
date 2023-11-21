from bs4 import BeautifulSoup
from urllib import request
import sys
import shutil
import re
import os

imdbUrl = "https://www.imdb.com/find/?q={query}"
mobyGamesUrl = "https://www.mobygames.com/search/?q={query}"
safeFilenameRegex = "[^A-Za-z0-9 -&+é]+"

def getImdb(searchQuery):

    url = imdbUrl.format(query=searchQuery)
    
    content = request.urlopen(request.Request(url, headers={'User-Agent': 'Mozilla'})).read()
    soup = BeautifulSoup(content, features="html.parser")

    firstResultImg = soup.find("img", {"class": "ipc-image"})
    firstResultTitle = soup.find("a", {"class": "ipc-metadata-list-summary-item__t"}).contents[0]
    
    lowResImageUrl = firstResultImg.get("src")
    highResImageUrl = "/".join(lowResImageUrl.split("_V1_")[:-1]) + "_V1_.jpg"

    safeTitle = re.sub(safeFilenameRegex, '', firstResultTitle)
    print(safeTitle)

    savedFilename = safeTitle+".jpg"
    imgResponse, headers = request.urlretrieve(highResImageUrl, filename=savedFilename)
    return savedFilename

def getMoby(searchQuery):
    url = mobyGamesUrl.format(query=searchQuery)

    opener = request.build_opener()
    opener.addheaders = [('User-agent', 'Mozilla/5.0')]
    request.install_opener(opener)
    
    content = request.urlopen(request.Request(url, headers={'User-Agent': 'Mozilla'})).read()
    soup = BeautifulSoup(content, features="html.parser")

    firstResultUrl = soup.body.div.main.table.tr.td.a.get("href")
    content = request.urlopen(request.Request(firstResultUrl, headers={'User-Agent': 'Mozilla'})).read()
    soup = BeautifulSoup(content, features="html.parser")

    imageUrl = soup.find("img", {"class": "img-box"}).get("src")
    title = soup.find("h1", {"class": "mb-0"}).contents[0]
    safeTitle = re.sub(safeFilenameRegex, '', title)
    print(safeTitle)


    savedFilename = filename=safeTitle + ".webp"
    imgResponse, headers = request.urlretrieve(imageUrl, savedFilename)
    return savedFilename



query = ''
mode = "movie"

while(query != 'q'):
    query = input("> ").replace(' ', '+')
    if query == "movie":
        mode = "movie"
        continue
    elif query == "game":
        mode = "game"
        continue
    elif query == "no":
        os.remove(savedFilename)
        continue

    if mode == "movie":
        savedFilename = getImdb(query)
    elif mode == "game":
        savedFilename = getMoby(query)

print("Exiting.")