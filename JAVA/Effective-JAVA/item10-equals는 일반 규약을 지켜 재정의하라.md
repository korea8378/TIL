# JAVA

## 6월 10일

### 아이템10.equals는 일반 규약을 지켜 재정의하라

#### equals 메서드 재정의 하지 않아도 되는 상황
- 각 인스턴스가 본질적으로 고유하다.
    - 값을 표현하는 게 아니라 동작하는 객체를 표현하는 클래스
- 인스턴스의 ‘논리적 동치성’을 검사할 일이 없다.
    - Object의 기본 equals만으로도 해결되는 상황
- 상위 클래스에서 재정의한 equals가 하위 클래스에도 딱 들어맞는다.
    - ex) set의 구현체, List 구현체, Map 구현체
- 클래스가 private이거나 package-private이고 equals 메서드를 호출할 일이 없다.

#### equals를 재정의 해야 할 때
- 객체 식별성이 아니라 논리적 동치성을 확인해야 하는데, 상위 클래스의 equals가 논리적 동치성을 비교하도록 재정의되지 않았을 때
    - ex) 값 클래스(Integer와 String)

#### Object 명세에 적힌 규약(equals 메서드를 재정의 할 때 따라야한다)
- 반사성 : null이 아닌 모든 참조 값 x에 대해, x.equals(x)는 true다.
- 대칭성 : null이 아닌 모든 참조 값 x, y에 대해, x.equals(y)가 true면 y.equals(x)도 true다.
- 추이성 : null이 아닌 모든 참조 값 x, y, z에 대해, x.equals(y)가 true이고 y.equals(z)도 ture면 x.equals(z)도 true다.
- 일관성 : null이 아닌 모든 참조 값 x, y에 대해, x.equals(y)를 반복해서 호출하면 항상 true를 반환하거나 항상 false를 반환한다.
- null-아님 : null이 아닌 모든 참조 값 x에 대해, x.equals(null)은 false이다.
