# SPRING-BOOT

## 11월 21일

### 스프링 데이터 - Redis

#### 캐시, 메시지 브로커, 키/벨류 스토어 등으로 사용 가능

#### 의존성 추가
* org.springframework.boot:spring-boot-starter-data-redis

#### Redis 설치 및 실행(도커)
* docker pull redis : 이미지 다운
* docker ps : 도커위에서 돌아가고 있는 컨테이너 확인
* docker run -p 6379:6379 -–name redis_boot -d redis : 레디스로 컨테이너 생성
* docker exec -i -t redis_boot redis-cli : 레디스 접속

#### 스프링 데이터 Redis
* https://projects.spring.io/spring-data-redis/
* StringRedisTemplate 또는 RedisTemplate
* extends CrudRepository

#### Redis 주요 커맨드
* https://redis.io/commands
* keys *
* get {key}
* hgetall {key}
* hget {key} {column}

#### Redis 설정
* spring.redis.*로 설정
* spring.redis.host
* spring.redis.url
* ....
* 기본적인 설정으로 localhost, 6379

#### Spring에서 매핑 및 사용법
* @RedisHash() : 객체와 redis 매핑
* CrudRepository : 기본적인 crud가 가능한 인터페이스