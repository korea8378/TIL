# JAVA

## 6월 13일

### 아이템14.Comparable을 구현할지 고려하라.

#### compareTo 메서드
- Comparable 인터페이스의 유일무이한 메서드
- compareTo는 단순 동치성 비교에 더해 순서까지 비교할 수 있으며, 제네릭하다.
- Compareable을 구현했다는 것은 그 클래스의 인스턴스들에는 자연적인 순서가 있음을 뜻한다.
- 그래서 Comparable을 구현한 객체들의 배열은 다음처럼 손쉽게 정렬할 수 있다.
    - ex) Arrays.sort(a), String
- 자바 플랫폼 라이브러리의 모든 값 클래스와 열거 타입이 Comparable을 구현했다.

#### compareTo 메서드의 일반 규약
- 이 객체가 주어진 객체보다 작으면 음의정 수를, 같으면 0을, 크면 양의 정수를 반환한다.
- 이 객체와 비교할 수 없는 타입의 객체가 주어지면 ClassCastException을 던진다.
- Comparable을 구현한 클래스는 모든 x, y에 대해 sgn(x.compareTo(y)) == -sgn(y.compareTo(x))여야 한다. (따라서 x.compareTo(y)는 y.compareTo(x)가 예외를 던질때에 한해 예외를 던져야 한다.)
- Comparable을 구현한 클래스는 추이성을 보장해야 한다. 즉, (x.compareTo(y) > 0 && y.compareTo(z) > 0)이면 x.compareTo(z) > 0 이다.
- Comparable을 구현한 클래스는 모든 z에 대해 x.compareTo(y) == 0이면 sgn(x.compareTo(z)) == sgn(y.compareTo(z))다.
- (x.compareTo(y) == 0) == (x.equals(y))여야 한다. Comparable을 구현하고 이 권고를 지키지 않는 모든 클래스는 그사실을 명시해야 한다. (필수사항이 아니다.)

#### 주의점
- Collection, Set, Map 인터페이스들은 equals 메서드의 규약을 따른다고 되어 있지만, 놀랍게도 정렬된 컬렉션들ㅇ는 동치성을 비교할 때 equals 대신 compareTo를 사용한다.
    - ex) BigDecimal - compareTo와 equals가 일관적이게 적용되어 있지 않다.
        - HashSet - new BigDecimal(“1.0”), new BigDecimal(“1.00”) add 시 두개의 원소
        - TreeSet - new BigDecimal(“1.0”), new BigDecimal(“1.00”) add 시 한개의 원소 

#### compareTo 메서드 작성 요령
- compareTo 메서드 작성 요령은 equlas와 비슷하다.
- 몇 개의 차이점이 존재
    - Comparable은 타입을 인수로 받는 제네릭 인터페이스이므로 compareTo 메서드의 인수 타입은 컴파일타임에 정해진다. 입력 인수의 타입을 확인하거나 형변환 할 필요가 없다는 뜻이다.
    - null을 인수로 넣어 호출하면 NullPointerException을 던져야 한다.
    - compareTo 메서드는 각 필드가 동치인지를 비교하는 게 아니라 그 순서를 비교한다.

#### compareTo 구현
- Comparable 인터페이스를 상속 받는다.
- `compareTo 메서드에서 관계 연산자 <와 >를 사용하는 이전 방식은 거추장스럽고 오류를 유발하니, 이제는 추전하지 않는다.(자바 7부터)`
```{.java}
//기본 타입 필드가 여럿일 때의 비교자
public int compareTo(PhoneNumber pn) {
	int result = Short.compare(areaCode, pn.areaCode);
	if (result == 0) {
		result = Short.compare(prefix, pn.prefix);
	}
		if (result == 0) {
			result = Short.compare(lineNum, pn.lineNum);
		}
	return result;
}


```

#### Comparator
- Comparable을 구현하지 않은 필드나 표준이 아닌 순서로 비교해야 한다면 Comparator를 대신 사용하자.
- 자바 8에서는 Comparator 인터페이스가 일련의 비교자 생성 메서드와 팀을 꾸려 메서드 연쇄방식으로 비교자를 생성할 수 잇게 되었다.
```{.java}
//비교자 생성 메서드를 활용한 비교자
private static final Comparator<PhoneNumber> COMPARATOR = 
		comparingInt((PhoneNumber pn) -> pn.areaCode)
			.thenComparingInt(pn -> pn.prefix)
			.thenComparingInt(pn -> pn.lineNum);

public int compareTo(PhoneNumber pn) {
	return COMPARATOR.compare(this, pn);
}
```
- 자바의 정적 임포트 기능을 이용하여 정적 비교자 생성 매서드들을 그 이름만으로 사용할 수 있어 코드가 훨씬 깔끔해졌다.
- Compator는 수많은 보조 생성 메서드들로 중무장하고 있다.
    - long과 double용으로는 comparingInt와 thenComparingInt의 변형 메서드를 준비
    - 객체 참조용 비교자 생성 메서드도 준비되어 있다.

#### 값의 차를 이용한 검사는 사용하지 말자
```{.java}
static Comparator<Object> hashCodeOrder = new Comparator<>() {
	public int compare(Object o1, Object o2) {
		return o1.hashCode() - o2.hashCode();
	}
};
```
- 값의 차를 기준으로 Comparator를 구현하지 말자
- 이 방식은 정수 오버플로를 일키거나 IEEE 754 부동소수점 계산 방식에 따른 오류를 낼 수 있다.
```{.java}
// 정적 compare 메서드를 활용한 비교자
static Comparator<Object> hashCodeOrder = new Comparator<>() {
	public int compare(Object o1, Object o2) {
		return Integer.compare(o1.hashCode(), o2.hashCode());
	}
};

// 비교자 생성 메서드를 활용한 비교자
static Comparator<Object> hashCodeOrder =
		Comparator.comparingInt(o -> o.hashCode());
```

#### 핵심정리
- `순서를 고려해야 하는 값 클래스를 작성한다면 꼭 Comparable 인터페이스를 구현하여, 그 인스턴스들을 쉽게 정렬하고, 검색하고, 비교 기능을 제공하는 컬렉션과 어우려 지도록 해야 한다.`
- `compareTo 메서드에서 필드의 값을 비교할 때 <와 > 연산자는 쓰지 말아야 한다. 그 대신 박싱된 기본 타입 클래스가 제공하는 정적 compare 메서드나 Comparator 인터페이스가 제공하는 비교자 생성 메서드를 사용하자.`

