~~~java
class Solution {
    
    private static char[][] word = {{'a', 'b', 'c'}, {'d', 'e', 'f'}, {'g', 'h', 'i'}, {'j', 'k', 'l'}, {'m', 'n', 'o'}, {'p', 'q', 'r', 's'}, {'t', 'u', 'v'}, {'w', 'x', 'y', 'z'}};
    
    public List<String> letterCombinations(String digits) {
        if(digits.length() == 0) {
            return new ArrayList<>();
        }
        return dfs(new ArrayList<>(), digits, new StringBuilder(), digits.length(), 0);
    }
    
    public List<String> dfs(List<String> answer, String digits, StringBuilder sb, int r, int h) {
        if (r == h) {
            answer.add(sb.toString());
            return answer;
        } else {
            int num = digits.charAt(h) - '0';
            for (int i = 0; i < word[num - 2].length; i++) {
                sb.append(word[num - 2][i]);
                dfs(answer, digits, sb, r, h + 1);
                sb.setLength(sb.length() - 1);
            }
        }
        return answer;
    }
}
~~~