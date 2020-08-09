~~~java
class Solution {
    public int solution(int[] A) {
        int N = A.length;
        if(N == 0) {
            return 1;
        }
        List<Integer> fibo = new ArrayList<>();
        fibo.add(1); fibo.add(1);

        int idx = 2;
        do {
            int f = fibo.get(idx-1) + fibo.get(idx-2);
            fibo.add(f);
            idx++;
        } while(fibo.get(idx-1) <= N + 1);

        Collections.reverse(fibo);

        Queue<Pair> q = new LinkedList<>();
        boolean[] chk = new boolean[N+1];
        q.add(new Pair(-1, 0));

        while(!q.isEmpty()) {
            Pair current = q.poll();

            for(int f : fibo) {
                int next = current.x + f;

                if(next == N) {
                    return current.y + 1;
                } else if(next < N && next >= 0) {
                    if(A[next] == 1 && !chk[next] ) {
                        chk[next] = true;
                        q.add(new Pair(next, current.y + 1));
                    }
                }
            }
        }

        return -1;
    }
    
    class Pair {
        int x, y;

        public Pair(int x, int y) {
            this.x = x;
            this.y = y;
        }
    }

}
~~~