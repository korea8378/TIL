~~~java
class Solution {
  public  int solution(int[] A) {
    int[] lefMaxes = new int[A.length];
    int[] rightMaxes = new int[A.length];
    int answer = 0;
    int temp;
    
    if (A.length == 3) {
        return 0;
    }

    for (int i = 1; i < A.length - 1; i++) {
        lefMaxes[i] = Math.max(0, lefMaxes[i - 1] + A[i]);
    }

    for (int j = A.length - 2; j > 1; j--) {
        rightMaxes[j] = Math.max(0, rightMaxes[j + 1] + A[j]);
    }

    for (int y = 1; y < A.length - 1; y++) {
      temp = lefMaxes[y - 1] + rightMaxes[y + 1];
      if (answer < temp) {
          answer = temp;
      }
    }
    return answer;
  }
}
~~~