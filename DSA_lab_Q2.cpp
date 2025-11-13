#include <iostream>
#include <vector>
using namespace std;

void heapify(vector<int>& arr, int n, int i) {
    int smallest = i;
    int left = 2*i + 1;
    int right = 2*i + 2;

    if(left < n && arr[left] < arr[smallest])
        smallest = left;
    if(right < n && arr[right] < arr[smallest])
        smallest = right;

    if(smallest != i) {
        swap(arr[i], arr[smallest]);
        heapify(arr, n, smallest);
    }
}

void buildMinHeap(vector<int>& arr, int n) {
    for(int i = n/2 - 1; i >= 0; i--)
        heapify(arr, n, i);
}

int main() {
    int n;
    cout << "Enter size of array: ";
    cin >> n;

    vector<int> arr(n);
    cout << "Enter elements: ";
    for(int i = 0; i < n; i++)
        cin >> arr[i];

    buildMinHeap(arr, n);

    cout << "Min Heap array: ";
    for(int i = 0; i < n; i++)
        cout << arr[i] << " ";
    return 0;
}
