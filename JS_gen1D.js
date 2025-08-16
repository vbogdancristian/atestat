class Queue {//Geeksforgeeks thank you
  constructor() {
    this.items = [];
  }

  enqueue(element) {
    this.items.push(element); 
  }

  dequeue() {
    return this.isEmpty() ? "Queue is empty" : this.items.shift();
  }

  peek() {
    return this.isEmpty() ? "Queue is empty" : this.items[0];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }

  print() {
    console.log(this.items.join(" -> "));
  }
}
const queue_operations= new Queue();

const WIDTH = screen.width;
const HEIGHT = screen.height;
canvas = document.getElementById("draw");
canvas.width = WIDTH / 2;
canvas.height = HEIGHT / 2;
const ctx = canvas.getContext("2d");
let animation="manual";
let timething;
let cancelWait;
const controller = null;
let speed=1;
const timect=2000;
const aib = [];
const v = [];
const highlight_color="cyan";
const base_color="purple";
const background_color="white";
const upd = [];// la afisare voi colora cu rosu elementele vectorului nou updatate, dupa care le fac din nou negre/mov urmatoarea iteratie
let n;
let animation_flag="green";
let crtop="none";
function is_modified(state=true)
{
	if(state==true)document.getElementById("instructions").innerHTML="Data is modified!";
	if(state==false)document.getElementById("instructions").innerHTML="Everything is up to date!";
	return;
}
async function submit_speed()
{
	let old_animation=animation;//verify this work tomorrow
	animation=document.getElementById("type_animation").value;
	if(old_animation!=animation && animation_flag=="red")
	{
		animation=old_animation;
		document.getElementById("type_animation").value=old_animation;
		if(old_animation=="manual")document.getElementById("speed").style.visibility="hidden";
		else document.getElementById("speed").style.visibility="visible";
		alert("nu puteti schimba tipul de animatie cat timp are loc un proces")
		return;
	}
	if(animation=="manual")
	{
		document.getElementById("codeHbutton").style.visibility="inherit";
		return;
	}
	document.getElementById("codeHbutton").style.visibility="hidden";
	speed=document.getElementById("speed").value;
	await cancelWait();
	//await wait(timect/speed);
	return;
}
function hideColumn(pos) {
  const allRows = document.querySelectorAll(".datavector tr");
  for (const row of allRows) {
    const cells = row.children;
    if (cells.length > pos ) {/*this is so convoluted remember it's here plspls*/
      cells[pos].style.visibility = "hidden";
	  cells[pos].style.border = "none";
    }
  }
}
function showColumn(pos) {
  const allRows = document.querySelectorAll(".datavector tr");
  for (const row of allRows) {
    const cells = row.children;
    if (cells.length > pos ) {/*this is so convoluted remember it's here plspls*/
      cells[pos].style.visibility = "visible";
	  cells[pos].style.border = "1px solid var(--frame_color)";
    }
  }
}
function display_n(start=-1)
{
	/*if start is -1 hide all
	if not then find real value of n and visibility n tds
	and steal text from submit vector here (relating n of course)
	if the animation_flag is red then stop everything
	*/
	if(animation_flag=="red")return;
	if(start==-1)
	{
		n=0;
		for(let i=1;i<=32;i++)
		{
			hideColumn(i+2);
		}
		return;
	}
	let element_n=document.getElementById("n_value");
	n=converter(element_n.value);
	if(n<1 || n>32)
	{
		document.getElementById("n_value").value=0;
		let element_target=document.getElementById("n_error_feedback");
		element_target.innerHTML="* n trebuie să fie un numar natural între 1 și 32 ";
		element_target.style.display="block";
		n=0;
		return;
	}
	let element_target=document.getElementById("n_error_feedback");
	element_target.innerHTML="";
	element_target.style.display="none";
	element_n.value=n;
	for(let i=1;i<=n;i++)
	{
		showColumn(i+2);
	}
	for(let i=n+1;i<=32;i++)
	{
		hideColumn(i+2);
	}
	
	//hideColumn(7); will hide Column 5
	return n;
}
display_n();
let pos_ind = [];
let pos_r = [];
let pos_line = [];
let pos_text = [];
function draw_index(n_value)
{
	ctx.textAlign = "center";
	/*voi avea figura de pe site doar ca invartita 90grade pentru a avea indexii jos
	cu liniile mergand in sus*/
	/*spatiul dintre numere depinde de cate sunt, adica de n_value*/
	/*gandind pe vericala am decis ca spatiul util (l) sa fie 8% si cel inutil (H) 4%*/
	/*pe orizontala ma gandeam ca spatiul util (l) sa fie 55/n+1 su cel inutil (H) 45/n+2, eventual inversat. Ideea este ca suma l plus suma H sa fie 100%*/
	let yl=8*canvas.height/100;
	let yH=4*canvas.height/100;
	let xl=55*canvas.width/((n_value+1)*100);
	let xH=45*canvas.width/((n_value+2)*100);
	let s=yl+"px ";
	ctx.font=s+"Arial";
	ctx.fillStyle = base_color;
	/*ctx.fillText("v",xH,canvas.height-yH,xl);*/
	ctx.fillText("i",xH,canvas.height-yH-yl-yH,xl);
	pos_ind[0]={font_:ctx.font, ft1:xH, ft2:canvas.height-yH-yl-yH, ft3:xl, word:"i"};
	
	for(let i=1;i<=n_value;i++)
	{
		/*let stringv=String(v[i]);
		ctx.fillText(stringv,i*xl+(i+1)*xH,canvas.height-yH,xl);*/
		if(upd[i]==false)
		{
			ctx.fillStyle = base_color;
		}
		else
		{
			upd[i]=false;
			ctx.fillStyle = highlight_color;
		}
		let stringi=String(i);
		ctx.fillText(stringi,i*xl+(i+1)*xH,canvas.height-yH-yl-yH,xl);
		pos_ind[i]={font:ctx.font, ft1:i*xl+(i+1)*xH, ft2:canvas.height-yH-yl-yH, ft3:xl, word:stringi};
	}
	return;
}
function draw_body(n_value)
{
	let yl=8*canvas.height/100;
	let yH=4*canvas.height/100;
	let xl=55*canvas.width/((n_value+1)*100);
	let xH=45*canvas.width/((n_value+2)*100);
	ctx.setLineDash([2, 4]); 
	ctx.beginPath();
	ctx.moveTo(xH,yH);
	ctx.lineTo(xH,canvas.height-2*(yH+yl)-yH/2);
	ctx.strokeStyle = "black";
	ctx.lineWidth = 2;
	ctx.stroke();
	pos_line[0]={LD1:2, LD2:4, x1:xH, y1:yH, x2:xH, y2:canvas.height-2*(yH+yl)-yH/2, Wid:2, col:"black"}
	for(let i=1;i<=n_value;i++)
	{
		ctx.setLineDash([]);
	
		let ystart=canvas.height-3*yH-3*yl-(yH+yl)*Math.floor(Math.log2(i&-i));
		let boxheight=yl;
		let xstart=xH+xl+xH+(xH+xl)*(i-(i&-i));
		let boxwidth=(xH+xl)*(i&-i)-xH;
		ctx.beginPath();
		ctx.rect(xstart,ystart,boxwidth,boxheight);
		pos_r[i]={x1:xstart, x2:ystart, wid:boxwidth, hei:boxheight};
		ctx.stroke();
		
		ctx.textAlign = "center";
		let s=Math.min(yl/2.5,xl)+"px ";
		ctx.font=s+"Arial";
		ctx.fillStyle = base_color;
		ctx.fillText(String(FPAfix(aib[i])),xstart+boxwidth/2,ystart+boxheight/1.5,boxwidth/1.2);
		ctx.fillText("["+String(i-(i&-i)+1)+","+String(i)+"]",xstart+boxwidth/2,ystart-yH/4,2*boxwidth);
		/*ctx.fillText("Σ["+String(i-(i&-i)+1)+", "+String(i)+"]",xstart+boxwidth/2,ystart-yH/4,boxwidth);*/
		pos_text[i]={font:ctx.font, col:base_color, fT1:String(aib[i]), fT2:xstart+boxwidth/2, fT3:ystart+boxheight/1.5, fT4:boxwidth/1.2, align_:"center"};
		
		ctx.setLineDash([2, 4]); 
		ctx.beginPath();
		ctx.moveTo(i*xl+(i+1)*xH,canvas.height-2*(yH+yl)-yH/2);
		ctx.lineTo(i*xl+(i+1)*xH,ystart+yl);
		ctx.strokeStyle = "black";
		ctx.lineWidth = 2;
		ctx.stroke();
		pos_line[i]={LD1:2, LD2:4, x1:i*xl+(i+1)*xH, y1:canvas.height-2*(yH+yl)-yH/2, x2:i*xl+(i+1)*xH, y2:ystart+yl, Wid:2, col:"black"}
	}
	return;
}

function FPAfix(nr)
{
	nr=nr*1e9;
	nr=Math.round(nr);
	nr/=1e9;
	return nr;
}
function debugging()
{
	alert("MicaTicaRicaLicaPicaKicaNicaVicaZicaXicaHicaFicaMicuSHICA");
}
function wait(ms) {/*this is stolen im sorry why is there not a wait function in js already*/
    return new Promise(resolve => {
		cancelWait = () => {
		clearTimeout(timething);
		return new Promise(r => setTimeout(() => {/* I hate promises in js so much this is my workaround for not being able to cancel the wait and start a new one due to js magic*/
                resolve(); 
                r();       
            }, timect/speed));
		}
        timething=setTimeout(resolve, ms);
    });/*reminder trebuie facut await wait(ms)*/
}

function highlight_index(pos,mode=0)
{
	//pos_ind[i]={font:ctx.font, ft1:i*xl+(i+1)*xH, ft2:canvas.height-yH-yl-yH, ft3:xl, word:stringi};
	ctx.beginPath();
	ctx.setLineDash([]);
	ctx.font=pos_ind[pos].font;
	ctx.textAlign="center";
	ctx.fillStyle=background_color;
	ctx.fillText(String(pos),pos_ind[pos].ft1,pos_ind[pos].ft2,pos_ind[pos].ft3);///this is for clearing the overlay
	if(mode==0)ctx.fillStyle=highlight_color;
	else if(mode==1)ctx.fillStyle=base_color;
	ctx.fillText(String(pos),pos_ind[pos].ft1,pos_ind[pos].ft2,pos_ind[pos].ft3);
	//pos_ind[pos].word=String(pos) nu are sens ca nu se schimba
	return;
}
function highlight_r(pos,mode=0)//mode=0=>select, mode=1=>unselect
{
	//pos_r[i]={x1:xstart, x2:ystart, wid:boxwidth, hei:boxheight};
	
	ctx.beginPath();//VERY IMPORTANT
	ctx.setLineDash([]);
	ctx.strokeStyle=background_color;

	ctx.rect(pos_r[pos].x1,pos_r[pos].x2,pos_r[pos].wid,pos_r[pos].hei);
	ctx.stroke();
	if(mode==0)ctx.strokeStyle=highlight_color;
	else if(mode==1)ctx.strokeStyle="black";
	ctx.beginPath();
	ctx.rect(pos_r[pos].x1,pos_r[pos].x2,pos_r[pos].wid,pos_r[pos].hei);
	ctx.stroke();
	return;
}
function highlight_text(pos,word,mode=0)
{
	//remove previous text
	ctx.beginPath();
	ctx.setLineDash([]);
	ctx.fillStyle=background_color;
	let epsilon_=2;
	ctx.fillRect(pos_r[pos].x1+epsilon_,pos_r[pos].x2+epsilon_,pos_r[pos].wid-2*epsilon_,pos_r[pos].hei-2*epsilon_);
	
	ctx.beginPath();
	ctx.setLineDash([]);
	ctx.textAlign="center";
	//pos_text[i]={font:ctx.font, col:base_color, fT1:String(aib[i]), fT2:xstart+boxwidth/2, fT3:ystart+boxheight/1.5, fT4:boxwidth/1.2, align_:"center"};
	ctx.font=pos_text[pos].font;
	if(mode==0)ctx.fillStyle=highlight_color;
	else if(mode==1)ctx.fillStyle=base_color;
	ctx.fillText(word, pos_text[pos].fT2, pos_text[pos].fT3, pos_text[pos].fT4);
	
	return;
}
function write_text(word)//referrering to the bottom text
{
	let yl=8*canvas.height/100;
	let yH=4*canvas.height/100;
	let xl=55*canvas.width/((n+1)*100);
	let xH=45*canvas.width/((n+2)*100);
	ctx.beginPath();
	ctx.fillStyle=background_color;
	ctx.rect(0,canvas.height-1.75*yH-yl,canvas.width,yl+1.75*yH);//1.75 just in case ca sa evit indexii
	ctx.fill();
	ctx.textAlign="center";
	let s=yl+"px ";
	ctx.font=s+"Arial";
	ctx.fillStyle = base_color;
	ctx.fillText(word,canvas.width / 2,canvas.height-yH);
	return;
}
async function update(pos,value,showanimation=1)
{
	value=FPAfix(value);
	if(showanimation==0)
	{
		for(let i=pos;i<=n;i+=(i&-i) )
		{
			aib[i]+=value;
			aib[i]=FPAfix(aib[i]);
		}
		/*v[pos]+=value;*/
		return;
	}
	// how do you animate things im scared
	animation_flag="red"
	//setTimeout(function f(){animation_flag="green";}, 7000);
	
	if(animation=="manual")
	{
		write_text("Apasati butonul de continuare adiacent pozei");
		queue_operations.enqueue([0,"Update(" + String(pos) + "," + String(value) + ")"]);
		queue_operations.enqueue([1,pos,2,pos,0,"Indexul curent este "+String(pos)]);
		//aib[pos]+=value;
		queue_operations.enqueue([0,"Incrementam valoarea din aib["+String(pos)+"] cu "+String(value),3,pos,String(FPAfix(aib[pos]+value)),4,pos,value]);
		queue_operations.enqueue([-3,pos,String(FPAfix(aib[pos]+value)),0,"Parintele pozitiei "+String(pos)+" este "+String(pos)+"+ (-"+String(pos)+"&"+String(pos)+")="+String(pos+(pos&-pos))]);
		let i=pos;
		while(i<=n)
		{
			let prev_i=i;
			i+=(i&-i);
			if(i>n)
			{
				queue_operations.enqueue([0,String(i)+" este mai mare decat "+String(n),-2,prev_i,-1,prev_i]);
				break;
			}
			queue_operations.enqueue([0,"Indexul curent este "+String(i),-1,prev_i,-2,prev_i,1,i,2,i]);
			//aib[i]+=value; asta fac in functia de progress
			queue_operations.enqueue([0,"Incrementam valoarea din aib["+String(i)+"] cu "+String(value),3,i,String(FPAfix(aib[i]+value)),4,i,value]);
			queue_operations.enqueue([-3,i,String(FPAfix(aib[i]+value)),0,"Parintele pozitiei "+String(i)+" este "+String(i)+"+ (-"+String(i)+"&"+String(i)+")="+String(i+(i&-i))]);
		}
		queue_operations.enqueue([0,"Actualizam vectorul original",7777777,pos,value]);
		queue_operations.enqueue([0,"",-7777777]);
	}
	else{//animation=="automatic" ---------------------------------------------------------------------------------------------------------------
		//alert("Shica");
		//await wait(7000);
		
		write_text("Update(" + String(pos) + "," + String(value) + ")");
		await wait(timect/speed);
		highlight_index(pos);
		highlight_r(pos);
		write_text("Indexul curent este "+String(pos));
		//aici poza cu int i=ind
		await wait(timect/speed);
		aib[pos]+=value;
		aib[pos]=FPAfix(aib[pos]);
		write_text("Incrementam valoarea din aib["+String(pos)+"] cu "+String(value));
		highlight_text(pos,String(aib[pos]));
		//await wait(timect/speed);
		//highlight_index(pos,1);
		//highlight_r(pos,1);
		await wait(timect/speed);
		highlight_text(pos,String(aib[pos]),1);
		write_text("Parintele pozitiei "+String(pos)+" este "+String(pos)+"+ (-"+String(pos)+"&"+String(pos)+")="+String(pos+(pos&-pos)));
		let i=pos;
		while(i<=n)
		{
			let prev_i=i;
			i+=(i&-i);
			if(i>n)
			{
				write_text(String(i)+" este mai mare decat "+String(n));
				highlight_r(prev_i,1);
				highlight_index(prev_i,1);
				await wait(timect/speed);
				break;
			}
			await wait(timect/speed);
			write_text("Indexul curent este "+String(i));
			//aici poza cu comentariul
			highlight_index(prev_i,1);
			highlight_r(prev_i,1);
			highlight_index(i);
			highlight_r(i);
			
			await wait(timect/speed);
			write_text("Incrementam valoarea din aib["+String(i)+"] cu "+String(value));
			aib[i]+=value;
			aib[i]=FPAfix(aib[i]);
			highlight_text(i,String(aib[i]));
			await wait(timect/speed);
			highlight_text(i,String(aib[i]),1);
			write_text("Parintele pozitiei "+String(i)+" este "+String(i)+"+ (-"+String(i)+"&"+String(i)+")="+String(i+(i&-i)));
		}
		v[pos]+=value;
		v[pos]=FPAfix(v[pos]);
		let s="v";
		s+=pos;
		document.getElementById(s).value=v[pos];
		write_text("Actualizam vectorul original");
		await wait(timect/speed);
		write_text("");
		document.getElementById("Hdiv").style.visibility="hidden";


		animation_flag="green";
	}
	/*for(let i=pos;i<=n;i+=(i&-i) )
	{
		aib[i]+=value;
	}*/
	/* pentru manual o sa am un flag care incrementeaza pas cu pas (click cu click) pana cand termin, pentru automatic va fi wait(1000/speed )*/
	/*ok change of plans*/
	
	
	return;
}
function set_value(pos,value)
{
	update(pos,value-v[pos],0);
	return;
}
async function query(pos)/*return sum of elements in [1,pos]*/
{
	animation_flag="red";
	if(animation=="manual")
	{
		//op4: (4,oldsum,val){sum=oldsum+val} posibil sa nu folosesc
		queue_operations.enqueue([0,"Query("+String(pos)+")"]);
		queue_operations.enqueue([0,"Initializam suma cu 0",4,0,0]);
		let sum=0;
		if(pos<=0)queue_operations.enqueue([0,"Indexul curent este "+String(pos)]);
		else queue_operations.enqueue([0,"Indexul curent este "+String(pos),1,pos,2,pos]);
		if(pos==0)
		{
			queue_operations.enqueue([0,String(pos)+" este <=0"]);
			queue_operations.enqueue([0,"Query("+String(pos)+")=0"]);
			return 0;
		}
		queue_operations.enqueue([0,"Sum: "+String(sum)+" -> "+String(sum+aib[pos]),3,pos,String(aib[pos]),4,FPAfix(sum),FPAfix(sum+aib[pos])]);
		sum=FPAfix(sum+aib[pos]);
		queue_operations.enqueue([-3,pos,String(aib[pos]),0,"Fratele stang pozitiei "+String(pos)+" este "+String(pos)+"- (-"+String(pos)+"&"+String(pos)+")="+String(pos-(pos&-pos))]);
		let i=pos;
		while(i>0)
		{
			let prev_i=i;
			i-=(i&-i);
			if(i<=0)
			{
				queue_operations.enqueue([0,String(i)+" este <=0",-1,prev_i,-2,prev_i]);
				break;
			}
			queue_operations.enqueue([0,"Indexul curent este "+String(i),-1,prev_i,-2,prev_i,1,i,2,i]);
			queue_operations.enqueue([0,"Sum: "+String(sum)+" -> "+String(sum+aib[i]),3,i,String(aib[i]),4,FPAfix(sum),FPAfix(sum+aib[i])]);
			sum=FPAfix(sum+aib[i]);
			queue_operations.enqueue([0,"Fratele stang pozitiei "+String(i)+" este "+String(i)+"- (-"+String(i)+"&"+String(i)+")="+String(i-(i&-i)),-3,i,String(aib[i])]);
		}
		queue_operations.enqueue([0,"Query("+String(pos)+")="+String(sum)]);
		//queue_operations.enqueue([0,""]);
		return sum;
	}
	else if(animation=="automatic")
	{
		write_text("Query("+String(pos)+")");
		await wait(timect/speed);
		write_text("Initializam suma cu 0");
		let sum=0;
		await wait(timect/speed);
		write_text("Indexul curent este "+String(pos));
		if(pos>0)
		{
			highlight_index(pos);
			highlight_r(pos);
		}
		//aici poza cu i=ind;
		await wait(timect/speed);
		if(pos==0)
		{
			write_text(String(pos)+" este <=0");
			await wait(timect/speed);
			write_text("Query("+String(pos)+")=0");
			return 0;
		}
		write_text("Sum: "+String(sum)+" -> "+String(sum+aib[pos]));
		highlight_text(pos,aib[pos]);
		sum+=aib[pos];
		sum=FPAfix(sum);
		await wait(timect/speed);
		highlight_text(pos,aib[pos],1);
		write_text("Fratele stang pozitiei "+String(pos)+" este "+String(pos)+"- (-"+String(pos)+"&"+String(pos)+")="+String(pos-(pos&-pos)));
		let i=pos;
		while(i>0)
		{
			let prev_i=i;
			i-=(i&-i);
			if(i<=0)
			{
				await wait(timect/speed);
				write_text(String(i)+" este <=0");
				highlight_r(prev_i,1);
				highlight_index(prev_i,1);
				await wait(timect/speed);
				break;
			}
			await wait(timect/speed);
			write_text("Indexul curent este "+String(i));
			//aici poza cu comentariul
			highlight_index(prev_i,1);
			highlight_r(prev_i,1);
			highlight_index(i);
			highlight_r(i);
			
			await wait(timect/speed);
			write_text("Sum: "+String(sum)+" -> "+String(sum+aib[i]));
			sum+=aib[i];
			sum=FPAfix(sum);
			highlight_text(i,String(aib[i]));
			await wait(timect/speed);
			highlight_text(i,String(aib[i]),1);
			write_text("Fratele stang pozitiei "+String(i)+" este "+String(i)+"- (-"+String(i)+"&"+String(i)+")="+String(i-(i&-i)));
		}
		write_text("Query("+String(pos)+")="+String(sum));
		await wait(timect/speed);
		write_text("");
		//animation_flag="green";
		return sum;
	}
	return;//nu ajunge aici btw
	/*let sum=0;
	for(let i=pos;i>=1;i-=(i&-i) )
	{
		//we are in node i
		sum+=aib[i];
	}
	return sum;*/
}
async function range_query(pos1,pos2)/*return sum of elements in [pos1,pos2], pos1<pos2 and pos1,pos2 in [1,32]*/
{
	animation_flag="red";
	if(animation=="manual")
	{
		write_text("Apasati butonul de continuare adiacent pozei");
		queue_operations.enqueue([0,"Σ("+String(pos1)+","+String(pos2)+")=query("+String(pos2)+")-query("+String(pos1-1)+")"]);
		//queue_operations.enqueue([0,"Calculam valoarea query("+String(pos2)+")"]);
		let s1= await query(pos2);//why does await fix it??? im not promising on that branch???
		//queue_operations.enqueue([0,"Calculam valoarea query("+String(pos1-1)+")"])
		let s2=await query(pos1-1);
		queue_operations.enqueue([0,"Σ("+String(pos1)+","+String(pos2)+")=("+String(s1)+")-("+String(s2)+")="+String(FPAfix(s1-s2))]);
		queue_operations.enqueue([0,"",-7777777,FPAfix(s1-s2)]);
		/*document.getElementById("Qresult").innerHTML=String(FPAfix(s1-s2));
		document.getElementById("Qresult").style.visibility="visible";
		animation_flag="green";*/
	}
	else if(animation=="automatic")
	{
		write_text("Σ("+String(pos1)+","+String(pos2)+")=query("+String(pos2)+")-query("+String(pos1-1)+")");
		await wait(timect/speed);
		//write_text("Calculam valoarea query("+String(pos2)+")");
		await wait(timect/speed);
		let s1= await query(pos2);
		
		//await wait(timect/speed);
		
		//write_text("Calculam valoarea query("+String(pos1-1)+")");
		await wait(timect/speed);
		let s2=await query(pos1-1);
		
		write_text("Σ("+String(pos1)+","+String(pos2)+")=("+String(s1)+")-("+String(s2)+")="+String(FPAfix(s1-s2)));
		await wait(timect/speed);
		write_text("");
		document.getElementById("Qresult").innerHTML=String(FPAfix(s1-s2));
		document.getElementById("Qresult").style.visibility="visible";
		document.getElementById("Hdiv").style.visibility="hidden";
		animation_flag="green";
	}
	return;
	//return query(pos2)-query(pos1-1);
}
function build()
{
	for(let i=1;i<=n;i++)
	{
		update(i,v[i],0);
	}
	return;
}
function init_web()
{
	document.addEventListener("DOMContentLoaded", function() {
		document.getElementById("speed").value = "1";
		document.getElementById("type_animation").value = "manual";
	});
	
	document.getElementById("type_animation").addEventListener("change", function() {
	let object_speed = document.getElementById("speed");
	if (this.selectedIndex === 1) { ///automatic
		object_speed.style.visibility = "visible";
	} else {
		object_speed.style.visibility = "hidden";
		speed=1;
	}
	});
	
}
init_web();
function init()
{
	n=0;
	for(let i=0;i<=32;i++)
	{
		aib[i]=0;
		v[i]=0;
		upd[i]=false;
	}
	ctx.clearRect(0,0,canvas.width,canvas.height);
}
init();
function converter(stringin,canbefloat=0) {
  let nrout = Number(stringin);
  if(canbefloat==1)
  {
	if(isNaN(nrout))return 0;
	return nrout;
  }
  if(isNaN(nrout) || !Number.isInteger(nrout)){
	return 0;
  }
  return nrout;
}

function make_v()
{
	document.getElementById("Qresult").innerHTML="";
	let error_string="";
	if(animation_flag=="red")
	{
		error_string+="*trebuie finalizat procesul început\n";
	}
	if(error_string!="")
	{
		document.getElementById("n_error_feedback").innerHTML=error_string;
		document.getElementById("n_error_feedback").style.display="block";
		return;
	}
	else
	{
		document.getElementById("n_error_feedback").innerHTML="";
		document.getElementById("n_error_feedback").style.display="none";
	}
	init();
	is_modified(false);
	
	n=display_n(1);
	let s="v"
	for(let i=1;i<=n;i++)
	{
		let crt_s=s+i;
		let aux=document.getElementById(crt_s).value;/*string*/
		v[i]=converter(aux,1);/*number*/
		v[i]=FPAfix(v[i]);
		document.getElementById(crt_s).value=v[i];
	}
	for(let i=n+1;i<=32;i++)
	{
		v[i]=0;
		let crt_s=s+i;
		document.getElementById(crt_s).value=v[i];
	}
	debugging();
	build();
	draw_index(n);
	draw_body(n);
	return;
}
function make_upd()
{
	/*validate both inputs*/
	document.getElementById("Qresult").innerHTML="";
	let error_string="";
	if(animation_flag=="red")
	{
		error_string+="*trebuie finalizat procesul început\n";
	}
	let upd_object=document.getElementById("upd_pos");
	let given_pos=upd_object.value;
	given_pos=converter(given_pos);
	let error_object=document.getElementById("upd_error_feedback");
	if(given_pos<=0 || given_pos>n || typeof n === 'undefined')
	{
		error_string+="*pos trebuie sa fie un numar natural intre 1 si n";
		given_pos=0;
	}
	upd_object.value=given_pos;
	
	upd_object=document.getElementById("upd_val");
	let given_val=upd_object.value;
	given_val=converter(given_val,1);
	upd_object.value=given_val;
	
	if(error_string!="")
	{
		error_object.style.display="block";
		error_object.innerHTML=error_string.replace(/\n/g, "<br>");;
		return;
	}
	
	error_object.style.display="none";
	error_object.innerHTML="";
	document.getElementById("Hdiv").style.visibility="visible";
	crtop="upd";
	update(given_pos,given_val);
	return;
}
function make_query()
{
	document.getElementById("Qresult").innerHTML="";
	/*validate both inputs*/
	
	let error_string="";
	if(animation_flag=="red")
	{
		error_string+="*trebuie finalizat procesul început\n";
	}
	let upd_object=document.getElementById("query_pos1");
	let given_pos1=upd_object.value;
	given_pos1=converter(given_pos1);
	let c1=given_pos1;
	let error_object=document.getElementById("qry_error_feedback");
	if(given_pos1<=0 || given_pos1>n || typeof n === 'undefined')
	{
		error_string+="*pos1 trebuie sa fie un numar natural intre 1 si n\n";
		given_pos1=0;
	}
	upd_object.value=given_pos1;
	
	upd_object=document.getElementById("query_pos2");
	let given_pos2=upd_object.value;
	given_pos2=converter(given_pos2);
	let c2=given_pos2;
	if(given_pos2<=0 || given_pos2>n || typeof n === 'undefined')
	{
		error_string+="*pos2 trebuie sa fie un numar natural intre 1 si n\n";
		given_pos2=0;
	}
	upd_object.value=given_pos2;
	if(c1>c2)
	{
		error_string+="*pos1 trebuie sa fie mai mic sau egal decat pos2";
		given_pos1=0;
		given_pos2=0;
		document.getElementById("query_pos1").value=0;
		document.getElementById("query_pos2").value=0;
	}
		
	if(error_string!="")
	{
		error_object.style.display="block";
		error_object.innerHTML=error_string.replace(/\n/g, "<br>");
		return;
	}
	
	error_object.style.display="none";
	error_object.innerHTML="";
	document.getElementById("Hdiv").style.visibility="visible";
	crtop="qry";
	range_query(given_pos1,given_pos2);
	return;
}
function progress()
{
	if(crtop=="none")alert("this is a bug");
	else if(crtop=="upd")
	{
		if(queue_operations.isEmpty()==true)
		{
			//alert("this too is a bug");//maybe it isn't though?
			return;
		}
		let op_vector=queue_operations.dequeue();
		let m=op_vector.length;
		for(let j=0;j<m;j++)
		{
			if(op_vector[j]==0)//write_text(string)
			{
				j++;
				let s=op_vector[j];
				write_text(s);
			}
			else if(op_vector[j]==1)//highlight_index(pos)
			{
				j++;
				let ind=op_vector[j];
				highlight_index(ind);
			}
			else if(op_vector[j]==-1)//highlight_index(pos,1)
			{
				j++;
				let ind=op_vector[j];
				highlight_index(ind,1);
			}
			else if(op_vector[j]==2)//highlight_r(pos)
			{
				j++;
				let ind=op_vector[j];
				highlight_r(ind);
			}
			else if(op_vector[j]==-2)//highlight_r(pos,1)
			{
				j++;
				let ind=op_vector[j];
				highlight_r(ind,1);
			}
			else if(op_vector[j]==3)//highlight_text(pos,string)
			{
				j++;
				let ind=op_vector[j];
				j++;
				let s=op_vector[j];
				highlight_text(ind,s);
			}
			else if(op_vector[j]==-3)//highlight_text(pos,string,1)
			{
				j++;
				let ind=op_vector[j];
				j++;
				let s=op_vector[j];
				highlight_text(ind,s,1);
			}
			else if(op_vector[j]==4)
			{
				j++;
				let ind=op_vector[j];
				j++;
				let val=op_vector[j];
				aib[ind]+=val;
			}
			else if(op_vector[j]==7777777)
			{
				j++;let pos=op_vector[j];j++;let value=op_vector[j];
				v[pos]+=value;
				v[pos]=FPAfix(v[pos]);
				let s="v";
				s+=pos;
				document.getElementById(s).value=v[pos];
				
			}
			else if(op_vector[j]==-7777777)///animation_flag="green";
			{
				animation_flag="green";
				document.getElementById("Hdiv").style.visibility="hidden";
			}
		}
	}
	else if(crtop=="qry")
	{
		if(queue_operations.isEmpty()==true)
		{
			//alert("this too is a bug");//maybe it isn't though?
			return;
		}
		let op_vector=queue_operations.dequeue();
		let m=op_vector.length;
		for(let j=0;j<m;j++)
		{
			if(op_vector[j]==0)//write_text(string)
			{
				j++;
				let s=op_vector[j];
				write_text(s);
			}
			else if(op_vector[j]==1)//highlight_index(pos)
			{
				j++;
				let ind=op_vector[j];
				highlight_index(ind);
			}
			else if(op_vector[j]==-1)//highlight_index(pos,1)
			{
				j++;
				let ind=op_vector[j];
				highlight_index(ind,1);
			}
			else if(op_vector[j]==2)//highlight_r(pos)
			{
				j++;
				let ind=op_vector[j];
				highlight_r(ind);
			}
			else if(op_vector[j]==-2)//highlight_r(pos,1)
			{
				j++;
				let ind=op_vector[j];
				highlight_r(ind,1);
			}
			else if(op_vector[j]==3)//highlight_text(pos,string)
			{
				j++;
				let ind=op_vector[j];
				j++;
				let s=op_vector[j];
				highlight_text(ind,s);
			}
			else if(op_vector[j]==-3)//highlight_text(pos,string,1)
			{
				j++;
				let ind=op_vector[j];
				j++;
				let s=op_vector[j];
				highlight_text(ind,s,1);
			}
			else if(op_vector[j]==4)
			{
				j++;
				/*placeholder*/
				j++;
			}
			else if(op_vector[j]==-7777777)
			{
				j++;
				let result=FPAfix(op_vector[j]);
				document.getElementById("Qresult").innerHTML=String(result);
				document.getElementById("Qresult").style.visibility="visible";
				animation_flag="green";
				document.getElementById("Hdiv").style.visibility="hidden";
			}
		}
	}
	return;
}
/*
NOTES:
bug1: if you change the speed while the program is waiting say 20 seconds on 0.1x, it will have no effect the way i currently did it (as in await wait(timect/speed), if the speed is changed after this instruction is read the parameter won't change obviously). Gotta find a way to remedy this somehow
note1: when deleting the text make sure it does not collide with the box in which it's in
note2: the spam message isn't clear enough, maybe say what the ongoing operation is and what the operation they clicked on is (i.e you can't begin a build process, there is an ongoing update process
note3: the vector is updating as soon as i submit the update, maybe i can wait for the operation of actually incrementing it to do so. 
note4: for manual updating, there is no clear text telling you it registered, maybe some text saying "ongoing update, press continue"
note5: I sorta fixed note3 by incrementing v[pos] by value at the end, so the update code should have a v[pos]+=value at the end to match
note6: fa codul prezentat prezentabil (rocket science i know) i.e. aibsize->aib_size sau aibSize
note7: reminder de poze cu codul, poti pune in mai multe painturi aceeasi poza si adaugi dreptunghiuri sa inconjori sau o sageata la linie
note8: TE ROG FOLOSESTE GIT HUB TE IMPLORRR
bug2: poti schimba animatia din manuala in automatica cat timp lucrezi, trebuie sa existe un if care te impiedica in functia de change_speed sau cum se cheama
bug3: butonul de continue apare langa cod chiar daca animatia este atomatica, schimba vizibilitatea
note9: momentan trebuie sa folosesc FPAfix peste tot ca nu stiu ce problema au numerele reale in js de nu vor sa coopereze, nu uita cand scrii manual query sa adaugi, ar fi totusi frumos daca nu as avea nevoie
*/