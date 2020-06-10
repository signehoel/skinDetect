import os

benigntestdirectory = r'skin-cancer-malignant-vs-benign/test/benign'
malignanttestdirectory = r'skin-cancer-malignant-vs-benign/test/malignant'

benigntraindirectory = r'skin-cancer-malignant-vs-benign/train/benign'
malignanttraindirectory = r'skin-cancer-malignant-vs-benign/train/malignant'

testbenign = "gs://skin-lesion-classifier-277418-vcm/skin-cancer-malignant-vs-benign/test/benign/"
testmalignant = "gs://skin-lesion-classifier-277418-vcm/skin-cancer-malignant-vs-benign/test/malignant/"

trainbenign = "gs://skin-lesion-classifier-277418-vcm/skin-cancer-malignant-vs-benign/train/benign/"
trainmalignant = "gs://skin-lesion-classifier-277418-vcm/skin-cancer-malignant-vs-benign/train/malignant/"

for benigntest in os.listdir(benigntestdirectory):
    print(testbenign + benigntest + ",benign")

for malignanttest in os.listdir(malignanttestdirectory):
    print(testmalignant + malignanttest + ",malignant")

for benigntrain in os.listdir(benigntraindirectory):
    print(trainbenign + benigntrain + ",benign")

for malignanttrain in os.listdir(malignanttraindirectory):
    print(trainmalignant + malignanttrain + ",malignant")
