~~~java
class Solution {
  public int solution(int[] A) {
      int count = 0;
      int tempIndex = -1;
      int tempValue = -1;
      int size = 0;
      int candidate = -1;
      int candidateValue = -1;
      int result = -1;
      
      for (int i = 0; i < A.length; i++) {

        if (size == 0) {
          tempIndex = i;
          tempValue = A[i];
          size++;
        } else if (tempValue != A[i]) {
          size--;
        } else {
          size++;
        }
      }

      if (size > 0) {
        candidate = tempIndex;
        candidateValue = tempValue;
      }

      for (int a : A) {
        if (candidateValue == a) {
          count++;
        }
      }

      if ((A.length / 2) < count) {
        result = candidate;
      }
      
      return result;
    }
}
~~~