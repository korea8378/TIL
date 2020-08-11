```{.java}
import java.util.*;

class Solution {
    public int solution(int[] citations) {
        int answer = 0;
        List<Integer> citationList = new ArrayList<>();

        for(Integer temp : citations){
            citationList.add(temp);
        }
        
        Collections.sort(citationList);
        Collections.reverse(citationList);
        
        int size = citationList.size();
        for(int i = 0; i < size; i++) {
            if(citationList.get(i) <= i) {
                return i;
            }
        }
        return size;
    }
}
```