# JPA

## 07월 04일

### Spring Data JPA

#### JPA Repository
- @EnableJpaRepository
    - 스프링부트의 자동설정으로 들어가 있다.
    - Repository의 구현체를 만들어준다. 
- @Repository
    - SQLException 또는 JPA 관련 예외를 스프링의 DataAccessException으로 변환 해준다.

#### JpaRepository의 save()
- 단순히 새 엔티티를 추가하는 메소드가 아니다.
- Transient 상태의 객체라면 EntityManager.persist()
- Detached 상태의 객체라면 EntityManager.merge() 
Transient인지 Detached 인지 어떻게 판단?
- 엔티티의 @Id 프로퍼티를 찾는다. 해당 프로퍼티가 null이면 Transient 상태로 판단하고 id가 null이 아니면 Detached 상태로 판단한다.
- 엔티티가 Persistable 인터페이스를 구현하고 있다면 isNew() 메소드에 위임한다.
- JpaRepositoryFactory를 상속받는 클래스를 만들고 getEntityInfomration()을 오버라이딩해서 자신이 원하는 판단 로직을 구현할 수도 있다.
- Persist() 
    - 메소드에 넘긴 그 엔티티 객체를 Persistent 상태로 변경한다.
- Merge()
    - 메소드에 넘긴 그 엔티티의 복사본을 만들고, 그 복사본을 다시 Persistent 상태로 변경하고 그 복사본을 반환한다.

#### JPA 쿼리 메소드
- 엔티티에 정의한 쿼리 찾아 사용하기 JPA Named 쿼리
    - @NamedQuery
    - @NamedNativeQuery
- 리포지토리 메소드에 정의한 쿼리 사용하기
    - @Query
    - @Query(nativeQuery=true)

#### JPA Sort
- Order by 절에서 함수를 호출하는 경우에는 Sort를 사용하지 못 한다. 
- 그 경우에는 JpaSort.unsafe()를 사용 해야 한다.

#### Named Parameter & SpEL
```{.java}
    //Named Parameter 
    @Query("SELECT p FROM Post AS p WHERE p.title = :title")
    List<Post> findByTitle(@Param("title") String title, Sort sort);

    //SpEL
    @Query("SELECT p FROM #{#entityName} AS p WHERE p.title = :title")
    List<Post> findByTitle(@Param("title") String title, Sort sort);
```

#### Update 쿼리
- @Modifying @Query
- 추천 X
```{.java}
    @Modifying(clearAutomatically = true, flushAutomatically = true)
    @Query("UPDATE Post p SET p.title = ?2 WHERE p.id = ?1")
    int updateTitle(Long id, String title);
```

#### Entity Graph
- Fetch 모드를 좀더 유연하게 설정 할 수 있다.
- @NamedEntityGraph
    - @Entity에서 재사용할 여러 엔티티 그룹을 정의할 때 사용
- @EntityGraph
    - @NamedEntityGraph에 정의되어 있는 엔티티 그룹을 사용 함.
    - 그래프 타입 설정 가능
        - (기본값) FETCH: 설정한 엔티티 애트리뷰트는 EAGER 패치 나머지는 LAZY 패치.
        - LOAD: 설정한 엔티티 애트리뷰트는 EAGER 패치 나머지는 기본 패치 전략 따름. 

#### Projection
- 엔티티의 일부 데이터만 가져오기
- 인테페이스 기반 프로젝션
    - Nested 프로젝션 가능
    - Closed 프로젝션
        - 쿼리를 최적화 할 수 있다. 가져오려는 애트리뷰트가 뭔지 알고 있다
        - Java 8의 디폴트 메소드를 사용해서 연산을 할 수 있다.
    - Open 프로젝션
        - 다가져와서 자신(개발자)이 보고싶은 객체로 가공을 한다.
        - @Value을 사용해서 연산을 할 수 있다. 스프링 빈의 메소드도 호출 가능
        - 쿼리 최적화를 할 수 없다. SqEL을 엔티티 대상으로 사용하기 때문이다.
- 클래스 기반 프로젝션
    - DTO
    - 롬복 @Value로 코드 줄일 수 있음
- 다이나믹 프로젝션
    - 프로젝션용 메서드 하나만 정의하고 실제 프로젝션 타입은 타입 인자로 전달하기

#### Specifications
- Spec을 predicate로 정의하여 쿼리를 좀 더 효율 적으로 날리 수 있게 해준다.
- 기존의 findBy~메서드를 이용하여 만든다.
- page와 함께 이용 할 수 있다.

#### Query by Example
- Example = Probe + ExampleMatcher
- 예제 객체를 이용하여 쿼리를 작성하는 방식

#### 트랜잭션
- 스프링 데이터 JPA가 제공하는 Repository의 모든 메소드에는 기본적으로 @Transaction이 적용이 되어 있다.
- Isolation, Propagation
- Read_Only
    - Flush mode Never, None dirty checking

#### Auditing
- 엔티티의 변경 시점에 언제, 누가 변경했는지에 대한 정보를 기록하는 기능.
- 스프링 부트가 자동 설정 해주지 않습니다.
    - 메인 애플리케이션 위에 @EnableJpaAuditing 추가
    - 엔티티 클래스 위에 @EntityListeners(AuditingEntityListener.class) 추가
    - AuditorAware 구현체 만들기
    - @EnableJpaAuditing에 AuditorAware 빈 이름 설정하기.
- JPA의 라이프 사이클 이벤트
    - https://docs.jboss.org/hibernate/orm/4.0/hem/en-US/html/listeners.html
    - @PrePersist
    - @PreUpdate 



