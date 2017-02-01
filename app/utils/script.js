function findElem(arr, id) {
    let index = 0;

    arr.forEach((elem, i) => {
        if (elem.id + "" === id) {index = i};
    });

    return index;
}

function addBr(str) {
    const withBr = JSON.stringify(str).replace(/\\n/gi, "<br>");
    return JSON.parse(withBr);
}  

function addNewLine(str) {
    str = ("" + str).replace(/<br>/gi, "\n");
    const withOutBr = JSON.stringify(str)
    // console.log(withOutBr)
    return JSON.parse(withOutBr);
}  

function genId() {
    return Math.random().toString(32).slice(2);
}