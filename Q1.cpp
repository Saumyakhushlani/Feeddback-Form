#include <iostream>
#include <stack>
using namespace std;

// Function to check if brackets are balanced
bool areParenthesesBalanced(string expr) {
    stack<char> s;

    for (char ch : expr) {
        // If opening bracket, push to stack
        if (ch == '(' || ch == '{' || ch == '[') {
            s.push(ch);
        }
        // If closing bracket, check stack top
        else if (ch == ')' || ch == '}' || ch == ']') {
            if (s.empty()) return false; // no matching open

            char top = s.top();
            s.pop();

            // Check correct matching
            if ((ch == ')' && top != '(') ||
                (ch == '}' && top != '{') ||
                (ch == ']' && top != '[')) {
                return false;
            }
        }
    }

    // If stack is empty, all matched
    return s.empty();
}

int main() {
    string expr;
    cout << "Enter an expression: ";
    cin >> expr;

    if (areParenthesesBalanced(expr))
        cout << "Balanced ✅" << endl;
    else
        cout << "Not Balanced ❌" << endl;

    return 0;
}
