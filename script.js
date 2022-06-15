Number.prototype.countDecimals = function () {
    if(Math.floor(this.valueOf()) === this.valueOf()) return 0;
    return this.toString().split(".")[1].length || 0; 
}

const add = function(a,b) {
	return a + b;
};

const subtract = function(a,b) {
	return a - b;
};

const multiply = function(a,b) {
    return a*b;
};

const divide = function(a,b) {
    return a/b;
}

function concat(e, screen) {
    let res;
    screen = document.querySelector(".screen");
    if (screen.textContent == "0") {
        res = "";
    } else {
        res = screen.textContent;
    }
    res += e.target.textContent;
    screen.textContent = res;
}

num = document.querySelectorAll("#dot,.num");
num.forEach(n => n.addEventListener("click",concat));


back = document.querySelector("#back");
back.addEventListener("click", del);
function del(screen) {
    let res;
    screen = document.querySelector(".screen");
    if (screen.textContent == "0") {

    } else if (screen.textContent.length == 1) {
        screen.textContent = "0";
    } else {
        res = screen.textContent
        screen.textContent = res.slice(0,res.length-1);
    }
}

const calculate = function(str) {
    res = str;
    str = str.toHtmlEntities().split(" ");
    str[1] === "&#43;" ? res = add(Number(str[0]),Number(str[2])) :
    str[1] === "&#8722;" ? res = subtract(Number(str[0]),Number(str[2])) :
    str[1] === "&#215;" ? res = multiply(Number(str[0]),Number(str[2])) :
    str[1] === "&#247;" ? res = divide(Number(str[0]),Number(str[2])) :
    res = res;
    if (isNaN(res)) {
        res = "ERR"
    } else if (res.countDecimals() > 5) {
        res = res.toFixed(5);
    }
    return res;
}

String.prototype.toHtmlEntities = function() {
    return this.replace(/./gm, function(s) {
        return (s.match(/[a-z0-9.-\s]+/i)) ? s : "&#" + s.charCodeAt(0) + ";";
    });
};

sym = document.querySelectorAll(".sym");
sym.forEach(s => s.addEventListener("click",eval));
function eval(e) {
    screen = document.querySelector(".screen");
    symArr = ["&#43;","&#8722;","&#215;","&#247;"]
    screenArr = screen.textContent.toHtmlEntities().split(" ");
    s = symArr.filter(e => screenArr.includes(e))
    if (s.length != 0) {
        if (screenArr.length-1 === screenArr.indexOf(s)) {
            screenArr.pop();
            screenArr.push(e.target.textContent);
            screen.textContent = screenArr.join("");
        } else {
            res = calculate(screen.textContent);
            screen.textContent = res;
            concat(e, screen);
        }    
    } else {
        concat(e, screen);
    }
        
}

cal = document.querySelector("#cal");
cal.addEventListener("click",equals);
function equals(e) {
    screen = document.querySelector(".screen");
    screen.textContent = calculate(screen.textContent);
}

ac = document.querySelector("#ac");
ac.addEventListener("click",clear);
function clear(e) {
    document.querySelector(".screen").textContent = 0;
}

neg = document.querySelector("#neg");
neg.addEventListener("click",negative);
function negative(e) {
    screen = document.querySelector(".screen");
    strArr = screen.textContent.split(" ");
    if (strArr[strArr.length-1] == 0) {
        strArr[strArr.length-1] = "-"
    } else if (strArr[strArr.length-1].includes("-")) {
        strArr[strArr.length-1] = strArr[strArr.length-1].toString().substr(1);
    } else {
        strArr[strArr.length-1] = "-" + strArr[strArr.length-1];
        
    }
    res = strArr.join(" ");
    screen.textContent = res;
    
}