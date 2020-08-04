~~~java
  class Solution {
    public static int solution(int N) {
      int temp = N;
      int one = 1;
      int max = Integer.MIN_VALUE;
      int count = 0;
      boolean flag = false;
      do {
          if((temp & one) == 1) {
              if(max < count) {
                  max = count;
              }
              flag = true;
              count = 0;
          } else {
              if(flag) {
                  count++;
              }
          }
          temp = temp >> 1;
      } while(temp > 0);

      return max;
    }
  }
~~~