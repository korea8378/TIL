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
    public int minDepth(TreeNode root) {
        if(root == null) {
            return 0;
        }
        return dfs(root, 1);
    }
    
    public int dfs(TreeNode node, int r) {
        if (node.left == null && node.right == null) {
            return r;
        }
        int min = Integer.MAX_VALUE;
        if (node.left != null) {
            min = Math.min(min, dfs(node.left, r + 1));
        }
        if (node.right != null) {
            min = Math.min(min, dfs(node.right, r + 1));
        }

        return min;
    }
}
~~~