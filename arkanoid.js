(()=>{"use strict";class t{constructor(t,s,i,h,a){this.radius=t,this.x=s,this.y=i,this.dx=h,this.dy=a}draw(t){console.log("ball x, y",this.x,this.y),t.beginPath(),t.arc(this.x,this.y,this.radius,0,2*Math.PI,!0),t.fillStyle="black",t.fill(),t.shadowColor="rgba(0, 0, 0, 0.5)",t.shadowBlur=10,t.shadowOffsetX=-this.dx/30,t.shadowOffsetY=-this.dy/30,t.fill(),t.shadowColor="transparent"}}class s{constructor(t,s,i,h){this.width=t,this.height=s,this.x=i,this.y=h,this.vx=0,this.moving=!1}draw(t,s){t.fillRect(this.x,s-this.height,this.width,this.height)}move(t,s){var i,h,a;this.x=(i=this.x+t*this.vx*.9,h=0,a=s-this.width,Math.min(Math.max(i,h),a))}startMotion(t){this.moving=!0,this.vx="right"===t?1:-1}stopMotion(){this.moving=!1,this.vx=0}getX(){return this.x}getY(){return this.y}getWidth(){return this.width}getHeight(){return this.height}isMoving(){return this.moving}}class i{constructor(t,s,i,h){this.x=t,this.y=s,this.width=i,this.height=h}draw(t){t.strokeRect(this.x,this.y,this.width,this.height)}}class h{constructor(t,s){this.blocks=[],this.map=[[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1]];for(let h=0;h<this.map.length;h++){const a=t/this.map[h].length,l=Math.round(s/20);for(let t=0;t<this.map[h].length;t++)1===this.map[h][t]&&this.blocks.push(new i(t*a,h*l,a,l))}}draw(t){for(const s of this.blocks)s.draw(t)}}class a{constructor(i){this.canvas=i,this.ctx=i.getContext("2d"),this.map=new h(i.width,i.height);const a=i.width/5,l=i.height/50,e=i.width/2-a/2,n=i.height-l;this.plank=new s(a,l,e,n);const r=l,o=i.width/2,d=i.height-l-r;this.ball=new t(r,o,d,0,0),this.gameInProgress=!1}start(){this.gameInProgress||(this.ball.dx=3*Math.random(),this.ball.dy=-Math.sqrt(300-this.ball.dx**2),this.gameInProgress=!0)}render(){this.ball.y+this.ball.radius<=this.plank.y?(this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height),this.motion(this.map,this.plank),this.map.draw(this.ctx),this.ball.draw(this.ctx),this.plank.draw(this.ctx,this.canvas.height)):this.gameInProgress=!1}motion(){this.ball.y+this.ball.dy-this.ball.radius<0&&(this.ball.dy=-this.ball.dy);for(let t=0;t<this.map.blocks.length;t++){const s=!1;this.collision(this.map.blocks[t],this.ball)&&(s||(this.ball.dy=-this.ball.dy),this.map.blocks.splice(t,1))}this.collision(this.plank,this.ball)&&this.ball.dy>0&&(this.ball.dy=-this.ball.dy,this.ball.dx=.04*(this.ball.x-(this.plank.x+this.plank.width/2))),(this.ball.x+this.ball.dx+this.ball.radius>this.canvas.width||this.ball.x+this.ball.dx-this.ball.radius<0)&&(this.ball.dx=-this.ball.dx),this.ball.x+=this.ball.dx,this.ball.y+=this.ball.dy}collision(t,s){const i=Math.abs(t.x+t.width/2-s.x),h=Math.abs(t.y+t.height/2-s.y);return i<=s.radius+t.width/2&&h<=s.radius+t.height/2}updatePlank(t){if(this.plank.isMoving()){this.lastTimestamp||(this.lastTimestamp=t);const s=t-this.lastTimestamp;this.plank.move(s,this.canvas.width),this.gameInProgress||(this.ball.x=this.plank.x+this.plank.width/2),this.lastTimestamp=t,requestAnimationFrame(this.updatePlank.bind(this))}else this.lastTimestamp=null}handleKeyDown(t){"ArrowRight"!==t.key&&"ArrowLeft"!==t.key||(this.plank.startMotion("ArrowRight"===t.key?"right":"left"),requestAnimationFrame(this.updatePlank.bind(this))),"ArrowUp"===t.key&&this.start()}handleKeyUp(t){"ArrowRight"!==t.key&&"ArrowLeft"!==t.key||this.plank.stopMotion()}}document.addEventListener("DOMContentLoaded",(()=>{const t=document.getElementById("arkanoid"),s=new a(t);setInterval(s.render.bind(s),1e3/60),addEventListener("keydown",s.handleKeyDown.bind(s)),addEventListener("keyup",s.handleKeyUp.bind(s))}))})();