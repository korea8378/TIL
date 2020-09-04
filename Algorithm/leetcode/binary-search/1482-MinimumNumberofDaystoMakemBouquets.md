~~~java
class Solution {
    public int minDays(int[] bloomDay, int m, int k) {
        int max = Integer.MIN_VALUE;
        int answer = -1;

        for (int day : bloomDay) {
            max = Math.max(day, max);
        }

        int left = 1;
        int right = max;

        while (left <= right) {
            int mid = (left + right) / 2;
            if (isPossible(bloomDay, mid, m, k)) {
                answer = mid;
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }
        return answer;
    }
    
    private boolean isPossible(int[] bloomDay, long mid, int m, int k) {
        int count = 0;

        for (int day : bloomDay) {
            if (mid >= day) {
                count++;
                if (count == k) {
                    count = 0;
                    m--;
                }
            } else {
                count = 0;
            }
        }

        return m <= 0;
    }
}
~~~