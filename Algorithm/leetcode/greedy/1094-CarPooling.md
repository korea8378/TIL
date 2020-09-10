~~~java
class Solution {
    public boolean carPooling(int[][] trips, int capacity) {
        boolean answer = true;

        int count = 0;
        int time = 0;
        int to = 0;
        while (trips.length > count) {
            for (int[] trip : trips) {
                if (trip[1] == time) {
                    to += trip[0];
                    count++;
                }
                if (trip[2] == time) {
                    to -= trip[0];
                }
            }

            if (to > capacity) {
                answer = false;
                break;
            }
            time++;
        }

        return answer;
    }
}
~~~