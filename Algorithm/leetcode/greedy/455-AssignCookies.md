~~~java
class Solution {
    public int findContentChildren(int[] g, int[] s) {
        Arrays.sort(g);
        Arrays.sort(s);

        int count = 0;
        for(int i = 0; count < g.length && i < s.length; i++) {
            if(g[count] <= s[i]) {
                count++;
            }
        }

        return count;
    }
}
~~~