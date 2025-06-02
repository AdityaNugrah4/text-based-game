const spriteSheet = new Image();

spriteSheet.src = './images/roguelikeitemsx3.png';

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');
const canvasWidth = canvas.width = 50;
const canvasHeight = canvas.height = 50;
const spriteWidth = 49;
const spriteHeight = 49;
spriteSheet.onload = function () {
  function animate () {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(spriteSheet, 336, 576, spriteWidth, spriteHeight, 1, 1, spriteWidth, spriteHeight)
    requestAnimationFrame(animate);
  };
  animate();
};