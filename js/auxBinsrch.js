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
	let copyText=`int binSearch(int val)
{
    int ind=0, sum=0;
    int interval=1<<((int)log2(n));
    while(interval)
    {
        if(ind+interval<=n and aib[ind+interval]+sum<val)
        {
            sum+=aib[ind+interval];
            ind+=interval;
        }
        interval/=2;
    }
    return ind;
}`
	navigator.clipboard.writeText(copyText);
	let tooltip = document.getElementById("idtooltip");
	tooltip.innerHTML = "Copiat codul";
	return;
}
function copycode_out()
{
	let tooltip = document.getElementById("idtooltip");
	tooltip.innerHTML = "Copiaza pe clipboard";
	return;
}