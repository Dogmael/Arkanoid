(()=>{"use strict";const t=JSON.parse('{"lv1":{"levelNumber":1,"ballSpeed":300,"paddleWidthRation":0.2,"paddleHeightRation":0.04,"map":[[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[2,2,2,2,2,2,2,2,2],[1,1,1,1,1,1,1,1,1]]},"lv2":{"levelNumber":2,"ballSpeed":300,"paddleWidthRation":0.2,"paddleHeightRation":0.04,"map":[[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,1,1,1,0,0,0],[0,0,0,1,2,1,0,0,0],[0,0,0,1,1,1,0,0,0]]}}'),s=JSON.parse('{"1":{"color":"#EBDC30ff","hardness":1,"points":1},"2":{"color":"#FB6FF9ff","hardness":2,"points":2}}');class i{constructor({levelNumber:t,ballSpeed:s,paddleWidthRation:i,paddleHeightRation:a,map:e}){this.levelNumber=t,this.ballSpeed=s,this.paddleWidthRation=i,this.paddleHeightRation=a,this.map=e}}class a{constructor(t,s,i,a,e){this.radius=t,this.x=s,this.y=i,this.dx=a,this.dy=e,this.color="#12AAFEff",this.ballImg=new Image,this.ballImg.src="./assets/images/ball.png",this.plankImpactSound=new Audio("./assets/sonds/plankImpact.wav"),this.blockImpactSound=new Audio("./assets/sonds/blockImpact.wav"),this.plankImpactSound.load(),this.blockImpactSound.load()}draw(t){t.drawImage(this.ballImg,this.x-this.radius,this.y-this.radius,2*this.radius,2*this.radius),t.shadowColor="rgba(0, 0, 0, 0.5)",t.shadowBlur=10,t.shadowOffsetX=-this.dx/30,t.shadowOffsetY=-this.dy/30,t.fill(),t.shadowColor="transparent"}playPlankImpactSound(){this.plankImpactSound.play(),this.plankImpactSound.currentTime=0}playBlockImpactSound(){this.blockImpactSound.play(),this.blockImpactSound.currentTime=0}}class e{constructor(t,s,i,a){this.width=t,this.height=s,this.x=i,this.y=a,this.vx=0,this.moving=!1,this.color="black",this.plankImg=new Image,this.plankImg.src="./assets/images/plank.png",this.plankImg.onload=()=>{this.plankLoaded=!0}}draw(t,s){t.drawImage(this.plankImg,this.x,this.y,this.width,this.height)}move(t,s,i){var a,e,h;this.x=(a=this.x+t*this.vx*.9,e=i-10,h=s-this.width-i+10,Math.min(Math.max(a,e),h))}startMotion(t){this.moving=!0,this.vx="right"===t?1:-1}stopMotion(){this.moving=!1,this.vx=0}}class h{constructor(t,s,i,a,e,h,l){this.x=t,this.y=s,this.width=i,this.height=a,this.color=e,this.hardness=h,this.point=l}draw(t){t.beginPath(),t.fillStyle="black",t.rect(this.x,this.y,this.width,this.height),t.fill(),t.beginPath(),t.fillStyle=this.color,t.rect(this.x+2,this.y+2,this.width-4,this.height-4),t.fill()}}class l{constructor(t,i,a,e,l){this.blocks=[],this.mapTemplate=l;for(let l=0;l<this.mapTemplate.length;l++){const n=(t-2*a)/this.mapTemplate[l].length,d=(i-e)/20;for(let t=0;t<this.mapTemplate[l].length;t++)if(0!==this.mapTemplate[l][t]){const i=s[this.mapTemplate[l][t]];this.blocks.push(new h(a+t*n,e+l*d,n,d,i.color,i.hardness,i.points))}}}draw(t){for(const s of this.blocks)s.draw(t)}}class n{constructor(t){this.canvas=t,this.ctx=t.getContext("2d"),this.ctx.imageSmoothingEnabled=!1,this.backgroundImg=new Image,this.backgroundImg.src="./assets/images/backgrounds/background4.png",this.backgroundImg.onload=()=>{this.backgroundLoaded=!0},this.gameOverSound=new Audio("./assets/sonds/gameOver.mp3"),this.gameOverSound.load(),this.winSound=new Audio("./assets/sonds/win.mp3"),this.winSound.load(),this.topMaring=37,this.sideMaring=37,this.map=null,this.plank=null,this.ball=null,this.gameEnded=!1,this.remaningLifes=3,this.resetScore(),this.initLevel(1)}initLevel(s){const a="lv"+s;this.level=new i(t[a]),this.map=new l(this.canvas.width,this.canvas.height,this.sideMaring,this.topMaring,this.level.map),this.initPlankAndBall(),this.gameInProgress=!1,this.displayLevel()}initPlankAndBall(){const t=this.canvas.width*this.level.paddleWidthRation,s=this.canvas.height*this.level.paddleHeightRation,i=this.canvas.width/2-t/2,h=this.canvas.height-50-s;this.plank=new e(t,s,i,h);const l=s/4,n=this.canvas.width/2,d=this.canvas.height-50-s-l;this.ball=new a(l,n,d,0,0)}start(){this.gameInProgress||(this.ball.dx=5*Math.random(),this.ball.dy=-Math.sqrt(this.level.ballSpeed-this.ball.dx**2),this.gameInProgress=!0)}displayScore(){document.getElementById("scoreValue").textContent=this.score}displayLevel(){document.getElementById("levelValue").textContent=this.level.levelNumber}resetScore(){this.score=0,document.getElementById("scoreValue").textContent=this.score}newLife(){this.remaningLifes-=1,this.gameInProgress=!1,this.initPlankAndBall()}drawLifes(){let t=this.sideMaring;const s=this.canvas.height-30;for(let i=0;i<this.remaningLifes;i++)this.ctx.drawImage(this.plank.plankImg,t,s,100,30),t+=100}displayEndGame(t){this.ctx.font="58px MyWebFont",this.ctx.textAlign="center",this.ctx.fillStyle="black",this.ctx.fillText(t,this.canvas.width/2,this.canvas.height/2)}render(){if(!this.gameEnded){if(0===this.map.blocks.length){if(this.level.levelNumber++,void 0===t["lv"+this.level.levelNumber])return this.gameEnded=!0,this.displayEndGame("YOU WIN"),void this.winSound.play();this.initLevel(this.level.levelNumber)}this.ball.y+this.ball.radius<=this.plank.y?(this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height),this.backgroundLoaded&&this.ctx.drawImage(this.backgroundImg,0,0,this.canvas.width,this.canvas.height),this.motion(this.map,this.plank),this.map.draw(this.ctx),this.ball.draw(this.ctx),this.plank.draw(this.ctx,this.canvas.height),this.drawLifes()):this.remaningLifes>0?this.newLife():(this.gameEnded=!0,this.displayEndGame("GAME OVER"),this.gameOverSound.play())}}motion(){this.ball.y+this.ball.dy-this.ball.radius-this.topMaring<0&&(this.ball.dy=-this.ball.dy);for(let t=0;t<this.map.blocks.length;t++){const s=!1;if(this.collision(this.map.blocks[t],this.ball)){s||(this.ball.dy=-this.ball.dy),this.score+=this.map.blocks[t].point,this.map.blocks.splice(t,1),this.ball.playBlockImpactSound();break}}this.collision(this.plank,this.ball)&&this.ball.dy>0&&(this.ball.dy=-this.ball.dy,this.ball.dx=.06*(this.ball.x-(this.plank.x+this.plank.width/2)),this.ball.playPlankImpactSound()),(this.ball.x+this.ball.dx+this.ball.radius+this.sideMaring>this.canvas.width||this.ball.x+this.ball.dx-this.ball.radius-this.sideMaring<0)&&(this.ball.dx=-this.ball.dx),this.ball.x+=this.ball.dx,this.ball.y+=this.ball.dy}collision(t,s){const i=Math.abs(t.x+t.width/2-s.x),a=Math.abs(t.y+t.height/2-s.y);return i<=s.radius+t.width/2&&a<=s.radius+t.height/2}updatePlank(t){if(this.plank.moving){this.lastTimestamp||(this.lastTimestamp=t);const s=t-this.lastTimestamp;this.plank.move(s,this.canvas.width,this.sideMaring),this.gameInProgress||(this.ball.x=this.plank.x+this.plank.width/2),this.lastTimestamp=t,requestAnimationFrame(this.updatePlank.bind(this))}else this.lastTimestamp=null}handleKeyDown(t){"ArrowRight"!==t.key&&"ArrowLeft"!==t.key||(this.plank.startMotion("ArrowRight"===t.key?"right":"left"),requestAnimationFrame(this.updatePlank.bind(this))),"ArrowUp"===t.key&&this.start()}handleKeyUp(t){"ArrowRight"!==t.key&&"ArrowLeft"!==t.key||this.plank.stopMotion()}}document.addEventListener("DOMContentLoaded",(()=>{const t=document.getElementById("arkanoid"),s=new n(t);setInterval(s.render.bind(s),1e3/60),setInterval((()=>{s.gameInProgress&&s.displayScore()}),1e3/30),addEventListener("keydown",s.handleKeyDown.bind(s)),addEventListener("keyup",s.handleKeyUp.bind(s))}))})();