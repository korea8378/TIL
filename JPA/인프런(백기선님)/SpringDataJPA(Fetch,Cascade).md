# 인프런(백기선님)

## 3월 22일

### Cascade, Fetch

#### Cascade
- 엔티티의 상태 변화를 전파 시키는 옵션.

#### 엔티티의 상태
- Transient: JPA가 모르는 상태
- Persistent: JPA가 관리중인 상태 (1차 캐시, Dirty Checking, Write Behind, ...)
- Detached: JPA가 더이상 관리하지 않는 상태.
- Removed: JPA가 관리하긴 하지만 삭제하기로 한 상태.

![persistent](/JPA/img/persistent.png)

#### Fetch
- 연관 관계의 엔티티를 어떻게 가져올 것이냐... 지금 (Eager)? 나중에(Lazy)?
    - @OneToMany의 기본값은 Lazy
    - @ManyToOne의 기본값은 Eager

