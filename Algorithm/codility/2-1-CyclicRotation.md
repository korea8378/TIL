~~~java
class Solution {
  public int[] solution(int[] A, int K) {
    int aLength = A.length;
    int[] result = new int[aLength]
    int index;
    
    for(int i = 0; i < aLength; i++) {
        index = (K + i) % aLength;
        result[index] = A[i];
    
    return result;
    }
}
~~~