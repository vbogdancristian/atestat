let page=1;
const last_page=15;
const img_obj=document.getElementById("ghid_img");
const text_obj=document.getElementById("ghid_text");
function init_web()
{
	document.addEventListener("DOMContentLoaded", function() {
		document.getElementById("ghidback").style.visibility="hidden";
		document.getElementById("togen").style.display="none";
		page=1;
		loadpage(page);
	});
	
	
}
init_web();
function loadpage(nrpage)
{
	img_obj.src="../img/ghid_"+String(nrpage-1)+".png";
	if(nrpage==1)
	{
		text_obj.innerHTML="În acest ghid vom explica pas cu pas modul de utilizare a modelatorului unui AIB clasic (pe sume). Folosiți butoanele din josul paginii pentru a parcurge acest manual. Modelatorul AIB xor funcționează în mod asemănător, diferența fiind informația stocată în noduri.";
		
	}
	else if(nrpage==2)
	{
		text_obj.innerHTML="Primul lucru ce trebuie făcut este să introduceți o valoare pentru n, ce reprezintă numărul de elemente ale vectorului. Această valoare trebuie să fie un număr natural între 1 și 32. Dacă valoarea introdusă nu respectă condițiile, atunci valoarea lui n va rămâne neschimbată.";
		
	}
	else if(nrpage==3)
	{
		text_obj.innerHTML="Mărimea vectorului se va schimba odată cu setarea valorii lui n. Dacă nu s-a schimbat, apăsați ENTER sau dați click în afara cutiei de text. Selectați-vă valorile vectorului peste care vom forma AIB-ul. Valorile introduse ce nu sunt numere vor fi interpretate ca având valoarea 0." ;
	}
	else if(nrpage==4)
	{
		text_obj.innerHTML="După ce ați introdus valorile elementelor din vector dați click pe butonul de creare a vectorului.";
	}
	else if(nrpage==5)
	{
		text_obj.innerHTML="Veți vedea în colțul din dreapta-jos reprezentarea prin segmente a AIB-ului ce are drept reper vectorul introdus. Pentru un index i, AIB[i] reprezintă suma elementelor din subsecvența [i - (i&-i) + 1, i] a vectorului, unde (i&-i) reprezintă 2 ridicat la numărul de zerouri din reprezentarea binară a numarului i."
	}
	else if(nrpage==6)
	{
		text_obj.innerHTML="Vectorul poate fi modificat pe parcurs. În imagine am setat valoarea elementului 3 a vectorului la 48, ceea ce nu se reflectă în reprezentarea grafică. Textul de sus indică dacă structura vectorului coincide sau nu cu cea a reprezentării. Pentru a face reprezentarea grafică să coincidă cu vectorul apăsați din nou pe butonul de creare.";
	}
	else if(nrpage==7)
	{
		text_obj.innerHTML=`În continuare puteți selecta modul în care vreți să fie animate cele 2 funcții (mai multe despre ele în următoarele pagini). Valoarea deja selectată este animația de tip "manuală", dar există și varianta de animație "automată". Dacă selectați a 2-a variantă va apărea o altă căsuță în care puteți selecta viteza animației. Pentru a salva modificările apăsați pe butonul "salvează preferințele". Textul alăturat indică tipul de operație începută.`;
	}
	else if(nrpage==8)
	{
		text_obj.innerHTML="Prima funcție pe care o vom descrie este cea de actualizare. Prima căsuță reprezintă valoarea lui pos care trebuie să fie un număr natural între 1 și n, altfel valoarea se va reseta la 0 și va apărea un mesaj de eroare. A 2-a căsuță reprezintă valoarea pe care vrem să o adăugam la v[pos], dacă nu este introdus un număr atunci va fi interpretată drept 0.";
	}
	else if(nrpage==9)
	{
		text_obj.innerHTML=`Dacă ați selectat animația de tip "manuală" va aparea în josul paginii un buton de progresare a animației. Veți putea vedea nodurile actualizate de funcție. Lângă buton va fi și poza cu codul C++ care descrie funcția, linia subliniată în cod arată pasul la care a ajuns animația. De asemenea, butoanele pentru inițierea altor procese vor fi ascunse, precum și butonul de schimbarea tipului de animație.`;
	}
	else if(nrpage==10)
	{
		text_obj.innerHTML=`Dacă ați selectat animația de tip "automată", animația va fi derulată asemănător cu cea "manuală", dar în loc să apăsați butonul de continuare trebuie așteptat 2 secunde. Puteți regla viteza animației folosind căsuța de viteză, după ce ați selectat-o nu uitați să o salvați cu butonul de alături.`;
	}
	else if(nrpage==11)
	{
		text_obj.innerHTML="Indiferent de tipul de animație folosit veți vedea valoarea din vector actualizată pentru a corespunde cu valorile din AIB.";
	}
	else if(nrpage==12)
	{
		text_obj.innerHTML="A doua funcție pe care o vom descrie este cea de interogare. Cele 2 valori cerute sunt numere naturale între 1 și n. De asemenea, valoarea din prima căsuță trebuie să fie mai mică sau egală cu cea din a 2-a căsuță. Dacă valorile introduse nu corespund cerințelor vor fi setate înapoi la 0 și funcția nu va derula."
	}
	else if(nrpage==13)
	{
		text_obj.innerHTML=`Dacă ați selectat animația de tip "manuală" va aparea în josul paginii un buton de progresare a animației. Veți putea vedea nodurile din care se calculează suma. Lângă buton va fi și poza cu codul C++ care descrie funcția, linia subliniată în cod arată pasul la care a ajuns animația. De asemenea, butoanele pentru inițierea altor procese vor fi ascunse, precum și butonul de schimbarea tipului de animație.`;
	}
	else if(nrpage==14)
	{
		text_obj.innerHTML=`Dacă ați selectat animația de tip "automată", animația va fi derulată asemănător cu cea "manuală", dar în loc să apăsați butonul de continuare trebuie așteptat 2 secunde. Puteți regla viteza animației folosind căsuța de viteză, după ce ați selectat-o nu uitați să o salvați cu butonul de alături.`;
	}
	
	else if(nrpage==15)
	{
		text_obj.innerHTML="Indiferent de tipul de animație folosit veți vedea rezultatul interogării în blocul funcției. După ce efectuați altă operație (crearea vectorului/ actualizarea/ altă interogare), valoarea rezultatului va dispărea."
	}
	
		
}
function nextpage()
{
	if(page==1)
	{
		document.getElementById("ghidback").style.visibility="visible";
	}
	if(page==last_page-1)
	{
		document.getElementById("ghidfront").style.visibility="hidden";
		document.getElementById("togen").style.display="block";
	}
	page++;
	loadpage(page);
}
function prevpage()
{
	if(page==2)
	{
		document.getElementById("ghidback").style.visibility="hidden";
	}
	if(page==last_page)
	{
		document.getElementById("ghidfront").style.visibility="visible";
	}
	page--;
	loadpage(page);
}