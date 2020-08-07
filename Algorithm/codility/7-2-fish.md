~~~java
class Solution {
  public int solution(int[] A, int[] B) {
    int answer;
    Stack<Integer> aStack = new Stack<>();
    Stack<Integer> bStack = new Stack<>();
    int fish;
    
    for (int i = 0; i < A.length; i++) {
      if (B[i] == 1) {
          bStack.push(A[i]);
      } else {
        
        if (bStack.size() == 0) {
            aStack.push(A[i]);
        } else {
          
          while (true) {
            fish = bStack.pop();
            
            if (fish > A[i]) {
                bStack.push(fish);
                break;
            } else {
            
                if (bStack.size() == 0) {
                    aStack.push(A[i]);
                    break;
                }
            }
          }
        }
      }
    }
    
    answer = aStack.size() + bStack.size();
    return answer;
  }
}

~~~