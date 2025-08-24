let result_obj=document.getElementById("result");
let error_obj=document.getElementById("error_msg");
function send()
{
	let p_obj=document.getElementById("p");
	let p=p_obj.value;
	p=+p;//string->numar desi input era de tip number 
	if(Number.isInteger(p)==false || p<=0 || p>=134217728+1)
	{
		p_obj.value=24;
		result_obj.innerHTML="Σ(17,24);";
		error_obj.style.display="block";
		error_obj.innerHTML="*indexul trebuie sa fie un numar natural mai mare sau egal cu 1 si mai mic sau egal cu 134217728";
		return;
	}
	error_obj.style.display="none";
	error_obj.innerHTML="";
	let s="Σ(";
	s+=String(p-(p&-p)+1)+","+String(p);
	s+=");";
	result_obj.innerHTML=s;
	return;
}
let nr_result_obj=document.getElementById("nr_result");
let nr_error_obj=document.getElementById("nr_error_msg");
function nr_send()
{
	let nr_obj=document.getElementById("nr");
	let nr=nr_obj.value;
	nr=+nr;//string->numar desi input era de tip number 
	if(Number.isInteger(nr)==false || nr<=0 || nr>=134217728+1)
	{
		nr_obj.value=24;
		nr_result_obj.innerHTML="UB([11000]=3;";
		nr_error_obj.style.display="block";
		nr_error_obj.innerHTML="*valoarea trebuie sa fie un numar natural mai mare sau egal cu 1 si mai mic sau egal cu 134217728";
		return;
	}
	nr_error_obj.style.display="none";
	nr_error_obj.innerHTML="";
	let s="UB([";
	s+=nr.toString(2);
	s+="]=";
	s+=Math.log2(nr&-nr);
	s+=";"
	nr_result_obj.innerHTML=s;
	return;
}