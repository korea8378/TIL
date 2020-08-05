~~~java
class Solution {
  public int[] solution(String S, int[] P, int[] Q) {
    int[] result = new int[P.length];
    int[] A = new int[S.length() + 1];
    int[] C = new int[S.length() + 1];
    int[] G = new int[S.length() + 1];

    for (int i = 0; i < S.length(); i++) {
      switch (S.charAt(i)) {
        case 'A':
          A[i + 1]++;
          break;
        case 'C':
          C[i + 1]++;
          break;
        case 'G':
          G[i + 1]++;
          break;
        default:
          break;
      }
      A[i + 1] += A[i];
      C[i + 1] += C[i];
      G[i + 1] += G[i];
    }
    for (int j = 0; j < P.length; j++) {
      if (P[j] == Q[j]) {
        char c = S.charAt(P[j]);
        switch (c) {
          case 'A':
            result[j] = 1;
            break;
          case 'C':
            result[j] = 2;
            break;
          case 'G':
            result[j] = 3;
            break;
          case 'T':
            result[j] = 4;
            break;
        }
      } else if (A[P[j]] != A[Q[j + 1]]) {
          result[j] = 1;
      } else if (C[P[j]] != C[Q[j + 1]]) {
          result[j] = 2;
      } else if (G[P[j]] != G[Q[j + 1]]) {
          result[j] = 3;
      } else {
          result[j] = 4;
      }
    }
    return result;
  }
}
~~~