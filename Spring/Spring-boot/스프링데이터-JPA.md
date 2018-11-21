# SPRING-BOOT

## 11월 21일

### 스프링 데이터 - JPA(ORM)

#### ORM
* Object-Relational-mapping
* 객체의 패러다임과 데이터 패러다임을 개발자가 맞추는것(매핑)이 아니라 개발자가 객체 패러다임으로만 개발 할 수 있게 해주는 프레임워크

#### JPA(JAVA persistence API)
* 자바진영의 ORM 표준 인터페이스

#### 스프링 데이터 JPA
* JPA를 스프링측에서 다시 한번 추상화
* Repository 빈 자동 생성
* 쿼리 메소드 자동 구현
* @EnableJpaRepositories(스프링 부트가 자동으로 설정 해줌.)
* SDJ -> JPA -> Hibernate -> Datasource

#### 스프링 데이터 JPA 의존성 추가
* org.springframework.boot:spring-boot-starter-data-jpa

#### 스프링 데이터 JPA 사용하기
* @Entity 클래스 만들기
* Repository 만들기

#### 스프링 데이터 레파지토리 테스트 만들기
* H2 DB를 테스트 의존성에 추가하기
* @DataJpaTest(슬라이스 테스터 작성)

#### Repostiory
* Optional로 반환 가능(NullPointerException/자바8)

#### TEST시
* Test는 빈 메소드를 만들어 테스트에 사용할 빈들이 제대로 주입이 되는 확인 가능하다.
* @DataJpaTest
  * 슬라이스 테스트 임베디드DB를 사용하게 된다.(H2)
* @SpringBootTest
  * 통합 테스트 프로젝트에 모든 빈들을 등록하게된다.
* 통합테스트를 사용하게되면 운영디비까지 건들수 있기때문에 테스트할때는 임베디드(H2)테스트용 디비를 설정해서 사용하자
