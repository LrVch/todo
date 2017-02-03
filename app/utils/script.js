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

function placeCaretAtEnd(el) {
    el.focus();
    if (typeof window.getSelection != "undefined"
            && typeof document.createRange != "undefined") {
        var range = document.createRange();
        range.selectNodeContents(el);
        range.collapse(false);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    } else if (typeof document.body.createTextRange != "undefined") {
        var textRange = document.body.createTextRange();
        textRange.moveToElementText(el);
        textRange.collapse(false);
        textRange.select();
    }
}