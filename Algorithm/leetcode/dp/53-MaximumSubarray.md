~~~java
class Solution {
    public int maxSubArray(int[] nums) {
        int globalMax = Integer.MIN_VALUE;
        int localMax = 0;
        
        for (int num : nums) {
            localMax = Math.max(localMax + num, num);
            globalMax = Math.max(globalMax, localMax);
        }

        return globalMax;
    }
}
~~~