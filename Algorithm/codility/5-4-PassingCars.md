~~~java
class Solution {
    public int solution(int[] A) {
        int result = 0;
        int number = 0;
        
        for(int a : A) {
            if(a == 0) {
                number++;
            } else {
                result = result + number;
            }

            if(result > 1000000000) {
                result = -1;
                break;
            }
        }
        
        return result;
    }
}
~~~