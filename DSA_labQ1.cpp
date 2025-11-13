#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    vector<vector<int>> a(n, vector<int>(m));
    for (auto &row : a)
        for (int &x : row) cin >> x;

    if (a[0][0] || a[n-1][m-1]) {
        cout << "Path Length: -1\nSequence of movement: NIL";
        return 0;
    }

    vector<vector<int>> dist(n, vector<int>(m, -1));
    vector<vector<pair<int,int>>> par(n, vector<pair<int,int>>(m, {-1,-1}));
    queue<pair<int,int>> q;
    int dx[4] = {1,-1,0,0}, dy[4] = {0,0,1,-1};
    string dir[4] = {"down","up","right","left"};

    q.push({0,0});
    dist[0][0] = 0;

    while (!q.empty()) {
        auto [x, y] = q.front(); q.pop();
        for (int k = 0; k < 4; k++) {
            int nx = x + dx[k], ny = y + dy[k];
            if (nx>=0 && ny>=0 && nx<n && ny<m && !a[nx][ny] && dist[nx][ny]==-1) {
                dist[nx][ny] = dist[x][y] + 1;
                par[nx][ny] = {x, y};
                q.push({nx, ny});
            }
        }
    }

    if (dist[n-1][m-1] == -1) {
        cout << "Path Length: -1\nSequence of movement: NIL";
        return 0;
    }

    vector<string> path;
    for (int x=n-1, y=m-1; x || y; ) {
        auto [px, py] = par[x][y];
        if (px==x-1 && py==y) path.push_back("down");
        else if (px==x+1 && py==y) path.push_back("up");
        else if (px==x && py==y-1) path.push_back("right");
        else path.push_back("left");
        x = px; y = py;
    }
    reverse(path.begin(), path.end());

    cout << "Path Length: " << dist[n-1][m-1] << "\nSequence of movement: ";
    for (int i = 0; i < path.size(); i++)
        cout << path[i] << (i+1<path.size() ? "," : "");
}
