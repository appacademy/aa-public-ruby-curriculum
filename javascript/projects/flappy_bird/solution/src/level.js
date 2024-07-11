const CONSTANTS = {
  PIPE_SPEED: 2,
  GAP_HEIGHT: 150,
  PIPE_WIDTH: 50,
  EDGE_BUFFER: 50,
  PIPE_SPACING: 220,
  WARM_UP_SECONDS: 1
};

export default class Level {
  constructor(dimensions) {
    this.dimensions = dimensions;
    
    const firstPipeDistance = 
      this.dimensions.width + 
      (CONSTANTS.WARM_UP_SECONDS * 60 * CONSTANTS.PIPE_SPEED);

    this.pipes = [
      this.randomPipe(firstPipeDistance),
      this.randomPipe(firstPipeDistance + CONSTANTS.PIPE_SPACING),
      this.randomPipe(firstPipeDistance + (CONSTANTS.PIPE_SPACING * 2)),
    ];
  }

  randomPipe(x) {
    const heightRange = this.dimensions.height - (2 * CONSTANTS.EDGE_BUFFER) - CONSTANTS.GAP_HEIGHT;
    const gapTop = (Math.random() * heightRange) + CONSTANTS.EDGE_BUFFER;
    const pipe = {
      topPipe: {
        left: x, 
        right: CONSTANTS.PIPE_WIDTH + x, 
        top: 0, 
        bottom: gapTop
      },
      bottomPipe: {
        left: x, 
        right: CONSTANTS.PIPE_WIDTH + x, 
        top: gapTop + CONSTANTS.GAP_HEIGHT, 
        bottom: this.dimensions.height
      },
      passed: false
    };
    return pipe
  }

  animate(ctx) {
    this.drawBackground(ctx);
    this.movePipes();
    this.drawPipes(ctx);
  }

  drawBackground(ctx) {
    ctx.fillStyle = "skyblue";
    ctx.fillRect(0, 0, this.dimensions.width, this.dimensions.height);
  }

  passedPipe(bird, callback) {
    this.eachPipe((pipe) => {
      if (pipe.topPipe.right < bird.left) {
        if (!pipe.passed) {
          pipe.passed = true;
          callback();
        }
      }
    });
  }

  movePipes() {
    this.eachPipe(function(pipe) {
      pipe.topPipe.left -= CONSTANTS.PIPE_SPEED;
      pipe.topPipe.right -= CONSTANTS.PIPE_SPEED;
      pipe.bottomPipe.left -= CONSTANTS.PIPE_SPEED;
      pipe.bottomPipe.right -= CONSTANTS.PIPE_SPEED;
    });

    //if a pipe has left the screen add a new one to the end
    if (this.pipes[0].topPipe.right <= 0) {
      this.pipes.shift();
      const newX = this.pipes[1].topPipe.left + CONSTANTS.PIPE_SPACING;
      this.pipes.push(this.randomPipe(newX));
    }
  }

  drawPipes(ctx) {
    this.eachPipe(function(pipe) {
      ctx.fillStyle = "green";

      //draw top pipe
      ctx.fillRect(
        pipe.topPipe.left, 
        pipe.topPipe.top, 
        CONSTANTS.PIPE_WIDTH, 
        pipe.topPipe.bottom - pipe.topPipe.top
      );
      //draw bottom pipe
      ctx.fillRect(
        pipe.bottomPipe.left, 
        pipe.bottomPipe.top, 
        CONSTANTS.PIPE_WIDTH, 
        pipe.bottomPipe.bottom - pipe.bottomPipe.top
      );
    });
  }

  eachPipe(callback) {
    this.pipes.forEach(callback.bind(this));
  }
  //This method shall return true if the bird passed in is currently
  //colliding with any pipe.
  collidesWith(bird) {
      //this function returns true if the the rectangles overlap
    const _overlap = (rect1, rect2) => {
      //check that they don't overlap in the x axis
      if (rect1.left > rect2.right || rect1.right < rect2.left) {
        return false;
      }
      //check that they don't overlap in the y axis
      if (rect1.top > rect2.bottom || rect1.bottom < rect2.top) {
        return false;
      }
      return true;
    };
    let collision = false;
    this.eachPipe((pipe) => {
      if ( 
        //check if the bird is overlapping (colliding) with either pipe
        _overlap(pipe.topPipe, bird) || 
        _overlap(pipe.bottomPipe, bird)
      ) { collision = true; }
    });
    return collision;
  }
}
