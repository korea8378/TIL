~~~java
class Solution {
  public int solution(int A, int B, int K) {
    int result;
  
    int bQuotient = B / K;
    int aQuotient = A / K;
    int aRemainder = A % K;
  
    result = bQuotient - aQuotient;
  
    if(aRemainder == 0) {
        result++;
    }
  
    return result;
    }
}
~~~