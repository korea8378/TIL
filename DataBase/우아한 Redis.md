# DataBase

## 11월 21일

### 우아한 Redis

#### Redis

#### Redis 소개
- In-memory
- Open source
- Data structures
#### Cache
- 미리 저장했다가 빠르게 제공하기 위해서
- Factorial - DP
- 접근 속도
#### 사용하는 곳
- 추상적인 웹서비스 구조 - Client -> WebServer -> DB
- Look aside Cache - 가장 많이 사용되는 패턴
- Write Back - log 일괄 처리시 대량의 데이터를 insert쿼리를 날리기 보다는 한번에 모아서 insert쿼리를 쓰는게 더 효율적인다.
#### 개발의 편의성
- 랭킹 서비스 - redis를 Sorted를 이용하여 정렬
#### 개발의 난이도
- 동시에 발생하는 트랜잭션 처리에 대하여 atomic하기 때문에 쉽게 구현할 수 있다.
- collection이 중요
#### 어디에 써야 하나요
- Remote Data Store
- 한대에서만 필요한다면 - 싱글 스레드
- 주로 많이 쓰는 곳
  - 인증 토큰 등을 저장
  - Ranking 보드로 사용
  - 유저 API Limit
  - 잡 큐
#### Redis Collections
- Key/value
  - Key을 어떠한 값으로 쓸지 고민해서 사용하자
- List
  - 중간 데이터 삽입시 느림
- Set
  - 중복 데이터 담지 말아야한다.
- Sorted Set
  - 순서를 보장하여 랭킹을 만들 수 있다.
  - Score는 실수형이라서 사용시 주의하자
- Hash
#### Redis Collections 주의 사항
- 하나의 컬렉션에 너무 많은 아이템을 담으면 좋지 않음
  - 10000개 이하
- expire라는 기능을 collection 일부분만 걸 수 있다.
#### Redis 운영
- 메모리 관리를 잘하자
  - In-Memory라서 메모리 관리를 잘해야한다.
  - swap이 있다면 swap 사용으로 해당 메모리 page 접근시 마다 늦어짐
  - Maxmemory를 설정하더라도 이보다 더 사용할 가능성이 큼
  - 메모리 파편화 - 페이징 기능 때문에
  - 모니터링이 필요하다
  - 작은 단위의 메모리를 사용하는 여러대의 instance를 사용하자.
  - 다양한 사이즈를 가지는 데이터 보다는 유사한 사이즈를 가진 데이터를 사용하자
  - Collection(Hash, Sorted set, set)사용시 더 많은 메모리를 사용하기 때문에 내부적으로 ZipList를 사용하여 메모리 사용량을 줄일 수 있다.
- O(N) 관련 명령어는 주의하자.
  - Redis는 Single Threaded
    - 동시에 하나만 처리
    - 간단한 get/set의 경우, 초당 10만 TPS 이상
    - packet으로 하나의 command가 완성되어 처리하는 방식
    - 단 하나가 오래걸리면 뒤에 요청들이 그만큼 밀린다. 긴 명령어를 사용하지 말자
  - 대표적인 O(N) 명령들
    - KEYS
      - Scan 명령을 사용하는 것으로 대체 할 수 있다.
      - 여러개의 짧은 명령어를 이용 하는 식으로 해결
    - FLUSH
    - DELETE Collections(몇만개의 데이터가 쌓여 있으면)
    - Get ALL Collections(십만개의 데이터가 쌓여 있을때)
    - Spring Security oath Redis TokenStore issue
- Redis Replication
  - Async Replication
  - master에는 적용되어있지만 slave에는 적용이 안될 수도 있다.(갱신 시간이 짧더라도 발생 할 수 있다.)
  - Master, slave를 구성시 master는 자신의 데이터를 fork하여 slave에게 통보한다.
  - AWS나 클라우드의 Reids는 좀 다르게 구현 되어 있지만 느릴수 있다.
  - 많은 대수의 Redis 서버가 Replica를 두고 있다면 한번에 처리하면 네트워크가 마비 될 수 있다. 한대씩 분할 처리를 하거나 동시에는 모든 Replica를 처리하지 말자
- Redis.conf 권장 설정
  - MaxClient 설정 50000
  - RDB/AOF 설정 off
  - 특정 commands disable
    - Keys
    - AWS는 이미 하고 있음
  - 전체 장애의 90% 이상이 Keys나 save에서 발생
#### Redis 분산 방법
- Application
  - Modular
    - 서버 추가/다운시 데이터를 재배치 해야하기 때문에 비효율적이다.
  - Consistent Hashing
    - Hash 값을 만들고 기준(hash값 기준으로 큰값으로)을 정하여 서버에 할당
    - 자기보다 큰 값을 기준으로 이동
    - 자기보다 큰 값이 없으면 제일 작은 값을 가진 서버로
  - Shading
    - 데이터를 어떻게 나눌 것인가?
    - 데이터를 어떻게 찾을 것인가?
    - 상황마다 샤딩 전략이 달라짐
      - Range
        - 서버의 상황에 따라 극심한 불균형이 생김
        - 데이터 이동이 번거로움
        - 확장은 쉽다.
      - Modular
        - 서버 확장시 2의 배수로 확장을 하면 데이터이동이 규칙적으로 옮겨진다.
        - 2의 배수 확장시 그만큼 점차 서버 대수가 극심하게 늘어남
      - Indexed
        - index를 가지고 있는 서버가 죽으면 서비스 불가
        - 데이터를 저장하고 있는 서버들을 효율적으로 데이터를 분할 할 수 있다.
- Redis Cluster
  - Hash 기반으로 slot 16384로 구분
  - primary와 secondary
    - Primary가 죽으면 secondary를 primary로 승격
  - 라이브러리가 다른 hash값을 가진 서버에게 요청하면 그 서버는 다른 서버로 가라고 메시지를 내려준다.
  - 장점
    - 자체적인 primary, secondary
    - Slot 단위의 데이터 관리
  - 단점
    - 메모리 사용량이 더 많음
    - Migration 자체는 관리자가 시점을 결정해야 함
    - Library 구현이 필요함
#### Redis FailOver
- Coordinator 기반
- VIP 기반
  - Health Checker로 기존의 서버가 죽으면 다른 서버에 VIP를 할당
- VIP/DNS 기반 
  - 클라이언트에 추가적인 구현이 필요없다.
  - VIP 기반은 외부로 서비스를 제공해야 하는 서비스 업자에 유리
#### Monitoring Factor
- Redis Info를 통한 정보
  - RSS
  - Used memory
  - Connection - 싱글쓰레드이기 때문에 커넥션을 계속 생성/삭제는 좋지 않다.
  - 초당 처리 요청 수
- System
  - CPU
  - Disk
  - Network rx/tx
- CPU가 100%를 칠 경우
  - 성능이 좋은 CPU로
  - O(N) 계절의 특정 명령이 많은 경우
    - Monitor 명령을 통해 확인 가능
#### Redis as Cache
  - Cache일 경우 문제가 적게 발생
#### Redis as Persistent Store
- primary/secondary 구조로 구성이 필요함
- 메모리를 절대로 빡빡하게 사용하면 안됨
  - 정기적인 migration이 필요
  - 가능하면 자동화 툴을 만들어서 사용
- RDB/AOF가 필요하다면 Secondary에서만 구동
