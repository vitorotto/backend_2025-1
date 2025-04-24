const arr = [1,2,3,4,5];

function somaTudo(arr) {
    return arr.reduce((total, item) => total + item, 0)
}

console.log(somaTudo(arr))

