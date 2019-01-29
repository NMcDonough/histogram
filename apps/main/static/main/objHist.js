function objHist(obj, key, bins){
    var objects = objectify(obj);
    var values = getValues(objects, key);
    bins = binsCalc(objects, values);
    exampleHistogram(bins);
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

    var sanitized = objArr.filter(obj => obj['total_revenue'] != undefined)
    // sanitized = sanitized.filter(obj => obj['total_revenue'] < 400000 && obj['total_revenue'] > 0)
    return sanitized;
}

function getValues(arr, key) {
    var newarr = []

    for(let x = 0; x < arr.length; x++)
        newarr.push(arr[x][key])
    
    return newarr;
}

function binsCalc(objects, values) {
    var y = (1 / Math.cbrt(values.length));
    console.log("1.) Inverse of the cube root of the number of values :",y)

    var mean = 0;
    for(let x = 0; x < values.length; x++) {
        mean += values[x];
    }
    mean /= values.length;
    console.log("2.) Average of all values in the data set:", mean)

    var meanDeviation = 0;
    
    for(let x = 0; x < values.length; x++) {
        meanDeviation += Math.pow((values[x] - mean), 2);
    }

    meanDeviation = Math.sqrt(meanDeviation /= values.length);
    console.log("3.) Mean deviation from the mean value of the dataset:", meanDeviation);
    var binSize = (meanDeviation * y * 3.49);
    console.log("4.) Find the square root of the mean deviation of the data\nand multiply by 3.49 to ge the bin size:", binSize)

    var bins = [[],[]] //Initalize an empty 2D array; the inner arrays will hold the values that fit into each bin and the objects that go into each bin, respectively
    bins[0].x0 = Math.min(...values);
    bins[0].x1 = Math.max(...values);
    bins[1].x0 = Math.min(...values);
    bins[1].x1 = Math.max(...values);
    let count = 0
    for(let x = Math.min(...values); x <= Math.max(...values); x += binSize) { // iterates by binSize
        let newarr = []
        let newobjarr = []
        
        for(let y = 0; y < values.length; y += 1) {
            if(values[y] >= x && values[y] < x + binSize) {
                newarr.push(values[y]);
                newobjarr.push(objects[y]);
                
            }
        }
        bins[0].push(newarr);
        bins[1].push(newobjarr);
        bins[0][count].x0 = x.toFixed(2);
        bins[0][count].x1 = (x + binSize).toFixed(2);
        bins[1][count].x0 = x.toFixed(2);
        bins[1][count].x1 = (x + binSize).toFixed(2);

        count++;
    }
    console.log(bins)
    return bins;
}