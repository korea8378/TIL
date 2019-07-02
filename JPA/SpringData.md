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
