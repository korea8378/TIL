~~~java
class Solution {
  public int solution(int N) {
    int answer = 0;
    for(int i = 1; i < Math.sqrt(N); i++) {
      
      if(N % i == 0) {
          answer += 2;
      }
    }

    if(Math.sqrt(N) % 1 == 0) {
        answer++;
    }
    
    return answer;
  }
}
~~~