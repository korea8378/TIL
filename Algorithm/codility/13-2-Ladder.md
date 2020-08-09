~~~java
class Solution {
  public int[] solution(int[] A, int[] B) {
    int aMax = 0;
    
    for(int a : A) {
        if(aMax < a) {
            aMax = a;
        }
    }
    
    int max = (int) Math.pow(2, 30);
    int[] fibo = new int[aMax + 1];
    fibo[0] = 1;
    fibo[1] = 1;
    
    for (int i = 2; i < aMax + 1; i++) {
        fibo[i] = (fibo[i - 2] + fibo[i - 1]) % max;
    }
    
    int[] result = new int[A.length];
    
    for (int j = 0; j < A.length; j++) {
        result[j] = fibo[A[j]] % (int) Math.pow(2, B[j]);
    }
    
    return result;
  }
}
~~~