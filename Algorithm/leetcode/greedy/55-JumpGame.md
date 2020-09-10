~~~java
class Solution {
    public boolean canJump(int[] nums) {
        int k=1;
        for(int i = nums.length - 2; i >= 0; i--){
            if(nums[i] < k){
                k++;
            } else {
                k = 1;
            }
        }
        
        if(k == 1) {
            return true;
        } else {
            return false;
        }
    }
}
~~~