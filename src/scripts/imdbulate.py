from bs4 import BeautifulSoup
from urllib import request
import sys
import shutil

imdbUrl = "https://www.imdb.com/find/?q={query}"


def getGame(searchQuery):

    url = imdbUrl.format(query=searchQuery)
    
    content = request.urlopen(request.Request(url, headers={'User-Agent': 'Mozilla'})).read()
    soup = BeautifulSoup(content, features="html.parser")

    firstResultImg = soup.find("img", {"class": "ipc-image"})
    firstResultTitle = soup.find("a", {"class": "ipc-metadata-list-summary-item__t"}).contents[0]
    
    lowResImageUrl = firstResultImg.get("src")
    highResImageUrl = "/".join(lowResImageUrl.split("_V1_")[:-1]) + "_V1_.jpg"
    
    print(firstResultTitle)
    print(highResImageUrl)

    imgResponse, headers = request.urlretrieve(highResImageUrl, filename=firstResultTitle+".jpg")



if(len(sys.argv) == 1):
    print("Enter a search query.\n")
else:
    getGame( '+'.join(sys.argv[1:]) )