function animate2 () {
    ctx2.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  
    const characterData = spriteData[currentCharacter2];
    let frames = characterData.frames[playerMove2];
    const spriteWidth = characterData.spriteWidth;
    const spriteHeight = characterData.spriteHeight;
    const dx = characterData.dx;
    const dy = characterData.dy;
    const dWidth = characterData.dWidth;
    const dHeight = characterData.dHeight;

    let img =
      typeof characterData.src === "string"
        ? loadedImages[currentCharacter2]
        : loadedImages[currentCharacter2][playerMove2];
    let frameX, frameY;

    if (playerMove2 === "attack1" || playerMove2 === "attack2" || playerMove2 === "hurt") {
      const elapsed = gameFrame - attackFrame;
      let frameIndex = Math.floor(elapsed / staggerFrames);
      if (frameIndex >= frames.length) {
        playerMove2 = "idle"; // Optional, can reset frameIndex to 0 or let the idle animation loop naturally.
        frames = characterData.frames["idle"];
        img = // If your idle animation uses a different image source
          typeof characterData.src === "string"
            ? loadedImages[currentCharacter2]
            : loadedImages[currentCharacter2]["idle"];
        frameIndex = Math.floor(gameFrame / staggerFrames) % frames.length; // Recalculate the frame using the idle animation logic
        }
        frameX = frames[frameIndex].x;
        frameY = frames[frameIndex].y;
    } else {
        const position = Math.floor(gameFrame / staggerFrames) % frames.length;
        frameX = frames[position].x;
        frameY = frames[position].y;
    }
    ctx2.drawImage(img, frameX, frameY, spriteWidth, spriteHeight, dx, dy, dWidth, dHeight);
    gameFrame++;
    requestAnimationFrame(animate2);
};