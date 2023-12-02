import json
import os

imagespath = "C:/users/jedic/source/repos/favesorter/public/images/"
datapath = "C:/users/jedic/source/repos/favesorter/src/data.json"

dataFile = open(datapath, 'r+')
data = json.load(dataFile)
needToUpdate = False

for folder in os.listdir(imagespath):
    # check that all folders have entries
    if folder not in data:
        needToUpdate = True
        print("adding " + folder + " to data.json")
        data[folder] = {}
        data[folder]["prettyname"] = input("Name of category: ")
        data[folder]["foldername"] = folder
        data[folder]["filenames"] = []

    # make sure all the filenames are there
    for file in os.listdir(imagespath + folder):
        if file not in data[folder]["filenames"]:
            needToUpdate = True
            data[folder]["filenames"].append(file)

dataFile.close()

if needToUpdate:
    dataFile = open(datapath, 'w+')
    json.dump(data, dataFile)
    dataFile.close()
