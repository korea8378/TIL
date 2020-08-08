~~~ java
class Solution {
  public int solution(int[] A) {
    if(A.length == 0) {
      return 0;
    }
    
    int min = A[0];
    int localValue = 0;
    int globalValue = 0;
    
    for (int i = 1; i < A.length; i++) {
      localValue = A[i] - min;
      
      if (min > A[i]) {
          min = A[i];
      }
      
      globalValue = Math.max(globalValue, localValue);
    }
    return globalValue;
  }
}
~~~