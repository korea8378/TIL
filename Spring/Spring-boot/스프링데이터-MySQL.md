# SPRING-BOOT

## 11월 21일

### 스프링 데이터 - MySQL

#### DBCP
* DataBaseConnectionPool
* DB와 연결하는 커넥션을 미리 생성해두고 풀에 저장해두었다 필요할때 꺼내쓰고, 사용후에는 다시 풀에 반화하는 기법
* 커넥션을 미리 생성해두기 때문에 커넥션을 사용자가 DB를 사용할때마다 매번 생성을 하는 것보다 더 빠른 속도를 보장한다. 또한 커넥션의 최대 생성 갯수도 제어해주기 때문에 많은 사용자가 몰려도 과부하를 방지 가능하다.

#### 지원하는 DBCP
* HikariCP(스프링 기본)
  * https://github.com/brettwooldridge/HikariCP#frequently-used
* Tomcat CP
* Commons DBCP2

#### 많은 설정
* 미리 몇개를 만들 것이냐
* 얼마나 유지 할 것이냐
* 얼마나 동안 안 쓰이면 삭제할 것이냐
* 최소 몇개를 유지 할 것이냐
* ....

#### 설정 방법
* spring.datasource.DBCP명.설정 선택 = value

#### MySQL 설정
* mysql:mysql-connector-java 의존성 추가

#### application.properties
* spring.datasource.url=(useSSL=false : 특정버전이상에는 true를 권장하기때문에 warring이 뜰수도 있다. useSSL=false로 warring이 안뜬다.)
* spring.datasource.username=
* spring.datasource.password=




