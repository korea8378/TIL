~~~java
class Solution {
    public int solution(String S) {
      int result = 1;
      Stack<Character> stack = new Stack<>();
      char[] sArray = S.toCharArray();
      
      for(char c : sArray) {
        if(c == '(') {
          stack.push(c);
        } else if(c == ')') {
          if(stack.size() == 0) {
            result = 0;
            break;
          }
          stack.pop();
        }
      }
      
      if(stack.size() > 0) {
          result = 0;
      }
      
      return result;
  }
}
~~~