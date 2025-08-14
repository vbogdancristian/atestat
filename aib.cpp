#include <bits/stdc++.h>
using namespace std;
ifstream fin ("aib.in");
ofstream fout ("aib.out");
int const lmax=1e5+7;
int const aib_size=lmax+7;///nu mai am *4
int aib[aib_size];
int v[aib_size];
int n,m;
void update(int ind, int val)
{
    for(int i=ind;i<=n;i+=(i&-i))
    {
        ///suntem in nodul i
        aib[i]+=val;
    }
    v[ind]+=val;
}
int query(int ind)
{
    int s=0;
    for(int i=ind;i>0;i-=(i&-i))
    {
        ///suntem in nodul i
        s+=aib[i];
    }
    return s;
}
int binsearch(int val)
{
    int ind=0, s=0;
    int p=log2(n);
    p=(1<<p);
    ///p e cea mai mare putere a lui 2 mai mica decat n
    ///codul are sens daca ai reprezentarea grafica a aibului, practic incep din radacina si tot cobor, adunand pe parcurs la suma
    for(int i=p;i>0;i>>=1)
    {
        if(ind+i<=n and aib[ind+i]+s<val)
        {
            s+=aib[ind+i];
            ind+=i;
        }
    }
    if(s+v[ind+1]==val)return ind+1;
    else return -1;

}
int main()
{
    fin>>n>>m;
    for(int i=1;i<=n;i++)
    {
        int x;
        fin>>x;
        update(i,x);
    }
    for(int i=0;i<m;i++)
    {
        int x,y;
        fin>>x>>y;
        if(x==0)
        {
            int z;
            fin>>z;
            update(y,z);
        }
        else if(x==1)
        {
            int z;
            fin>>z;
            fout<<query(z)-query(y-1)<<"\n";
        }
        else if(x==2)
        {
            fout<<binsearch(y)<<"\n";
        }
    }
    fin.close();
    fout.close();
    return 0;
}
