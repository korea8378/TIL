~~~java
class Solution {
  public int solution(int[] A) {
    int localSlice = A[0];
    int globalSlice = A[0];
    
    for (int i = 1; i < A.length; i++) {
        localSlice = Math.max(localSlice + A[i], A[i]);
        globalSlice = Math.max(globalSlice, localSlice);
    }
    
    return globalSlice;
  }
}
~~~