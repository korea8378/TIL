~~~java
class Solution {
  public int solution(int[] A) {
    Set<Integer> set = new HashSet<>();
    
    for (int a : A) {
        set.add(a);
    }
    
    int result = set.size();
    
    return result;
  }
}
~~~