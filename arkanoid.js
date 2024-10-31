(()=>{"use strict";const t=JSON.parse('{"lv1":{"ballSpeed":300,"paddleWidthRation":0.2,"paddleHeightRation":0.02,"map":[[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1]]}}');class i{constructor({levelNumber:t,ballSpeed:i,paddleWidthRation:s,paddleHeightRation:h,map:a}){this.levelNumber=t,this.ballSpeed=i,this.paddleWidthRation=s,this.paddleHeightRation=h,this.map=a}}class s{constructor(t,i,s,h,a){this.radius=t,this.x=i,this.y=s,this.dx=h,this.dy=a}draw(t){t.beginPath(),t.arc(this.x,this.y,this.radius,0,2*Math.PI,!0),t.fillStyle="black",t.fill(),t.shadowColor="rgba(0, 0, 0, 0.5)",t.shadowBlur=10,t.shadowOffsetX=-this.dx/30,t.shadowOffsetY=-this.dy/30,t.fill(),t.shadowColor="transparent"}}class h{constructor(t,i,s,h){this.width=t,this.height=i,this.x=s,this.y=h,this.vx=0,this.moving=!1}draw(t,i){t.fillRect(this.x,i-this.height,this.width,this.height)}move(t,i){var s,h,a;this.x=(s=this.x+t*this.vx*.9,h=0,a=i-this.width,Math.min(Math.max(s,h),a))}startMotion(t){this.moving=!0,this.vx="right"===t?1:-1}stopMotion(){this.moving=!1,this.vx=0}getX(){return this.x}getY(){return this.y}getWidth(){return this.width}getHeight(){return this.height}isMoving(){return this.moving}}class a{constructor(t,i,s,h){this.x=t,this.y=i,this.width=s,this.height=h}draw(t){t.strokeRect(this.x,this.y,this.width,this.height)}}class l{constructor(t,i,s){this.blocks=[],this.mapTemplate=s;for(let s=0;s<this.mapTemplate.length;s++){const h=t/this.mapTemplate[s].length,l=Math.round(i/20);for(let t=0;t<this.mapTemplate[s].length;t++)1===this.mapTemplate[s][t]&&this.blocks.push(new a(t*h,s*l,h,l))}}draw(t){for(const i of this.blocks)i.draw(t)}}class e{constructor(t){this.canvas=t,this.ctx=t.getContext("2d"),this.map=null,this.plank=null,this.ball=null,this.level={levelNumber:0},this.initGame()}initGame(){this.initNextLevel(this.level.levelNumber),this.map=new l(this.canvas.width,this.canvas.height,this.level.map);const t=this.canvas.width*this.level.paddleWidthRation,i=this.canvas.height*this.level.paddleHeightRation,a=this.canvas.width/2-t/2,e=this.canvas.height-i;this.plank=new h(t,i,a,e);const n=i,d=this.canvas.width/2,r=this.canvas.height-i-n;this.ball=new s(n,d,r,0,0),this.gameInProgress=!1}initNextLevel(s){const h="lv"+(s+1);this.level=new i(t[h])}start(){this.gameInProgress||(this.ball.dx=3*Math.random(),this.ball.dy=-Math.sqrt(this.level.ballSpeed-this.ball.dx**2),this.gameInProgress=!0)}render(){this.ball.y+this.ball.radius<=this.plank.y?(this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height),this.motion(this.map,this.plank),this.map.draw(this.ctx),this.ball.draw(this.ctx),this.plank.draw(this.ctx,this.canvas.height)):this.gameInProgress=!1}motion(){this.ball.y+this.ball.dy-this.ball.radius<0&&(this.ball.dy=-this.ball.dy);for(let t=0;t<this.map.blocks.length;t++){const i=!1;this.collision(this.map.blocks[t],this.ball)&&(i||(this.ball.dy=-this.ball.dy),this.map.blocks.splice(t,1))}this.collision(this.plank,this.ball)&&this.ball.dy>0&&(this.ball.dy=-this.ball.dy,this.ball.dx=.04*(this.ball.x-(this.plank.x+this.plank.width/2))),(this.ball.x+this.ball.dx+this.ball.radius>this.canvas.width||this.ball.x+this.ball.dx-this.ball.radius<0)&&(this.ball.dx=-this.ball.dx),this.ball.x+=this.ball.dx,this.ball.y+=this.ball.dy}collision(t,i){const s=Math.abs(t.x+t.width/2-i.x),h=Math.abs(t.y+t.height/2-i.y);return s<=i.radius+t.width/2&&h<=i.radius+t.height/2}updatePlank(t){if(this.plank.isMoving()){this.lastTimestamp||(this.lastTimestamp=t);const i=t-this.lastTimestamp;this.plank.move(i,this.canvas.width),this.gameInProgress||(this.ball.x=this.plank.x+this.plank.width/2),this.lastTimestamp=t,requestAnimationFrame(this.updatePlank.bind(this))}else this.lastTimestamp=null}handleKeyDown(t){"ArrowRight"!==t.key&&"ArrowLeft"!==t.key||(this.plank.startMotion("ArrowRight"===t.key?"right":"left"),requestAnimationFrame(this.updatePlank.bind(this))),"ArrowUp"===t.key&&this.start()}handleKeyUp(t){"ArrowRight"!==t.key&&"ArrowLeft"!==t.key||this.plank.stopMotion()}}document.addEventListener("DOMContentLoaded",(()=>{const t=document.getElementById("arkanoid"),i=new e(t);setInterval(i.render.bind(i),1e3/60),addEventListener("keydown",i.handleKeyDown.bind(i)),addEventListener("keyup",i.handleKeyUp.bind(i))}))})();