~~~java
class Solution {
    public int pivotIndex(int[] nums) {
        int answer = -1;

        if (nums.length < 3) {
            return answer;
        }

        int leftSum = 0, rightSum = 0;
        for (int j = nums.length - 1; j >= 0; j--) {
            rightSum += nums[j];
        }

        for (int i = 0; i < nums.length; i++) {
            if (i > 0) {
                leftSum += nums[i - 1];
            }
            rightSum -= nums[i];
            if (leftSum == rightSum) {
                answer = i;
                break;
            }
        }

        return answer;
    }
}
~~~