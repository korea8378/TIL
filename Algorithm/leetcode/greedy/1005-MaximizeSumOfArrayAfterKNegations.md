~~~java
class Solution {
    public int largestSumAfterKNegations(int[] A, int K) {
        Arrays.sort(A);
        int sum = 0;

        for (int i = 0; i < A.length; i++) {

            while (A[i] < 0 && K > 0) {
                A[i] = -A[i];
                K--;
                i++;
            }

            if(K % 2 == 0) {
                K = 0;
            } else {
                K = 1;
            }
            
            if (K > 0) {
                if (i > 0 && A[i] > A[i - 1])
                    A[i - 1] = -A[i - 1];
                else
                    A[i] = -A[i];
            }
            break;
        }
        for (int num : A) {
            sum += num;
        }
        return sum;
    }
}
~~~