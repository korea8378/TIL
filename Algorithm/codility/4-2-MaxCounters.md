~~~java
class Solution {
  public int[] solution(int N, int[] A) {
    int[] result = new int[N];
    int max = 0;
    int plus = 0;
    int temp = 0, index;
    
    for(int a : A){
      if(a == N + 1) {
        plus = max;
      } else {
        index = a - 1;
        temp = result[index];
        
        if(temp < plus) {
          temp = plus + 1;
        } else {
          temp += 1;
        
        }
        result[index] = temp;
      }
      
      if(max < temp) {
          max = temp;
      }
    }

    for(int i = 0; i < result.length; i++) {
      if(result[i] < plus) {
        result[i] = plus;
      }
    }
    
    return result;
  }
}
~~~