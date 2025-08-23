function send()
{
	let n;
	let n_obj;
	let pos;
	let pos_obj;
	let error_obj;
	let result_obj;
	n_obj=document.getElementById("n1");
	pos_obj=document.getElementById("pos1");
	error_obj=document.getElementById("error_msg");
	result_obj=document.getElementById("result");
	n=n_obj.value;
	pos=pos_obj.value;
	if(+pos>+n || !Number.isInteger(+n) || !Number.isInteger(+pos) || n<=0 || pos<=0)
	{
		n_obj.value=2047;
		pos_obj.value=398;
		error_obj.style.display="block";
		error_obj.innerHTML="*n si pos sunt numere naturale nenule astfel incat pos<=n";
		return;
	}
	error_obj.style.display="none";
	error_obj.innerHTML="";
	n=+n;
	pos=+pos;
	n_obj.value=n;
	pos_obj.value=pos;
	let s=result_obj.innerHTML;
	result_obj.innerHTML="";
	s="AIB[";
	for(let i=pos;i<=n;i+=(i&-i))
	{
		if(i+(i&-i)<=n)s+=String(i)+", ";
		else s+=String(i);
	}
	s+="].";
	result_obj.innerHTML=s;
	return;
}
function choose(reprstyle)
{
	let arb;
	let seg;
	let border_arb;
	let border_seg;
	if(reprstyle==0)
	{
		arb="block";
		seg="none";
		border_arb="2px solid purple";
		border_seg="none";
	}
	else if(reprstyle==1) 
	{
		arb="none";
		seg="block";
		border_seg="2px solid purple";
		border_arb="none";
	}
	document.getElementById("arbstyle").style.display=arb;
	document.getElementById("segstyle").style.display=seg;
	document.getElementById("choose_arb").style.border=border_arb;
	document.getElementById("choose_seg").style.border=border_seg;
	document.getElementById("afterwards").style.display="block";
	return;
}
function copycode_in()
{
	let copyText=`void update(int ind, int val)
{
	for(int i=ind;i<=n;i+=(i&-i))
	{
		aib[i]+=val;
	}  
}`
	navigator.clipboard.writeText(copyText);
	let tooltip = document.getElementById("idtooltip");
	tooltip.innerHTML = "Copiat codul";
	return;
}
function copycode_out()
{
	let tooltip = document.getElementById("idtooltip");
	tooltip.innerHTML = "Copiaza codul";
	return;
}
let proofstate=0;
function hhh()
{
	proofstate=1-proofstate;
	if(proofstate==1)
	{
		document.getElementById("bonus").innerHTML="Alte demonstratii🞁";
		document.getElementById("moreproofs").style.display="block";
	}
	else if(proofstate==0)
	{
		document.getElementById("bonus").innerHTML="Alte demonstratii🞃";
		document.getElementById("moreproofs").style.display="none";
	}
	return;
}