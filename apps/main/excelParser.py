import xlrd
import sys, os

# This method reads the title of each column of cells to be used as keys for organizaing/retreiving data
def getKeys(ws):
    keyList = []
    x = 0
    while True:
        try:
            keyList.append(ws.cell(0, x).value)
            x+=1
        except:
            break
     
    return keyList

# This method finds and opens a worksheet. The first value is a String, which is the name of the file and should be in the same directory as this file.
# The second is a boolean value that tells the method whether or not to print the data it collects to the terminal. This is primarily for
# troubleshooting purposes.
def parseExcelFile(wb, printValues):
    f = os.path.dirname(__file__)
    workbook = xlrd.open_workbook(f + "/" + wb)
    worksheet = workbook.sheet_by_index(0)

    data = {}
    keys = getKeys(worksheet)
    y=1

    while (y<10000):
        newEntry = {}
        for x in range(1, len(keys)):
            newEntry[keys[x]] = worksheet.cell(y,x).value
        data[worksheet.cell(y,0).value] = newEntry
        y+=1
    
    if(printValues):
        print("\nCollected data:")
        print(data)
    
    return data

# Incomplete method. It will do the same thing as the above method except the output will be in raw JSON form
def parseExcelFileJSON(wb, printValues):
    workbook = xlrd.open_workbook(wb)
    worksheet = workbook.sheet_by_index(0)


