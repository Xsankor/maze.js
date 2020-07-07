let canvas;
let context;
let x = 0;
let y = 0;
let timer;
let dx = 0;
let dy = 0;
let reward = document.querySelector('iframe');

window.onload = function(){
 canvas = document.querySelector('#canvas');
 context = canvas.getContext('2d');
  
 window.addEventListener('keydown', pressKey);
  
 drawMaze('img/maze2.png', 230, 1);
}

function drawMaze(mazeFile, startX, startY){
  clearTimeout(timer);
  
  let imgMaze = new Image();
  imgMaze.onload = function(){
    canvas.width = imgMaze.width;
    canvas.height = imgMaze.height;
    context.drawImage(imgMaze, 0, 0);
    
    x = startX;
    y = startY;


    context.beginPath();
    context.fillStyle = 'rgb(255, 0, 0)';
    context.rect(x, y, 2, 2);
    context.fill();
    context.closePath();
    
    //let imgFace = document.querySelector('#face');
    //context.drawImage(imgFace, x, y);
    
    timer = setTimeout(drawMaze, 10);
  };
  imgMaze.src = mazeFile; 
}

 function pressKey(event){
     dx = 0;
     dy = 0;

     context.beginPath();
     context.fillStyle = 'rgb(255, 0, 0)';
     context.rect(x, y, 2, 2);
     context.fill();
     context.closePath();

    if( event.keyCode == 38 ) dy = -3;
    if( event.keyCode == 40 ) dy = 3;
    if( event.keyCode == 37 ) dx = -3;
    if( event.keyCode == 39 ) dx = 3;

    redraw();
  }

function redraw(){
 if(dx != 0 || dy != 0){
   x += dx;
   y += dy;

   if(checkCollision()){
       x -= dx;
       y -= dy;
       dx = 0;
       dy = 0;
   }

 }
 console.log(y , x);
 if (y >= 490 && x >= 260) {
        canvas.style.display = 'none';
        reward.style.display = 'block';
        dy = -3;
    }

}

function checkCollision(){
    let imgData = context.getImageData(x - 1, y - 1, 3, 3);
    let pixels = imgData.data;

    for(let i = 0, n = pixels.length;  i < n; i += 1){
        let red = pixels[i];
        let blue = pixels[i + 1];
        let green = pixels[i + 2];

        if( red == 0 && blue == 0 && green == 0){
            return true;
        }
        if( red == 169 && blue == 169 && green == 169 ){
            return true;
        }
    }
    return false;
}
