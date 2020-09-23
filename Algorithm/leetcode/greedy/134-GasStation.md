~~~java
class Solution {
    public int canCompleteCircuit(int[] gas, int[] cost) {
        int answer = -1;
        int n = gas.length;
        int start = 0;
        int gasSum = 0;
        int costSum = 0;
        int tank = 0;
        
        for (int i = 0; i < n; i++) {
            gasSum += gas[i];
            costSum += cost[i];
            tank += gas[i] - cost[i];

            if (tank < 0) {
                start = i + 1;
                tank = 0;
            }
        }

        if (gasSum >= costSum) {
            answer = start;
        }

        return answer;
    }
}
~~~