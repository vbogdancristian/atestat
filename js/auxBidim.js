function copycode_in()
{
	let copyText=`void update(int indX, int indY, int val)
{
    for(int x=indX;x<=n;x+=(x&-x))
    {
        for(int y=indY;y<=m;y+=(y&-y))
        {
            aib[x][y]+=val;
        }
    }
}
int query(int indX, int indY)
{
    int sum=0;
    for(int x=indX;x>0;x-=(-x&x))
    {
        for(int y=indY;y>0;y-=(-y&y))
        {
            sum+=aib[x][y];
        }
    }
    return sum;
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
function upd_send()
{
	let error_obj=document.getElementById("error_msg_upd");
	let result_obj=document.getElementById("result_upd");
	
	let n_obj=document.getElementById("n_upd");
	let n=n_upd.value;
	n=+n;
	
	let m_obj=document.getElementById("m_upd");
	let m=m_upd.value;
	m=+m;
	
	let posX_obj=document.getElementById("posX_upd");
	let posX=posX_obj.value;
	posX=+posX;
	
	let posY_obj=document.getElementById("posY_upd");
	let posY=posY_obj.value;
	posY=+posY;
	
	if(Number.isInteger(posY)==false || Number.isInteger(posX)==false || posX<=0 || posX>=134217728+1 || posY <=0 || posY>=134217728+1 || Number.isInteger(n)==false || Number.isInteger(m)==false || n<=0 || m<=0 || n>=134217728+1 || m>=134217728+1 || posX>n || posY>m)
	{
		n_obj.value=31;
		m_obj.value=32;
		posX_obj.value=27;
		posY_obj.value=1;
		result_obj.innerHTML="(27,1), (27,2), (27,4), (27,8), (27,16), (27,32), (28,1), (28,2), (28,4), (28,8), (28,16), (28,32)";
		error_obj.style.display="block";
		error_obj.innerHTML="*toate valorile date trebuie sa fie numare naturale mai mari sau egale cu 1 si mai mici sau egale cu 134217728";
		return;
	}
	if(n==134217728 && m==134217728 && posX==1 && posY==1)
	{
		document.getElementById("upd_secret").style.display="block";
	}
	else document.getElementById("upd_secret").style.display="none";
	error_obj.style.display="none";
	error_obj.innerHTML="";
	let s="";
	for(let x=posX;x<=n;x+=(x&-x))
	{
		for(let y=posY;y<=m;y+=(y&-y))
		{
			if(y+(y&-y)<=m)s+="("+String(x)+","+String(y)+"), ";
			else s+="("+String(x)+","+String(y)+")";
		}
		if(x+(x&-x)<=n)s+=", ";
	}
	result_obj.innerHTML=s;
	return;
}
function qry_send()
{
	let error_obj=document.getElementById("error_msg_qry");
	let result_obj=document.getElementById("result_qry");
	
	let posX_obj=document.getElementById("posX_qry");
	let posX=posX_obj.value;
	posX=+posX;
	
	let posY_obj=document.getElementById("posY_qry");
	let posY=posY_obj.value;
	posY=+posY;
	
	if(Number.isInteger(posY)==false || Number.isInteger(posX)==false || posX<=0 || posX>=134217728+1 || posY <=0 || posY>=134217728+1 )
	{
		posX_obj.value=27;
		posY_obj.value=20;
		result_obj.innerHTML="Σ[(1,1),([11011],[10100]) = AIB[27][20] + AIB[27][16] + AIB[26][20] + AIB[26][16] + AIB[24][20] + AIB[24][16] + AIB[16][20] + AIB[16][16];";
		error_obj.style.display="block";
		error_obj.innerHTML="*toate valorile date trebuie sa fie numare naturale mai mari sau egale cu 1 si mai mici sau egale cu 134217728";
		return;
	}
	error_obj.style.display="none";
	error_obj.innerHTML="";
	let s="Σ[(1,1),(["+posX.toString(2)+"],["+posY.toString(2)+"]) = ";
	for(let x=posX;x>0;x-=(x&-x))
	{
		for(let y=posY;y>0;y-=(y&-y))
		{
			if(y-(y&-y)>0)s+="AIB["+String(x)+"]["+String(y)+"] + ";
			else s+="AIB["+String(x)+"]["+String(y)+"]";
		}
		if(x-(x&-x)>0)s+=" + ";
	}
	s+=";";
	result_obj.innerHTML=s;
	return;
}