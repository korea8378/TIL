~~~java
class Solution {
  public int solution(int[] A) {
    if(A.length == 0) {
      return 1;
    }

    int result = 0;
    Arrays.sort(A);

    if(A[A.length - 1] == A.length) {
      return  A.length + 1;
    }

    for(int i = 0; i < A.length; i++) {
      if(A[i] > i + 1) {
          result =  i + 1;
          break;
      }
    }
    
    return result;
  }
}
~~~