~~~java
Definition for a binary tree node.
public class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode() {}
    TreeNode(int val) { this.val = val; }
    TreeNode(int val, TreeNode left, TreeNode right) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

class Solution {
    private static List<List<Integer>> result;
    
    public List<List<Integer>> pathSum(TreeNode root, int sum) {
        result = new ArrayList<>();
        if(root == null) {
            return result;
        }
        dfs(root, new ArrayList<Integer>(), 0, sum);
        
        return result;
    }
    
    public static void dfs(TreeNode node, List<Integer> nums, int num, int sum) {
        nums.add(node.val);
        num += node.val;
        if (node.left == null && node.right == null) {
            if (num == sum) {
                List<Integer> temp = new ArrayList<>(nums);
                result.add(temp);
            }
        }
        if (node.left != null) {
            dfs(node.left, nums, num, sum);
            nums.remove(nums.size() - 1);
        }
        if (node.right != null) {
            dfs(node.right, nums, num, sum);
            nums.remove(nums.size() - 1);
        }
    }
}
~~~