~~~java
class Solution {
  public int solution(int[] A) {
    int count = 0;
    int tempValue = -1;
    int size = 0;
    int candidateValue = -1;
    int result = 0;
    for (int i = 0; i < A.length; i++) {
      if (size == 0) {
        tempValue = A[i];
        size++;
      } else if (tempValue != A[i]) {
        size--;
      } else {
        size++;
      }
    }

    if (size > 0) {
      candidateValue = tempValue;
    }

    for (int a : A) {
      if (candidateValue == a) {
        count++;
      }
    }

    int leftCount = 0;
    for (int i = 0; i < A.length; i++) {
      
      if (A[i] == candidateValue) {
        count--;
        leftCount++;
      }

      if ((i + 1) / 2 < leftCount && (A.length - (i + 1)) / 2 < count) {
        result++;
      }
    }

    return result;
  }
}
~~~