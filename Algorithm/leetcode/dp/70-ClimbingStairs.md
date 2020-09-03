~~~java
class Solution {
    public int climbStairs(int n) {
        int[] dp = new int[n + 1];
        return dfs(dp, n);
    }
    
    private int dfs(int[] dp, int n) {
        if (n == 0) {
            return 1;
        }

        if (n < 0) {
            return 0;
        }

        if (dp[n] == 0) {
            dp[n] = dfs(dp, n - 1) + dfs(dp, n - 2);
        }

        return dp[n];
    }
}
~~~