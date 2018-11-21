# SPRING-BOOT

## 11월 21일

### 스프링 데이터 - MongoDB

#### MongoDB
* json기반의 데이터베이스
* 스키마가 없다

####의존성 추가
org.springframework.boot:spring-boot-starter-data-mongodb

#### Redis 설치 및 실행(도커)
* docker pull mongo : 이미지 다운
* docker ps : 도커위에서 돌아가고 있는 컨테이너 확인
* docker run -p 27017:27017 --name mongo_boot -d mongo
* docker exec -i -t mongo_boot bash
* mongo

#### 데이터 몽고DB
* MongoTemplate
* MongoRepository
* 내장형 MongoDB (테스트용)
  * de.flapdoodle.embed:de.flapdoodle.embed.mongo
* @DataMongoTest : 슬라이스 test

#### 몽고DB 설정
* spring.data.mongodb.*로 설정
* spring.data.mongodb.url
* ....
* 기본적인 설정으로 localhost, 27017

#### Spring에서 매핑 및 사용법
* @Document(collection = "") : 객체와 몽고DB 매핑
* MongoRepository : CRUD가 가능한 인터페이스
