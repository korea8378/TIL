~~~java
class Solution {
    public int countSquares(int[][] matrix) {
        int answer = 0;
        for (int i = 0; i < matrix.length; i++) {
            for (int j = 0; j < matrix[i].length; j++) {
                if (i == 0 || j == 0) {
                    answer += matrix[i][j];
                } else if (matrix[i][j] == 1) {
                    matrix[i][j] = Math.min(matrix[i - 1][j], Math.min(matrix[i][j - 1], matrix[i - 1][j - 1])) + 1;
                    answer += matrix[i][j];
                }
            }
        }
        return answer;
    }
}
~~~