~~~java
class Solution {
  public int solution(int N) {
    int answer;
    int min = Integer.MAX_VALUE;
    
    for (int i = 1; i <= Math.sqrt(N); i++) {
    
      if (N % i == 0) {
    
        if (min > ((N / i) + i)) {
          min = (N / i) + i;
        }
      }
    }
    
    answer = min * 2;
    return answer;
  }
}

~~~