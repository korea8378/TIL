~~~java
class Solution {
    public String removeKdigits(String num, int k) {
        Stack<Character> stack = new Stack<>();
        int size = num.length();
        if (size == k) {
            return "0";
        }
        int counter = 0;

        while (counter < size) {
            while (k > 0 && !stack.isEmpty() && stack.peek() > num.charAt(counter)) {
                stack.pop();
                k--;
            }
            stack.push(num.charAt(counter));
            counter++;
        }

        while (k > 0) {
            stack.pop();
            k--;
        }

        StringBuilder sb = new StringBuilder();
        while (!stack.isEmpty()) {
            sb.append(stack.pop());
        }
        sb.reverse();

        while (sb.length() > 1 && sb.charAt(0) == '0') {
            sb.deleteCharAt(0);
        }

        return sb.toString();
    }
}
~~~