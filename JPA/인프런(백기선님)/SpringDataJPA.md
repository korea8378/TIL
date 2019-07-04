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

