~~~java
class Solution {
    public int solution(int[] A) {
        Arrays.sort(A);

        int lastIndex = A.length - 1;
        int resultOne = A[lastIndex] * A[lastIndex - 1] * A[lastIndex - 2];
        int resultTwo = A[lastIndex] * A[0] * A[1];
        
        return Math.max(resultOne, resultTwo);
    }
}
~~~