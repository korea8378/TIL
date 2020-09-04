~~~java
class Solution {
    public List<List<Integer>> subsets(int[] nums) {
        List<List<Integer>> answer = new ArrayList<>();
        List<Integer> list;
        for (int i = 0; i != 1 << nums.length; i++) {
            list = new ArrayList<>();
            for (int j = 0; j != nums.length; j++) {
                if ((i & (1 << j)) != 0) {
                    list.add(nums[j]);
                }
            }
            answer.add(list);
        }

        return answer;
    }
}
~~~