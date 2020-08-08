~~~java
class Solution {
  public int solution(int[] H) {
    Stack<Integer> stack = new Stack<>();

    int count = 0;
    for (int i = 0; i < H.length; i++) {
      while (!stack.isEmpty() && stack.peek() > H[i]) {
        stack.pop();
      }
      if (stack.isEmpty() || stack.peek() < H[i]) {
        stack.push(H[i]);
        count++;
      }
    }
  return count;
}
~~~
