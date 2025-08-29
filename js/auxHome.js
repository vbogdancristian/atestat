let linkstate=0;
function hhh()
{
	linkstate=1-linkstate;
	if(linkstate==1)
	{
		document.getElementById("links_box").innerHTML="Sursele folosite pentru realizarea lucrarii🞁";
		document.getElementById("links").style.display="block";
	}
	else if(linkstate==0)
	{
		document.getElementById("links_box").innerHTML="Sursele folosite pentru realizarea lucrarii🞃";
		document.getElementById("links").style.display="none";
	}
	return;
}