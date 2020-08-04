~~~java
class Solution {
  public int solution(int[] A) {
    int result = 0;
    Map<Integer, Integer> numberMap = new HashMap<>();

    for(int a : A) {
        if(numberMap.containsKey(a)) {
            numberMap.remove(a);
        } else {
            numberMap.put(a, a);
        }
    }

    Set<Integer> set = numberMap.keySet();

    for (Integer integer : set) {
        result = integer;
    }
    
    return result;
  }
}

~~~