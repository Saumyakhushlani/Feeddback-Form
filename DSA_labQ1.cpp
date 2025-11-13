#include <iostream>
#include <queue>
#include <algorithm>
#include <vector>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    vector<vector<int>> a(n, vector<int>(m));
    for(int i=0;i<n;i++)
        for(int j=0;j<m;j++)
            cin >> a[i][j];

    if(a[0][0]==1 || a[n-1][m-1]==1){
        cout<<"Path Length: -1\nSequence of movement: NIL";
        return 0;
    }

    queue<pair<int,int>> q;
    vector<vector<int>> d(n, vector<int>(m,-1));
    vector<vector<pair<int,int>>> p(n, vector<pair<int,int>>(m,{-1,-1}));
    int dx[4]={1,-1,0,0};
    int dy[4]={0,0,1,-1};
    string dir[4]={"down","up","right","left"};

    q.push({0,0});
    d[0][0]=0;

    while(!q.empty()){
        auto [x,y]=q.front(); q.pop();
        for(int k=0;k<4;k++){
            int nx=x+dx[k], ny=y+dy[k];
            if(nx>=0&&ny>=0&&nx<n&&ny<m&&a[nx][ny]==0&&d[nx][ny]==-1){
                d[nx][ny]=d[x][y]+1;
                p[nx][ny]={x,y};
                q.push({nx,ny});
            }
        }
    }

    if(d[n-1][m-1]==-1){
        cout<<"Path Length: -1\nSequence of movement: NIL";
        return 0;
    }

    vector<string> path;
    int x=n-1, y=m-1;
    while(!(x==0&&y==0)){
        auto [px,py]=p[x][y];
        if(px==x-1&&py==y) path.push_back("down");
        else if(px==x+1&&py==y) path.push_back("up");
        else if(px==x&&py==y-1) path.push_back("right");
        else if(px==x&&py==y+1) path.push_back("left");
        x=px; y=py;
    }
    reverse(path.begin(), path.end());

    cout<<"Path Length: "<<d[n-1][m-1]<<"\nSequence of movement: ";
    for(int i=0;i<path.size();i++){
        cout<<path[i];
        if(i!=path.size()-1) cout<<",";
    }
}
