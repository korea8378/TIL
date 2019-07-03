# JPA

## 07월 02일

### Spring Data

#### 스프링 데이터
- SQL & NoSQL 저장소 지원 프로젝트의 묶음
#### 스프링 데이터 Commom
- 여러 저장소 프로젝트의 공통 기능 제공
#### 스프링 데이터 REST
- 저장소의 데이터를 하이퍼미디어 기반 HTTP 리소스로 제공하는 프로젝트
#### 스프링 데이터 JPA
- 스프링 데이터 Common이 제공하는 기능에 JPA 관련 기능 추가

#### Repository
- Repository <- CrudRepository <- PagingAndSortingRepository <- JpaRepository

#### Repository 인터페이스 직접 정의하기
- @RepositoryDefinition
- @NoRepositoryBean

#### Null 처리
- 단일처리
    - 자바 8부터 지원하는 Optional을 이용
- 컬렉션(리스트) 처리
    - Null이 반환되지 않고 비어있는 리스트로 반환
    - 컬렉션은 null 체크하지마라
- 스프링 5.0부터 지원하는 Null 애노테이션 지원
    - @NonNullApi, @NonNull, @Nullable

#### 쿼리 만들기
- 메소드 이름을 분석해서 쿼리 만들기
- 미리 정의해 둔 쿼리 찾아 사용하기
    - @Query
- 미리 정의한 쿼리 찾아보고 없으면 만들기

#### 메서드 쿼리 만들기
- 리턴타입 {접두어}{도입부}by{프로퍼티 표현식}{조건식}[{And|Or}{프로퍼티 표현식}{조건식}]{정렬조건}(매개변수)

#### 비동기 쿼리
- @Async
- @EableAsync
- 테스트 코드 작성이 어려워진다.
- Future
    - 논블러킹 하게 쓸수 있게 해준다.
- CompletableFutre
- ListenableFutre
- 비추천
- JDBC에서는 아직까지 비동기 처리하는 RDBMS가 없다

#### 커스텀 리파지토리
- 스프링 데이터 리포지토리 인터페이스에 기능 추가
- 스프링 데이터 리포지토리 기본 기능 덮어쓰기 가능
- delete 메서드
    - 엔티티 merge후 remove상태로 만들어준다.
    - remove상태란? 바로 디비로 delete 쿼리를 날리지 않고 casecade같이 전파가 필요한지 먼저 체크하고 영속성컨텐스트에서 삭제한다.

#### 기본 커스텀 리포지토리(공통적으로 추가시)
- JpaRepository를 상속 받는 인터페이스 정의
    - @NoRepositoryBean
- 기본 구현체를 상속 받는 커스텀 구현체 만들기
- @EnableJpaRepositories에 설정
    - repositoryBaseClass

#### 도메인 이벤트
- ApplicationContext extends ApplicationEventPublisher
- 도메인이 변경 감지하여 이벤트를 발생 시키는 기능을 만들 수 있다.
- applicationContext.publishEvent();
- 리스너
    - Implements ApplicationListener<E extends ApplicationEvent>
    - @EventListener
- 스프링 데이터의 도메인 이벤트 Publisher
    - @DomainEvents
    - @AfterDomainEventPublication
    - extends AbstractAggregationRoot<E>
- 이벤트 송신자, 이벤트 수신자, 이벤트

#### QueryDSL
- 기존의 메소드 형식은 조건이 길어 질수록 쿼리문 파악하기가 힘들어진다.
    - findBy~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
- 쿼리문을 자바코드 같이 표현 할 수 있게 해준다.
- 타입 세이프한 쿼리 만들 수 있게 도와주는 라이브러리
- JPA, SQL, MongoDB, JDO, Lucene, Collection 지원
- http://www.querydsl.com/static/querydsl/4.1.3/reference/html_single/#jpa_integration

#### 웹 지원 기능
- 도메인 클래스 컨버터(Domain Class Coverter)
    - toEntityConverter
    - toIdConverter
- RequestHandler 메서드에 pageable, sort 매개변수로 받을 수 있다.
- Page관련 HATEOAS 기능 제공
    - PagedResource
- 쿼리스트링을 predicate로 받을 수 있다.