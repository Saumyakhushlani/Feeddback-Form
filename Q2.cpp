#include <bits/stdc++.h>
using namespace std;

class CircularQueue {
    int *arr;
    int front, rear, size, capacity;

public:
    CircularQueue(int k) {
        capacity = k;
        arr = new int[capacity];
        front = rear = -1;
        size = 0;
    }

    bool isEmpty() {
        return size == 0;
    }

    bool isFull() {
        return size == capacity;
    }

    bool enqueue(int x) {
        if (isFull()) {
            cout << "Queue is full\n";
            return false;
        }
        if (isEmpty()) {
            front = rear = 0;
        } else {
            rear = (rear + 1) % capacity;
        }
        arr[rear] = x;
        size++;
        return true;
    }

    int dequeue() {
        if (isEmpty()) {
            cout << "Queue is empty\n";
            return -1;
        }
        int result = arr[front];
        if (front == rear) { // only one element
            front = rear = -1;
        } else {
            front = (front + 1) % capacity;
        }
        size--;
        return result;
    }

    int Front() {
        return isEmpty() ? -1 : arr[front];
    }

    int Rear() {
        return isEmpty() ? -1 : arr[rear];
    }
};

int main() {
    CircularQueue q(3);
    q.enqueue(1);
    q.enqueue(2);
    q.enqueue(3);
    cout << q.dequeue() << endl; // 1
    q.enqueue(4);
    cout << q.Front() << endl;   // 2
    cout << q.Rear() << endl;    // 4
}
