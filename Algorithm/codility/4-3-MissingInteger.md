~~~java
class Solution {
  public static int solution(int[] A) {
    int result = 0;
    Arrays.sort(A);
    if(A[0] > 1 || A[A.length - 1] < 0) {
        result = 1;
    } else {
        for (int i = 1; i < A.length; i++) {
            if (A[i - 1] < 1 && A[i] > 1) {
                result = 1;
                break;
            }
            if (A[i] == A[i - 1]) {
                continue;
            }
            if (A[i] != A[i - 1] + 1) {
                result = A[i - 1] + 1;
            }
            if (result > 0) {
                break;
            }
        }
    }
    if(result == 0) {
        result = A[A.length - 1] + 1;
    }
    return result;
  }
~~~