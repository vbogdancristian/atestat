let result_obj=document.getElementById("result");
let error_obj=document.getElementById("error_msg");
function send()
{
	let p_obj=document.getElementById("p");
	let p=p_obj.value;
	p=+p;//string->numar desi input era de tip number 
	if(Number.isInteger(p)==false || p<=0 || p>=134217728+1)
	{
		p_obj.value=736;
		result_obj.innerHTML="Σ(1, [1011100000]) = AIB[736] + AIB[704] + AIB[640] + AIB[512];";
		error_obj.style.display="block";
		error_obj.innerHTML="*indexul trebuie să fie un număr natural mai mare sau egal cu 1 și mai mic sau egal cu 134217728";
		return;
	}
	error_obj.style.display="none";
	error_obj.innerHTML="";
	let s="Σ(1, ["+p.toString(2)+"]) = ";//why not work
	for(let i=p;i>0;i-=(i&-i))
	{
		if(i-(i&-i)>0)s+="AIB["+String(i)+"] + ";
		else s+="AIB["+String(i)+"];";
	}
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
	let copyText=`int query(int ind)
{
    int s=0;
    for(int i=ind;i>0;i-=(i&-i))
    {
        s+=aib[i];
    }
    return s;
}`
	navigator.clipboard.writeText(copyText);
	let tooltip = document.getElementById("idtooltip");
	tooltip.innerHTML = "Copiat codul";
	return;
}
function copycode_out()
{
	let tooltip = document.getElementById("idtooltip");
	tooltip.innerHTML = "Copiază pe clipboard";
	return;
}
let proofstate=0;
function hhh()
{
	proofstate=1-proofstate;
	if(proofstate==1)
	{
		document.getElementById("bonus").innerHTML="Alte demonstrații🞁";
		document.getElementById("moreproofs").style.display="block";
	}
	else if(proofstate==0)
	{
		document.getElementById("bonus").innerHTML="Alte demonstrații🞃";
		document.getElementById("moreproofs").style.display="none";
	}
	return;
}