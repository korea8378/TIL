~~~java
class Solution {
  public int[] solution(int N, int[] P, int[] Q) {
    boolean[] prime = new boolean[N + 1];
    boolean[] semiprime = new boolean[N + 1];
    int[] semiprimeCount = new int[N + 1];
    int[] answer = new int[P.length];
    
    for (int i = 2; i * i <= N; i++) {
      for (int j = i * i; j <= N; j += i) {
        if (!prime[i]) {
          prime[j] = true;
          semiprime[j] = !prime[j / i];
        }
      }
    }
    
    int count = 0;
    for (int z = 0; z <= N; z++) {
      if (semiprime[z]) {
        count++;
      }
      semiprimeCount[z] = count;
    }
    
    for (int k = 0; k < P.length; k++) {
      answer[k] = semiprimeCount[Q[k]] - semiprimeCount[P[k] - 1];
    }

    return answer;
  }
}
~~~