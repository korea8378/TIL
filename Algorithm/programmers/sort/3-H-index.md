~~~java

class Solution {
    public int solution(int[] citations) {
        int anwer = citations.length;
        int lastIndex = citations.length - 1;

        Arrays.sort(citations);

        for(int i = 0; i < citations.length; i++) {
            if(!(citations[lastIndex - i] >= (i + 1))) {
                anwer = i;
                break;
            }
        }

        return anwer;
    }
}
~~~