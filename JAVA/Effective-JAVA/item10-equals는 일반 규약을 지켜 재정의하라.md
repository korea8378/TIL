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

#### 반사성
- 객체는 자기 자신과 같아야 한다.

#### 대칭성
- 두 객체는 서로에 대한 동치 여부에 똑같이 답해야 한다.
```{.java}
// 대칭성을 무시하는 equals 구현
public final class CaseInsensitiveString {
	private final String s;
	
	public CaseInsensitiveString(String s) {
		this.s = Objects,requireNonNull(s);
	}

	@Override 
	public boolean equals(Object o) {
		if (o instanceof CaseInsensitiveString) {
			return s.equalsIgnoreCase(((CaseInsensitiveString) o).s);
		}
		if (o instanceof String) {
			return s.equalsIgnoreCase((String) o);
		}
		return false;
	}
}
CaseInsensitiveString cis = new CaseInsensitiveString(“Polish”);
String s = “polish”

// jdk 버전에 따라서 동작을 하지 않을 수도 있다.
List<CaseInsensitiveString> list = new ArrayList<>();
list.add(cis)
```
- CaseInsensitiveString는 String을 알고 있지만 String은 CaseInsensitiveString을 알고 있지 않기 때문에 대칭성을 지키지 않고 있다.
- `equals 규약을 어기면 그 객체를 사용하는 다른 객체들이 어떻게 반을할지 알 수 없다.`

```{.java}
//String과의 연동을 포기하라
public final class CaseInsensitiveString {
	private final String s;
	
	public CaseInsensitiveString(String s) {
		this.s = Objects,requireNonNull(s);
	}

	@Override 
	public boolean equals(Object o) {
		return o instanceof CaseInsensitiveString &&
			((CaseInsensitiveString) o).s.equalsIgnoreCase(s);
	}
}
```

#### 추이성
- 첫 번째 객체와 두 번째 객체가 같고, 두 번째 객체와 세 번째 객체가 같다면, 첫 번째 객체와 세 번째 객체도 같아야 한다.
```{.java}
public class Point {
	private final int x;
	private final int y;

	public Point(int x, int y) {
		this.x = x;
		this.y = y;	
	}

	@Override
	public boolean equals(Object o) {
		if (!(o instanceof Point)) {
			return false;
		}
		Point p = (Point)o;
		return p.x == x && p.y == y;
	}

}

public class ColorPoint extends Point {
	private final Color color;
	
	public ColorPoint(int x, int y, Color color) {
		super(x, y);
		this.color = color;
	}
	…

	//대치성을 위배
	@Override
	public boolean equlas(Object o) {
		if (!(o instanceof ColorPoint)) {
			return false;
		}
		return super.equals(o) && ((ColorPoint) o).color == color;
	}
	
	//추시성 위배
	@Override
	public boolean equlas(Object o) {
		If (!(o instanceof Point)) {
			return false;
		}
		if (!(o instanceof ColorPoint)) {
			return o.equals(this);
		}

		return super.equals(o) && ((ColorPoint) o).color == color;
	}
}
```
- `구체 클래스를 확장해 새로운 값을 추가하면서 equals 규약을 만족시킬 방법은 존재하지 않는다.`
```{.java}
//리스코프 치환 원칙 위배
@Override
public boolean equals(Object o) {
	if ( o == null || o.getClass() != getClass()) {
		return false;
	}
	Point p = (Point) o;
	return p.x == x && p.y == y;
}

public class CounterPoint extends Point {
	private static final AtomicInteger counter = new AtomicInteger();
	
	public CounterPoint(int x, int y) {
		super(x, y);
		counter.incrementAndGet();
	}
	public static int numberCreated() { 
		return counter.get();
	}
}
```
- 위 코드를 사용하게 되면 CounterPoint의 인스턴스를 onUnitCircle 메서드에 넘기면 false를 반환하게 된다.
- getClass를 이용하여 equals를 구현했기 때문이다.
- 반면, point의 equlas를 instanceof 기반으로 올바로 구현했다면 CounterPoint 인스턴스를 건네줘도 onUnitCircle 메서드가 제대로 동작할 것이다.
```{.java}
// equals 규약을 지키면서 값 추가하기
public class ColorPoint {
	private final Point point;
	private final Color color;

	public ColorPoint(int x, int y, Color color) {
		point = new Point(x, y);
		this.color = Objects.requireNonNull(color);
	}

	public Point asPoint() {
		return point;
	}
	
	@Override
	public boolean equals(Object o) {
		if (!(o instanceof ColorPoint)) {
			return false;
		}
		ColorPoint cp = (ColorPoint) o;
		return cp.point.equals(point) && cp.color.equals(color);
	}
	
	…
}
```
- 위의 코드는 상속대시 컴포지션을 사용하였다.
- Point를 상속하는 대신 Point를 ColorPoint의 private 필드로 두고, ColorPoint와 같은 위치의 일반 Point를 반환하는 뷰 메서드를 public으로 추가하는 식이다.

#### 일관성
- 두 객체가 같다면 앞으로도 영원히 같아야 한다.
- 가변 객체는 비교 시점에 따라 서로 다를 수도 혹은 같을 수도 있는 반면, 불변 객체는 한번 다르면 끝까지 달라야 한다.
- `클래스가 불변이든 가변이든 equals의 판단에 신뢰할 수 없는 자원이 끼어들게 해서는 안된다.`

#### Null-아님
- 모든 객체가 null과 같지 않아야 한다.
```{.java}
//null을 검사하는 코드
@Override
public boolean equals(Object o) {
	if (o == null) {
		return false;
	}
}

//null을 검사하는 코드 개선(묵시적으로 null을 검사하게 된다)
@Override
public boolean equals(Object o) {
	if (!(o instanceof MyType) {
		return false;
	}
	MyType mt = (MyTpe) o;
}
```

#### equals 메서드 구현 방법의 단계
- 1.== 연산자를 사용해 입력이 자기 자신의 참조인지 확인한다.
- 2.instanceof 연산자로 입력이 올바른 타입인지 확인한다.
- 3.입력을 올바른 타입으로 형변환한다.
- 4.입력 객체와 자기 자신의 대응되는 ‘핵심’ 필드들이 모두 일치하는지 하나씩 검사한다.

#### 기본타입과 참조타입
- float와 double을 제외한 기본 타입 필드는 ==연산자로 비교한다.
- 참조 타입 필드는 각각의 equlas 메서드로 비교한다.
- float와 double 필드는 각각 정적 메서드인 Float.compare(float, float)와 Double.compare(double, double)로 비교한다.
    - folat와 double은 Float.NaN, -0.0f, 특수한 부동소수 값등을 다뤄야 하기 때문이다.
    - Float.equals와 Double.equals 메서드는 오토박싱을 수반할 수 잇으니 성능상 좋지 않다.
- 배열 필드는 원소 각각을 지금까지 설명한 지침대로 비교한다.
- null도 정상 값으로 취급하는 참조 타입 필드도 있다.
    - Objects.equals(Object, Object)로 비교해 NullPointerException 발생을 예방하자.

#### 성능
- 어떤 필드를 먼저 비교하는냐가 equals의 성능을 좌우하기도 한다.
- 다를 가능성이 더 크거나 비교하는 비용이 싼 필드를 먼저 비교하자.
- 동기화용 락 필드 같이 객체의 논리적 상태와 관련 없는 필드는 비교하면 안 된다.

#### 추이성, 대치성, 일관성이 있는 equals 메서드 
- `equals를 다 구현했다면 세 가지만 자문해보자. 대칭적인가? 추시성이 있는가? 일관적인가?`
```{.java}
public final class PhoneNumber {
	private final short areaCode, prefix, lineNum;
	
	public PhoneNumber(int areaCode, int prefix, int lineNum) {
		this.areaCode = rangeCheck(areaCode, 999, “지역코드”);
		this.prefix = rangeCheck(prefix, 999, “프리픽스”);
		this.lineNum = rangeCheck(lineNum, 999, “가입자 번호”);
	}

	private static short rangeCheck(int val, int max, String arg) {
		if (val < 0 || val > max) {
			throw new IllegalArgumentException(arg + “: “ + val);
		}
		return (short) val;
	}

	@Override
	public boolean equals(Object o) {
		if( o == this) {
			return true;
		}
		if(!(o instanceof PhoneNumber)) {
			return false;
		}
		PhoneNumber pn = (PhoneNumber)o;
		return pn.lineNum == lineNum && pn.prefix == prefix
				&& pn.areaCode == areaCode;
	}
}
```

#### 주의 사항
- equals를 재정의할 땐 hashCode도 반드시 재정의 하자.
- 너무 복잡하게 해결하려 들지 말자. 
- Object외의 타입을 매개변수로 받는 equals 메서드는 선언하지 말자

#### 핵심 정리
- 꼭 필요한 경우가 아니면 equals를 재정의하지 말자. 많은 경우에 Object의 equals가 우리가 원하는 비교를 정확히 수행해준다.
- 재정의해야 할 때는 그 클래스의 핵심 필드 모두를 빠짐없이, 다섯 가지 규약을 확실히 지켜가며 비교해야 한다.
