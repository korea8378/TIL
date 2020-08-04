~~~java
class Solution {
  public int solution(int[] A) {
    int result = 0;
    Arrays.sort(A);

    for(int i = 0; i < A.length; i++) {
        if(A[i] != i + 1) {
            result = 1;
            break;
        }
    }
    
    return result;
  }
}
~~~