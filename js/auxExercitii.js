let schi_state=0;
function schi_h()
{
	schi_state=1-schi_state;
	if(schi_state==1)
	{
		document.getElementById("schi_box").innerHTML="Descriere soluție🞁";
		document.getElementById("schi_sol").style.display="block";
	}
	else if(schi_state==0)
	{
		document.getElementById("schi_box").innerHTML="Descriere soluție🞃";
		document.getElementById("schi_sol").style.display="none";
	}
	return;
}

let evantai_state=0;
function evantai_h()
{
	evantai_state=1-evantai_state;
	if(evantai_state==1)
	{
		document.getElementById("evantai_box").innerHTML="Descriere soluție🞁";
		document.getElementById("evantai_sol").style.display="block";
	}
	else if(evantai_state==0)
	{
		document.getElementById("evantai_box").innerHTML="Descriere soluție🞃";
		document.getElementById("evantai_sol").style.display="none";
	}
	return;
}

let calafat_state=0;
function calafat_h()
{
	calafat_state=1-calafat_state;
	if(calafat_state==1)
	{
		document.getElementById("calafat_box").innerHTML="Descriere soluție🞁";
		document.getElementById("calafat_sol").style.display="block";
	}
	else if(calafat_state==0)
	{
		document.getElementById("calafat_box").innerHTML="Descriere soluție🞃";
		document.getElementById("calafat_sol").style.display="none";
	}
	return;
}

let spoiler_state=0;
function spoiler_h()
{
	spoiler_state=1-spoiler_state;
	if(spoiler_state==1)
	{
		document.getElementById("spoiler_warning").innerHTML="Afișați🞁";
		document.getElementById("spoiler").style.display="block";
	}
	else if(spoiler_state==0)
	{
		document.getElementById("spoiler_warning").innerHTML="Afișați🞃";
		document.getElementById("spoiler").style.display="none";
		return;
	}
	document.getElementById("code_schi").textContent=`#include <bits/stdc++.h>
using namespace std;
ifstream fin ("schi.in");
ofstream fout ("schi.out");
int const lmax=30007;
int n,aib[lmax];
int v[lmax], rez[lmax];
void update(int ind, int val)
{
    for(int i=ind;i<=n;i+=(i&-i))
    {
        aib[i]+=val;
    }
}
int binSearch(int val)
{
    int ind=0;
    int sum=0;
    int interval=(1<<((int)log2(n)));
    while(interval)
    {
        if(ind+interval<=n and sum+aib[interval+ind]<val)
        {
            sum+=aib[interval+ind];
            ind+=interval;
        }
        interval/=2;
    }
    return ind+1;
}
int main()
{
    fin>>n;
    for(int i=1;i<=n;i++)///index de la 1 din cauza AIB
    {
        fin>>v[i];
        update(i,1);
    }
    for(int i=n;i>=1;i--)
    {
        int pos=binSearch(v[i]);
        rez[pos]=i;
        update(pos,-1);
    }
    for(int i=1;i<=n;i++)
    {
        fout<<rez[i]<<"\\n";
    }
    fin.close();
    fout.close();
    return 0;
}
`;
	document.getElementById("code_calafat").textContent=`#include <bits/stdc++.h>
using namespace std;
ifstream fin ("calafat.in");
ofstream fout ("calafat.out");
int const lmax=200007;
struct qry{
    long long int st;
    long long int dr;
    int pos;
};
qry seg[lmax];
bool cmp(qry a, qry b)
{
    return a.dr<b.dr;///nu conteaza st
}
int v[lmax], st[lmax], last_ap[lmax];
long long int aib[lmax], rez[lmax];
int n,m;
long long int query(int ind)
{
    long long int sum=0;
    for(int i=ind;i>0;i-=(i&-i))
    {
        sum+=aib[i];
    }
    return sum;
}
void update(int ind, long long int val)
{
    for(int i=ind;i<=n;i+=(i&-i))
    {
        aib[i]+=val;
    }
}
int main()
{
    fin>>n>>m;
    for(int i=1;i<=n;i++)
    {
        fin>>v[i];
        st[i]=last_ap[v[i]];
        last_ap[v[i]]=i;
    }
    for(int i=0;i<m;i++)
    {
        fin>>seg[i].st>>seg[i].dr;
        seg[i].pos=i;
    }
    sort(seg,seg+m,cmp);
    int j=0;
    for(int i=1;i<=n;i++)
    {
        if(st[i]!=0)
        {
            update(st[i],i-st[i]);
        }
        while(j<m and i>=seg[j].dr)
        {
            rez[seg[j].pos]=query(seg[j].dr)-query(seg[j].st-1);
            j++;
        }
    }
    for(int i=0;i<m;i++)
    {
        fout<<rez[i]<<"\\n";
    }
    fin.close();
    fout.close();
    return 0;
}`;
	document.getElementById("code_evantai").textContent=`#include <bits/stdc++.h>
using namespace std;
ifstream fin ("evantai.in");
ofstream fout ("evantai.out");
int const lmax=707;
int const summax=2*1007+7;
int const mod=30103;
int n, v[lmax],rez=0;
int aib[lmax][summax];
void update(int indX, int indY, int val)
{
    for(int x=indX;x<=n;x+=(x&-x))
    {
        for(int y=indY;y<summax;y+=(y&-y))
        {
            aib[x][y]=(aib[x][y]+val)%mod;
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
            sum=(sum+aib[x][y])%mod;
        }
    }
    return sum;
}

int main()
{
    fin>>n;
    for(int i=1;i<=n;i++)
    {
        fin>>v[i];
    }
    for(int i=n;i>=1;i--)
    {
        for(int j=n;j>=i+1;j--)
        {
            /* 1 2 3 4 5
            i=1 ; j=5
            consideram secventa cu capetele in i si j, posibilele secvente inauntrul lui (1,5) sunt (2,3),(2,4),(3,4) din care le alegem doar pe cele care au suma capetelor <=v[1]+v[5]-1
            cautam pe cele care se termina in j-1 (deci intervalul (1,j-1), dar nu va lua in considerare decat pe cele din (i+1,j-1) deoarece nu am updatat inca [0,i]
            marcam faptul ca avem query(...)+1 secvente care se termina in j si au suma cea mai mare egala cu v[i]+v[j] prin update
            */
            int x=(query(j-1,v[i]+v[j]-1)%mod+1)%mod;
            rez=(rez+x)%mod;
            update(j,v[i]+v[j],x);
        }
    }
    fout<<rez;
    fin.close();
    fout.close();
    return 0;
}`;
	document.getElementById("code_evantai_alt").textContent=`#include <bits/stdc++.h>
using namespace std;
ifstream fin ("evantai.in");
ofstream fout ("evantai.out");
int const lmax=707;
int const summax=2*1007+7;
int const mod=30103;
int n, v[lmax],rez=0;
int aib[lmax][summax];
void update(int indX, int indY, int val)
{
    for(int x=indX;x>0;x-=(x&-x))
    {
        for(int y=indY;y>0;y-=(y&-y))
        {
            aib[x][y]=(aib[x][y]+val)%mod;
        }
    }
}
int query(int indX, int indY)
{
    int sum=0;
    for(int x=indX;x<=n;x+=(-x&x))
    {
        for(int y=indY;y<summax;y+=(-y&y))
        {
            sum=(sum+aib[x][y])%mod;
        }
    }
    return sum;
}
int main()
{
    fin>>n;
    for(int i=1;i<=n;i++)
    {
        fin>>v[i];
    }
	for(int i=1;i<=n;i++)
    {
        for(int j=i+1;j<=n;j++)
        {
            int x=(query(j+1,v[i]+v[j]+1)%mod+1)%mod;
            rez=(rez+x)%mod;
            update(j,v[i]+v[j],x);
        }
    }
    fout<<rez;
    fin.close();
    fout.close();
    return 0;
}`;
	return;

}