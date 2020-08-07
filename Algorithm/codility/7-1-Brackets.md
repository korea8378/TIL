~~~java
class Solution {
  public int solution(String S) {
    int answer = 1;
    Stack<Character> stack = new Stack<>();
    char[] chars = S.toCharArray();
    boolean flag = true;
   
    for (char s : chars) {
      if (s == '{' || s == '[' || s == '(') {
        stack.push(s);
      } else {
          
        if (stack.size() == 0) {
            answer = 0;
            break;
        }
        
        char temp = stack.pop();
        
        switch (s) {
          case '}':
            if (temp != '{') {
                flag = false;
            }
            break;
          case ']':
            if (temp != '[') {
                flag = false;
            }
            break;
          case ')':
            if (temp != '(') {
                flag = false;
            }
            break;
        }

        if (!flag) {
          break;
        }
      }
    }

    if (stack.size() != 0 || !flag) {
        answer = 0;
    }
    
    return answer;
  }
}

~~~