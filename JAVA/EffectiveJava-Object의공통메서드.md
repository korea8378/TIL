# JAVA

## 1월 16일

### 이펙티브 자바 - 모든 객체의 공통 메서드

#### 모든 객체의 공통 메서드
- Object는 객체 생성이 가능한 클래스이긴 하지만 기본적으로는 계승해서 사용하도록 설계된 클래스이다.
- Object에 정의된 비-final 메서드 : equals, dashcode, toString, clone, finalize가 있다.
- 비-final 메서드로 정의되어 있는 이유는 재정의 하도록 설계된 메서드이기 때문이다.
- 이 메서드들은 재정의하는 클래스는 그 일반 규약을 따라야한다. 그렇지 않은 클래스를 HashMap이나 HashSet처럼 해당 규약에 의존하는 클래스와 함께 사용하면 문제가 생긴다.

#### equals를 재정의할 때는 일반 규약을 따르라
- equals메서드를 재정의 하지 않아도 되는 조건
  1. 각각의 객체가 고유하다
  2. 클래스에 논리적 동일성 검사 방법이 있건 없건 상관없다.
  3. 상위 클래스에서 재정의한 equals가 하위 클래스에서 사용하기에도 적당하다.
  4. 클래스가 private 또는 package-private로 선언 되었고, equals 메서드를 호출할 일이 없다.

- equals메서드를 재정의 하는 것이 맞는 조건
  1. 객체의 동일성이 아닌 논리적 동일성의 개념을 지원하는 클래스 일 때
  2. 상위 클래스의 equals가 하위 클래스의 필요를 충족하지 못 할 때
  3. 값 클래스 : int, date 등 처럼 단순히 어떤 값을 표현하는 클래스

- 프로그래머는 두객체가 같은 값을 나타내는지를 알기 위해 equals를 사용하지, 동일한 객체인지 보려고 equals를 호출하지 않는다.

#### Equals 메서드를 재정의 할 때 준수해야 하는 일반 규약
- 반사성 : null이 아닌 참조 x가 있을 때, x.equals(x)는 ture를 반환한다.
- 대칭성 : null이 아닌 참조 x와 y가 있을 때, x.equals(y)는 y.equals(x)가 true일 때만 true를 반환한다.
- 추이성 : null이 아닌 참조 x, y, z가 있을 때, x.equals(y)가 true이고 y.equals(z)가 true이면 x.equals(z)도 true이다.
- 일관성 : null이 아닌 참조 x와 y가 있을 때, equals를 통해 비교되는 정보에 아무 변화가 없다면, x.equals(y) 호출 결과는 호출 횟수에 상관없이 항상 같아야한다.
- null이 아닌 참조 x에 대해서, x.equals(null)은 항상 false이다.

#### 반사성
- 모든 객체는 자기 자신과 같아야 한다는 뜻이다.

#### 대칭성
- 두 객체에게 서로 같은지 물으면 같은 답이 나와야 한다는 것이다.
<pre><code>
//대칭성 위반
public final class CaseInsensitiveString {
	private final String s;
	
	public CaseInsensitiveString(String s) {
		if ( s == null)
			throw new NullPointerException();
		this.s = s;
	}
	//대칭성 위반
	@Override public boolean equals(Object O) {
		if (o instanceof CaseInsensitiveString)
			return s.equalsIgnoreCase(
				((CaseInsensitiveString) o).s);
		if (o instanceof String) //한 방향으로만 정상 동작
			return s.equalsIgnoreCase((String) o);
		return false;
	}
}

CaseInsensitiveString cis = new CaseInsensitiveString(“Polish”);
String s = “polish”
</code></pre>
- cis.equals(s)는 true를 반환 하지만 s.equals(cis)는 false를 반환한다.
- equals가 따라야 할 규약을 어기면 그 객체를 만나 다른 객체들이 어떻게 행동 할지 예측할 수 없게 된다.
- 위에서의 문제를 해결하려면 CaseInsensitiveString의 euqals 메서드가 String 객체와 상호작용하지 않도록 해야한다.
<pre><code>
@Override public Boolean equals(Object o) {
	return o instanceof CaseInsensitiveString &&
			((CaseInsensitiveString) o).s.equalsIgnoreCase(s);
}
</code></pre>

#### 추이성
- 첫 번째 객체가 두 번째 객체와 같고, 두 번째 객체가 세 번째 객체와 같다면 첫 번째 객체와 세 번째 객체도 같아야 한다는 것이다.
<pre><code>

public class Point {
    private final int x;
    private final int y;
    public Point(int x, int y) {
        this.x = x;
        this.y = y;
    }
    
    @Override
    public boolean equals(Object o) {
        if (!(o instanceof  Point))
            return false;
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
    
    //대칭성 위반
    @Override
    public boolean equals(Object o) {
        if (!(o instanceof  ColorPoint))
            return false;
        return super.equals(o) && ((ColorPoint)o).color == color;
    }
}

Point p = new Point(1, 2);
ColorPoint cp = new ColorPoint(1, 2, Color.Red);

</code></pre>
- 부모 클래스의 필드를 상속 받고 자식 클래스가 자신의 필드까지 있는 경우 equals 구현시 대칭성을 위반 시켜서는 안된다.
- 위의 p와 cp는 동일한 값을 가지고 있는 객체들이 아니다. 하지만 p.equals(cp)를 하게된다면 동일한 값을 가지고 있는 객체로 결과값이 반환된다.
<pre><code>
ColorPoint p1 = new ColorPoint(1, 2, Color.Red);
Point p2 = new Point(1, 2);
ColorPoint p3 = new ColorPoint(1, 2, Color.BLUE);
</code></pre>
- p1.equals(p2)와 p2.equals(p3)를 하게 된다면 ture가 반환된다.
- 하지만 p1.equals(p3)를 하게 된다면 flase가 반환된다.
- 추이성을 위반하게 된다.
<pre><code>
	//추이성 위반 해결법
	//리스코프 대체 원칙 위반
	@Override
	public boolean equals(Object o) {
    		if (!(o == null || o.getClass() != getClass())
        		return false;
    		Point p = (Point) o;
    		return p.x == x && p.y == y;
	}
</code></pre>
- 추이성 위반을 방지 할 수 있지만 리스코프 대체원칙을 위반하게된다.
- 객체 생성 가능 클래스를 계승하여 새로운 값 컴포넌트를 추가하면서 equals 규약을 어기지 않을 방법은 없다.
- 리스코프 대체 원칙 : 어떤 자료형의 중요한 속성은 하위 자료형에도 그대로 유지되어서, 그 자료형을 위한 메서드는 하위 자료형에도 잘 동작 해야 한다는 원칙이다.
- abstract로 선언된 클래스를 상속 받은 클래스들은 위에서의 문제들이 발생하지 않는다. 객체생성 불가능 x

#### 일관성
- 같다고 판정된 객체들은 추후 변경되지 않는 한 계속 같아야 한다는 것이다.
- 변경 가능한 객체들 간의 동치 관계는 시간에 따라 달라질 수 있지만 변경 불가능한 객체 사이의 동치 관계는 달라질 수 없다.
- 클래스를 구현 할때는 변경 불가능하도록 구현해야 하는지 깊이 생각해 보자
- 신로성이 보장되지 않는 자원들은 비교하는 equals를 구현하는 것은 삼가하자.(언제나 같은 결과가 나온다는 보장이 없다)

#### 모든 객체는 null과 동치 관계에 있지 아니한다.
- Null 조건을 명시적으로 검사해서 예외가 발생하지 않도록 해야한다.
- 예외 : NullPointerException
<pre><code>
@Override
public Boolean equals(Object o) {
	if( o == null )
		return false;
	…
}

@Override
public Boolean equals(Object o) {
	if( !(o instanceof MyType))
		return false;
	Mytype mt = (MyType) o;
…
}
</code></pre>
- 인자와의 비교를 위해 equals 메서드는 먼저 인자를 형변환(cast)해야 한다.
- 그래야 접근자 메서드를 호출하거나 필드를 검사할 수 있기 때문이다.

#### 훌륭한 equals 메서드를 구현하기 위해 따라야 할 지침들
1. == 연산자를 사용하여 equals의 인자가 자기 자신인지 검사하라
2. Instanceof 연산자를 사용하여 인자의 자료형이 정확한지 검사하라.
3. equals의 인자를 정확한 자료형으로 변환하라
4. “중요” 필드 각각이 인자로 주어진 객체의 해당 필드와 일치하는지 검사하라.
5. Equals 메서드 구현을 끝냈다면, 대칭성, 추이성, 일관성의 세 속성이 만족되는지 검토하라.

#### equals @Override시 주의점
1. equals를 구현 할 때는 hashCode도 재정의하라
2. 너무 머리 쓰지 마라
3. equals 메서드의 인자 형을 Object에서 다른 것으로 바꾸지 마라.

#### HashCode()
- equals 메서드를 재정의하는 클래스는 반드시 hashCode 메서드도 재정의 해야한다.
- 그렇지 않으면 Object.hashCode의 일반 규약을 어기게 되므로, HashMap, HashSet, Hashtable 같은 해시 기반 컬렉션과 함께 사용하면 오동작하게 된다.

#### HashCode의 일반 규약
- 응용프로그램 실행 중에 같은 객체의 hashCode를 여러 번 호출하는 경우, equals가 사용하는 정보들이 변경되지 않았다면, 언제나 동일한 정수가 반환되어야 한다. 다만 프로그램이 종료되었다가 다시 실행되어도 같은 값이 나올 필요는 없다.
- equals(Object) 메서드가 같다고 판정한 두 객체의 hashCode 값은 같아야 한다.
- equals(Object) 메서드가 다르다고 판정한 두 객체의 hashCode 값은 꼭 다를 필요는 없다. 그러나 서로 다른 hashCode 값이 나오면 해시 테이블의 성능이 향상될 수 있다는 점은 이해하고 있어야 한다.

#### hashCode를 재정의 하지 않으면 위반되는 핵심 규약은 두 번째다. 같은 객체는 같은 해시 코드 값을 가져야한다는 규약이 위반되는 것이다.
- equals 메서드가 논리적으로 같다고 판단한 두 객체라도 Object의 hashCode 입장에서 보면 그다지 공통점이 없는 두 객체일 뿐이다. 따라서 Object의 hashCode 메서드는 규약대로 같은 정수를 반환하는 대신, 무작위로 선택된 것처럼 보이는 두 개의 정수를 반환한다.
<pre><code>
public final class PhoneNumber {
	private final short areaCode;
	private final short prefix;
	private final short lineNumber;
	
	public PhoneNumber(int areaCode, int prefix, int lineNumber) {
		rangeCheck(areaCode, 999, "area code");
		rangeCheck(prefix, 999, "prefix");
		rangeCheck(lineNumber, 999, "lineNumber");
		this.areaCode = (short) areaCode;
		this.prefix = (short) prefix;
		this.lineNumber = (short) lineNumber;
	}
	
	private  static void rangeCheck(int arg, int max, String name) {
		if (arg < 0 || arg > max)
			throw new IllegalArgumentException(name + ": " + arg);
	}

	@Override
	public boolean equals(Object o) {
		if (o == this)
			return true;
		if(!(o instanceof PhoneNumber))
			return false;
		PhoneNumber pn = (PhoneNumber)o;
		return pn.lineNumber == lineNumber
			&& pn.prefix == prefix
			&& pn.areaCode == areaCode;
	}
	
	//hashCode 메서드가 없으므로 문제가 발생한다.
}
</code></pre>
- hashCode를 오버라이딩 하지 않았다.
<pre><code>
Map<PhoneNumber, String> m = new HashMap<>();
m.put(new PhoneNumber(707, 867, 5309), "Jenny");
m.get(new PhoneNumber(707, 867, 5309));
</code></pre>
- 707,867,5309를 가지는 객체를 map에 넣고 같은 값을 같는 객체로 put을 하면 jenny라는 값이 나올꺼 같지만 나오지 않는다.(hashcode를 정의 하지 않았기 때문이다.)
- hash를 사용하는 collection들은 객체를 담을때 객체의 hashcode를 이용해서 담기 때문에 위에 같은 경우는 다른 같은 필드의 값을 가졋지만 객체의 hashcode들이 다르기 때문에 map에서 꺼내 올 수 없다. 
- 해결 방안으로 hashCode 메서드를 @Override하된 class가 가지는 필드값들을 이용하여 hashcode를 뽑아 내야한다.(필드의 값들이 같은 객체들에게서 동일한 해쉬코드를 뽑아 낼수 있기때문이다.)
#### hashCode 주의사항 
- 성능을 개선하려고 객체의 중요 부분을 해시 코드 계산 과정에서 생략하면 안 된다는 것이다.