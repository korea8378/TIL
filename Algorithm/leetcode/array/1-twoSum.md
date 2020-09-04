~~~java
class Solution {
    public int[] twoSum(int[] nums, int target) {
        int[] answer = new int[2];
        Map<Integer, Integer> map = new HashMap<>();
        
        for (int i = 0; i < nums.length; i++) {
            int key = target - nums[i];
            if (map.containsKey(key)) {
                answer[0] = map.get(key);
                answer[1] = i;
                break;
            }
            map.put(nums[i], i);
        }

        return answer;
    }
}
~~~