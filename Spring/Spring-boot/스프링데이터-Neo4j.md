# SPRING-BOOT

## 11월 21일

### 스프링 데이터 - Neo4j

####Neo4j
*노드들과 연관관계를 표현하는데 있어서 풍부한 기능을 제공
*그래프 디비
*친구의 친구의 친구들 찾기
*친구의 친구의 글들 찾아오기
*....

#### 주의
* 버전하위호환성이 좋지 않다
* 호환을 체크하자

#### 의존성 추가
* org.springframework.boot:spring-boot-starter-data-neo4j

#### 포트 매핑을 두번
* http용 포트
* bolt용 포트

#### Redis 설치 및 실행(도커)
* docker pull neo4j : 이미지 다운
* docker ps : 도커위에서 돌아가고 있는 컨테이너 확인
* docker run -p 7474:7474 -p 7687:7687 -d --name noe4j_boot neo4j
* http://localhost:7474/browser : 브라우저로 접속

####Neo4j 설정
* spring.data.neo4j.password
* spring.data.neo4j.username

#### 스프링 데이터 Neo4J
* Neo4jTemplate (Deprecated)
* SessionFactory
* Neo4jRepository

#### Spring에서 매핑 및 사용법
* @NodeEntity : 객체와 Neo4j 매핑
* Neo4jRepository : CRUD가 가능한 인터페이스
