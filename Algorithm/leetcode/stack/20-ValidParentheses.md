~~~java
class Solution {
     public boolean isValid(String s) {
        boolean answer = true;
        Stack<Character> stack = new Stack<>();

        for (char c : s.toCharArray()) {
            if (c == '(' || c == '[' || c == '{') {
                stack.push(c);
            } else if (!stack.empty()) {
                if ((c == ')' && stack.peek() == '(')
                        || (c == ']' && stack.peek() == '[')
                        || (c == '}' && stack.peek() == '{')) {
                    stack.pop();
                } else {
                    answer = false;
                    break;
                }
            } else {
                answer = false;
                break;
            }
        }

        if (!stack.empty()) {
            answer = false;
        }
        return answer;
    }
}
~~~