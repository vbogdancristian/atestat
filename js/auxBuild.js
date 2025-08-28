function copycode_in()
{
	let copyText=`for(int i=1; i&lt=n; i++)
{
    AIB[i]+=v[i];
    if(i+(i&-i)&lt=n)AIB[i+(i&-i)]+=AIB[i];
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