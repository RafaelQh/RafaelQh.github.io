const canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("canvas")),
toolsBtns= document.querySelectorAll(".tool"),
fillColor= document.getElementById("fill-color"),
sizeSlider=document.getElementById("size-slider"),
colorBtns=document.querySelectorAll(".colors .option"),
colorPicker=document.getElementById("color-picker"),
clearCanvas= document.querySelector(".clear-canvas"),
saveImg = document.querySelector(".save-img"),
ctx= canvas.getContext("2d");

let prevMouseX, prevMouseY,snapshot,
isDrawing = false,
selectedTool="brush",
brushWidth=5,
selectedColor="#000";

function setCanvasBackground(){
    ctx.fillStyle = "#fff";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = selectedColor;
}

window.addEventListener("load",function(){
    canvas.height=canvas.offsetHeight;
    canvas.width=canvas.offsetWidth;
    setCanvasBackground();
})

function drawRectangle(e){
    if(!fillColor.checked){
        return ctx.strokeRect(e.offsetX,e.offsetY,prevMouseX-e.offsetX,prevMouseY -e.offsetY);
    }
    ctx.fillRect(e.offsetX,e.offsetY,prevMouseX-e.offsetX,prevMouseY -e.offsetY);
}

function drawCircle(e){
    ctx.beginPath();
    let radius =Math.sqrt(Math.pow((prevMouseX - e.offsetX),2)
    +Math.pow((prevMouseY - e.offsetY),2));
    ctx.arc(prevMouseX,prevMouseY,radius,0,2*Math.PI);
    if(!fillColor.checked){
        ctx.stroke();
    }
    else{
        ctx.fill();
    }
}

/*function drawLine(e){
    ctx.beginPath();
    ctx.moveTo(prevMouseX,prevMouseY);
    ctx.lineTo(e.offsetX,e.offsetY);
    ctx.stroke();
}*/

function drawTriangle(e){
    ctx.beginPath();
    ctx.moveTo(prevMouseX,prevMouseY);
    ctx.lineTo(e.offsetX,e.offsetY);
    ctx.lineTo(prevMouseX*2-e.offsetX, e.offsetY);
    ctx.closePath();
    if(!fillColor.checked){
        ctx.stroke();
    }
    else{
        ctx.fill();
    }
}

function startDraw(e){
    isDrawing = true;
    prevMouseX = e.offsetX;
    prevMouseY = e.offsetY;
    ctx.beginPath();
    ctx.lineWidth=brushWidth;
    ctx.strokeStyle = selectedColor;
    ctx.fillStyle = selectedColor;
    snapshot=ctx.getImageData(0,0,canvas.width,canvas.height);
}

function drawing(e){
    if(isDrawing===false) return;
    ctx.putImageData(snapshot,0,0);
    if(selectedTool==="brush" || selectedTool==="eraser"){
    ctx.strokeStyle = selectedTool === "eraser" ? "#fff" : selectedColor;
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();           
} else if(selectedTool ==="rectangle"){
    drawRectangle(e);
} else if(selectedTool ==="circle"){
    drawCircle(e);
} else if(selectedTool ==="triangle"){
    drawTriangle(e);
}

    
}

toolsBtns.forEach(function(btn){
    btn.addEventListener("click",function(){
        document.querySelector(".options .active").classList.remove("active");
        btn.classList.add("active");
        selectedTool=btn.id;
        console.log(selectedTool);
    })
});

sizeSlider.addEventListener("change",function(){brushWidth=sizeSlider.value});

colorBtns.forEach(function(btn){
    btn.addEventListener("click", function(){
        document.querySelector(".options .selected").classList.remove("selected");
        btn.classList.add("selected");
        selectedColor = window.getComputedStyle(btn).getPropertyValue("background-color");
    })

})

colorPicker.addEventListener("change",function(){
    colorPicker.parentElement.style.background= colorPicker.value;
    colorPicker.parentElement.click();
});

clearCanvas.addEventListener("click",function(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    setCanvasBackground();
});

saveImg.addEventListener("click",function(){
    const link=document.createElement("a");
    link.download=`${Date.now()}.jpg`;
    link.href= canvas.toDataURL();
    link.click();
});
canvas.addEventListener("mousedown",startDraw);
canvas.addEventListener("mousemove",drawing);
canvas.addEventListener("mouseup",function(){isDrawing=false});