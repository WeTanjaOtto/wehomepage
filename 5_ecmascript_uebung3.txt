class Vorrang {
    constructor(data) {
        this.data = this.topsortUtil(data);
    }
    getData() {
        return this.data;
    }
    * [Symbol.iterator]() {
        const data = this.data;
        for(const element of data){
            yield element;
        }
    }
    topsortUtil(data, resArray = [], count = 0){
        for(var row = 0; data.length > row; ++row){
            for(var col = 0; data[row].length > col; ++col){  
                if(this.getPredecessors(data[row][col], data) === 0 && !resArray.includes(data[row][col])){
                    resArray.push(data[row][col]);
                }
            }
        }
        if(count-1 === data.length){
            let result = resArray;
            return result;
        }
        data = (this.deleteNode(resArray[count-1], data)).slice();
        
        return this.topsortUtil(data, resArray, ++count);
    }
    deleteNode(node, data){
        var res = [];
        for(var row = 0; data.length > row; ++row){
            let arr = [];
            for(var col = 0; data[row].length > col; ++col){
                if(data[row][col] !== node){
                    arr.push(data[row][col]);
                }
            }
            res.push(arr);
        }
        return res;
    }
    getPredecessors(node, data){
        var descedantCounter = 0;
        for(var row=0; data.length > row; ++row){
            if(data[row][1] === node){
                ++descedantCounter;
            }
        }
        return descedantCounter;
    }
}
var v1 = new Vorrang([["studieren", "prüfen"], ["schlafen", "studieren"], ["essen", "studieren"], ["prüfen", "gehen"], ["gehen", "stehen"], ["essen", "schlafen"], ["sitzen", "gehen"] ]);
var v2 = new Vorrang([[5,4], [5,3], [4,3], [3,2], [2, 0], [0, 1]])
var actualData1 = v1.getData();
var actualData2 = v2.getData();
var expectedData1 = ["essen", "sitzen", "schlafen", "studieren", "prüfen", "gehen", "stehen"];
var expectedData2 = [5, 4, 3, 2, 0, 1];
var counter1 = 0;
for(const elem of v1){
    console.log(elem);
    console.assert(elem === expectedData1[counter1++], {actual: elem, expected: expectedData1[counter1]})
}
var counter2 = 0;
for(const elem of v2){
    console.log(elem);
    console.assert(elem === expectedData2[counter2++], {actual: elem, expected: expectedData2[counter2]})
}