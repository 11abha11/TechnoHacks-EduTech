let expr = document.getElementById("expression");

let display = (num) =>{
    expr.value += num;
}

function clr(){
    expr.value = "";
}

function del(){
    expr.value = expr.value.toString().slice(0,-1);
}

let result = () => {
    try{
        expr.value = eval(expr.value);
    }
    catch(e){
        alert("Error!");
    }
}