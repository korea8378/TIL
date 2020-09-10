~~~java
class Solution {
    public List<List<Integer>> reconstructMatrix(int upper, int lower, int[] colsum) {
        int two = 0;
        int one = 0;
        for (int num : colsum) {
            if (num == 2) {
                two++;
            } else if (num == 1) {
                one++;
            }
        }
        
        if (upper > two + one || lower < two || upper + lower != two * 2 + one) {
            return new ArrayList<>();
        }
        
        List<List<Integer>> answer = new ArrayList<>();
        List<Integer> up = new ArrayList<>();
        List<Integer> down = new ArrayList<>();
        upper -= two;
        for (int num : colsum) {
            if (num == 2) {
                up.add(1);
                down.add(1);
            } else if (num == 1) {
                if (upper > 0) {
                    up.add(1);
                    down.add(0);
                    upper--;
                } else {
                    up.add(0);
                    down.add(1);
                }
            } else {
                up.add(0);
                down.add(0);
            }
        }
        
        answer.add(up);
        answer.add(down);
        return answer;
    }
}
~~~