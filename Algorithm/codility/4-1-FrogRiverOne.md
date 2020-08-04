~~~java
class Solution {
    public int solution(int X, int[] A) {
        int result = -1;

        Set<Integer> set = new HashSet<>();

        for(int i = 0; i < A.length; i++) {
             
            set.add(A[i]);
            
            if(set.size() == X) {
                result = i;
                break;
            }
        }

        return result;
    }
}

~~~