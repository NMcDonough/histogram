function objHist(obj, key, bins){
    var objects = objectify(obj);
    var interval;
    bins = binsCalc(objects, Object.values(obj[key]));
}

function objectify(obj) {
    keys = Object.keys(obj);
    objArr = [];

    for(let x = 0; x < keys.length; x++) {
        let key = keys[x];
        for(let y = 0; y < Object.values(obj[key]).length; y++) {
            objArr.push({});
            objArr[y][key] = obj[key][y];
        }
    }

    return objArr;
}

function binsCalc(objects, values) {
    var y = (1 / Math.cbrt(values.length));
    console.log("1.) Inverse of the cube root of the number of values :",y)
    var mean = values.reduce((a,b) => a + b, 0);
    mean /= values.length;
    console.log("2.) Average of all values in the data set:", mean)
    var meanDeviation = 0;
    
    for(let x = 0; x < values.length; x++)
        meanDeviation += Math.pow((values[x] - mean), 2);
    meanDeviation = Math.sqrt(meanDeviation /= values.length);
    console.log("3.) Mean deviation from the mean value of the dataset:", meanDeviation);
    var binSize = (meanDeviation * y * 3.49);
    console.log("4.) Find the square root of the mean deviation of the data\nand multiply by 3.49 to ge the bin size:", binSize)

    var bins = [[],[]] //Initalize an empty 2D array; the inner arrays will hold the values that fit into each bin, and the objects that go into each bin, respoctively

    for(let x = Math.min(...values); x <= Math.max(...values); x += binSize) { // iterates by binSize
        console.log(x, " + ", binSize, " = ", x + binSize)
        for(let y = 0; y < values.length; y += 1) {
            if(values[y] >= x && values[y] < (x + binSize)) {
                bins[0].push(values[y]);
                bins[1].push(objects[y]);
            }
        }
    }

    return bins;
}