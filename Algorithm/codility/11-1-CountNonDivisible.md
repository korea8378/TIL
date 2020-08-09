~~~java
class Solution {
  public int[] solution(int[] A) {
    int sieve[] = new int[A.length * 2 + 1];
    int count[] = new int[A.length];
    int answer[] = new int[A.length];
    
    for (int a : A) {
      sieve[a]++;
    }
    
    for (int i = 0; i < A.length; i++) {
      for (int j = 1; j <= Math.sqrt(A[i]); j++) {
        
        if (A[i] % j == 0) {
          count[i] += sieve[j];
          
          if ((A[i] / j) != j) {
              count[i] += sieve[A[i] / j];
          }
        }
      
      }
      answer[i] = A.length - count[i];
    }
    
    return answer;
  }
}
~~~