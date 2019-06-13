# JAVA

## 6월 13일

### 아이템13.clone 재정의는 주의해서 진행하라.

#### Cloneable
- Cloneable은 복제해도 되는 클래스임을 명시하는 용도의 믹스인 인터페이스지만, 아쉽게도 의도한 목적을 제대로 이루지 못했다.
- 문제는 clone 메서드가 선언된 곳이 Cloneable이 아닌 Ojbect이고, 그마저도 protected라는데 있다.
- 그래서 Cloneable을 구현하는 것만으로는 외부 객체에서 clone 메서드를 호출할 수 없다.

#### Cloneable 인터페이스
- Cloneable 인터페이스는 놀랍게도 Object의 protected 메서드인 clone의 동작 방식을 결정한다.
- Cloneable을 구현한 클래스의 인스턴스에서 clone을 호출하면 그 객체의 필드들을 하나하나 복사한 객체를 반환하며, 그렇지 않은 클래스의 인스턴스에서 호출하면 CloneNotSupportedException을 던진다.
- 주의
    - 인터페이스를 구현한다는 것은 일반적으로 해당 클래스가 그 인터페이스에서 정의한 기능을 제공한다고 선언하는 행위다.
    - 그런데 Cloneable의 경우에는 상위 클래스에 정의된 protected 메서드의 동작 방식을 변경한 것이다.
- `실무에서 Cloneable을 구현한 클래스는 clone 메서드를 public으로 제공하며, 사용자는 당연히 복제가 제대로 이뤄지리라 기대한다.`
```{.java}
//Obect 명세에 있는 clone 메서드의 일반 규약
x.clone() != x

x.clone().getClass() == x.getClass()

x.clone().equals(x)

x.clone().getClass() == x.getClass()
```
- Clone 메서드가 super.clone이 아닌, 생성자를 호출해 얻은 인스턴스를 반환해도 컴파일러는 불평하지 않는다.
- 하지만 이 클래스의 하위 클래스에서 super.clone을 호출한다면 잘못된 클래스의 객체가 만들어져, 결국 하위 클래스의 clone 메서드가 제대로 동작하지 않게 된다.

#### Cloneable 구현
```{.java}
//가변 상태를 참조하지 않는 클래스용 clone 메서드
@Override
public PhoneNumber clone() {
	try {
		return (PhoneNumber) super.clone();
	} catch (CloneNotSupportedException e) {
		throw new AssertionError();
	}
}
```
- 모든 필드가 기본 타입이거나 불변 객체를 참조한다면 이 객체는 완벽히 우리가 원하는 상태라 더 손볼 것이 없다.
- 불변 클래스는 굳이 clone 메서드를 제공하지 않는게 좋다.
    - 쓸데없는 복사를 지양한다(불변 클래스)
- 형변환을 통하여 클라이언트에서 형변환하지 않게 해주자.
```{.java}
//가변 상태를 참조하는 클래스용 clone 메서드
@Override
public Stack clone() {
	try {
		Stack result = (Stack) super.clone();
		result.elements = elements.clone();
		return result;
	} catch (CloneNotSupportedException e) {
		throw new AssertionError();
	}
}
```
- 구현 클래스가 가변 객체를 참조하는 순간 재앙으로 돌변한다.
- 가변 상태를 참조하는 필드를 가진 클래스를 super.clone()을 호출하게 되면 원본 클래스의 인스턴스와 똑같은 객체를 참조(주소를 참조)할 것이다.
- 원본이나 복제본 중 하나를 수정하면 다른 하나도 수정되어 불변식을 해친다는 이야기다.
- 하나뿐인 생성자를 호출한다면 이러한 상황은 절대 일어나지 않는다.
- `clone메서드는 사실상 생성자와 같은 효과를 낸다. 즉, clone은 원본 객체에 아무런 해를 끼치지 않는 동시에 복제된 객체의 불변식을 보장해야 한다.`
- 가변 상태를 참조하는 클래스용 clone 메서드는 위의 코드와 같이 해당 필드(가변상태를 참조하는)에 대해서도 clone을 재귀적으로 호출해준다.
- 가변 상태를 참조하는 필드는 final있다면 위의 코드는 동작하지 않는다. final 필드에는 새로운 값을 할당할 수 없기 때문이다.
- `Cloneable 아키텍처는 가변객체를 참조하는 필드는 final로 선언하라는 일반 용법과 충돌한다.`

#### 해시테블용 clone 메서드
- 해시테이블 내부는 버킷들의 배열이고, 각 버킷은 키-값 쌍을 담는 연결 리스트의 첫 번째 엔트리를 참조한다.
```{.java}
//잘못된 clone 메서드 - 가변상태를 공유한다.
public class HashTable implements Cloneable {
	private Entiry[] buckets = …;

	private static class Entry {
		final Object key;
		Object value;
		Entry next;
		
		Entry(Object key, Object value, Entry next) {
			this.key = key;
			this.value = value;
			this.next = next; //원본 연결리스트의 참조값을 그대로 복사가 된다.
		}
	}

	@Override
	public HashTable clone() {
		try{
			HashTable result = (HashTable) super.clone();
			result.buckets = buckets.clone();
			return result;
		} catch (CloneNotSupportedException e) {
			throw new AssertionError();	
		}
	}
}

//복잡한 가변 상태를 갖는 클래스용 재귀적 반복 복사
public class HashTable implements Cloneable {
	private Entiry[] buckets = …;

	private static class Entry {
		final Object key;
		Object value;
		Entry next;
		
		Entry(Object key, Object value, Entry next) {
			this.key = key;
			this.value = value;
			this.next = next; //원본 연결리스트의 참조값을 그대로 복사가 된다.
		}

		Entry deepCopy() {
			Entry result = new Entry(key, value, next);
			for (Entry p = result; p.next != null; p = p.next) {
				p.next = new Entry(p.next.key, p.next.value, p.next.next);
			}
			return result;
		}
	}

	@Override
	public HashTable clone() {
		try{
			HashTable result = (HashTable) super.clone();
			result.buckets = new Entry[buckets.length];
			for (int i = 0; i < buckets.length; i++) {
				if (buckets[i] != null) {
					result.buckets[i] = buckets[I].deepCopy();
				}
			} 
			return result;
		} catch (CloneNotSupportedException e) {
			throw new AssertionError();	
		}
	}
}
```
- 위의 두번째 코드는 HashTable의 clone 메서드는 먼저 적절한 크기의 새로운 버킷 배열을 할당한 다음 원래의 버킷 배열을 순회하며 비지 않은 각 버킷에 대해 깊은 복사를 수행한다.
- 또 다른 방법으로는 buckets 필드를 새로운 버킷 배열로 초기화한 다음 원본 테이블에 담긴 모든 키-값 쌍 각각에 대해 복제본 테이블의 put(key, value) 메서드를 호출해 둘의 내용이 똑같게 해주면 된다.(하지만 위의 코드보다 속도가 느릴수 있다.)

#### 주의점
- `public인 clone 메서드에서는 throws 절을 없애야 한다.`
    - 검사 예외를 던지지 않아야 그 메서드를 사용하기 편하기 때문이다.
- 상속용 클래스는 Cloneable을 구현해서는 안된다.
- Object의 clone 메서드 방식을 모방하여 사용할 수도 있다.
- clone을 동작하지 않게 구현해놓고 하위 클래스에서 재정의하지 못하게 할 수도 있다.
- Clonable을 구현한 스레드 안전 클래스를 작성할 때는 clone 메서드 역시 적절히 동기화해줘야 한다.
    - Object의 clone 메서드는 동기화를 신경 쓰지 않았다.
- `복사 생성자와 복사 팩터리라는 더 나은 객체 복사방식을 제공할 수도 있다.`
    - 복사 생성자와 그변형인 복사 팩터리는 Cloneable/clone 방식보다 나은면이 많다.

#### 핵심정리
- `Cloneable이 ㅁ로고 온 모든 문제를 되짚어봤을 때, 새로운 인터페이스를 만들 때는 절대 Cloneable을 확장해서는 안 되며, 새로운 클래스도 이를 구현해서는 안된다.
- `final 클래스라면 Cloneable을 구현해도 위험이 크지 않지만, 성능 최적화 관점에서 검토한 후 별다른 문제가 없을 때만 드물게 혀용해야 한다.`
- `기본 원칙은 복제 기능은 생성자와 팩터리를 이용하는게 최고라는 것이다. 단, 배열만은 clone 메서드 방식이 가장 깔끔한, 이 규칙의 합당한 예외라 할 수 있다.`


