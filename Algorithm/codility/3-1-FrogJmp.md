~~~java
class Solution {
  public int solution(int X, int Y, int D) {
      int result = 0;

      double temp = (Y - X) / (double)D;
      result = (int) Math.ceil(temp);
      
      return result;
  }
}
~~~