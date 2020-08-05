~~~java
class Solution {
    public int solution(int[] A) {
        int result = 0;
        
        if(A.length < 3) {
            return result;
        }
        
        Arrays.sort(A);

        for(int i = 0; i < A.length - 2; i++) {
            if( A[i] > A[i + 2] - A[i + 1]) {
                result = 1;
                break;
            }
        }
        
        return result;
    }
}
~~~