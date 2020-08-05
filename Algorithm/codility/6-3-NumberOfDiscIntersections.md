~~~java
class Solution {
  public int solution(int[] A) {
    int N = A.length;
    long[] lower = new long[N];
    long[] upper = new long[N];
    
    for (int i = 0; i < N; i++) {
      lower[i] = i - (long) A[i];
      upper[i] = i + (long) A[i];
    }
    
    Arrays.sort(lower);
    Arrays.sort(upper);
    
    int intersection = 0;
    int j = 0;
    
    for (int i = 0; i < N; i++) {
      while (j < N && upper[i] >= lower[j]) {
        intersection += j;
        intersection -= i;
        j++;
      }
    }
    
    if (intersection > 10000000) {
      return -1;
    }
    
    return intersection;
    }
}

~~~