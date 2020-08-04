~~~java
class Solution {
  public int solution(int[] A) {
    int left = 0;
    int right = 0;
    for(int a : A) {
        right += a;
    
    int min = Integer.MAX_VALUE;
    int temp;

    for (int i = 0; i < A.length - 1 ; i++) {
        left += A[i];
        right -= A[i];
        temp = Math.abs(left - right);
        
        if (min > temp) {
            min = temp;
        }
    
    return min;
  } 
}
~~~