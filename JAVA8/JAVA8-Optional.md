# JAVA8

## 2월 08일

### OPTIONAL

#### NPE(NullPoninterException)
- null값으로 뭔가를 하려고할 때 
- 객체가 초기화되지 않은 상태에서 객체의 변수나 메소드를 접근하려고 할 때 발생
<pre><code>
java.lang.NullPointerException
	at seo.dale.java.practice(OptionalTest.java:26)
	at sun.reflect.NativeMethodAccessorImpl.invoke0(Native Method)
	at sun.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:62)
	at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)
	at java.lang.reflect.Method.invoke(Method.java:497)
</code></pre>

#### NPE 방어 패턴
- 개발 코드에서 NPE에 대한 처리를 해줘야 합니다.
1. 중첩 null 체크하기
<pre><code>
public String getCityOfMemberFromOrder(Order order) {
	if (order != null) {
		Member member = order.getMember();
		if (member != null) {
			Address address = member.getAddress();
			if (address != null) {
				String city = address.getCity();
				if (city != null) {
					return city;
				}
			}
		}
	}
	return "Seoul"; // default
}
</code></pre>
- 중첩 되고 있는 객체가 있을 경우 중첩 if문을 통하여 null 체크를 해준다(코드가 매우 보기 안좋습니다.)

2. 사방에서 return 하기
<pre><code>
public String getCityOfMemberFromOrder(Order order) {
	if (order == null) {
		return "Seoul";
	}
	Member member = order.getMember();
	if (member == null) {
		return "Seoul";
	}
	Address address = member.getAddress();
	if (address == null) {
		return "Seoul";
	}
	String city = address.getCity();
	if (city == null) {
		return "Seoul";
	}
	return city;
}
</code></pre>
- 위 코드도 상당히 난잡해 집니다.(코드의 직관성이 떨어집니다.)

#### Null에 대한 이슈
- 런타임에 NPE(NullPointerException)라는 예외를 발생시킬 수 있습니다.
- NPE 방어를 위해서 들어간 null 체크 로직 때문에 코드 가독성과 유지 보수성이 떨어집니다.

#### 자바 8의 Optional이란?
- 존재 할 수도 있지만 안 할 수도 있는 객체, 즉 null이 될 수도 있는 객체를 감싸고 있는 일종의 래퍼 클래스입니다.(null을 담을 수 있는 특수한 그릇)

#### Optional의 효과
- NPE를 유발할 수 있는 null을 직접 다루지 않아도 됩니다.
- 수고롭게 null 체크를 직접 하지 않아도 됩니다.
- 명시적으로 해당 변수가 null일 수도 있다는 가능성을 표현할 수 있습니다. (따라서 불필요한 방어 로직을 줄일 수 있습니다.)

#### Optional 변수 선언
<pre><code>
Optional<Order> maybeOrder; // Order 타입의 객체를 감쌀 수 있는 Optional 타입의 변수
Optional<Member> optMember; // Member 타입의 객체를 감쌀 수 있는 Optional 타입의 변수
Optional<Address> address; // Address 타입의 객체를 감쌀 수 있는 Optional 타입의 변수
</code></pre>

#### Optional 객체 생성하기
<pre><code>
1.Optional.empty()
Optional<Member> maybeMember = Optional.empty();
//null을 담고 있는, 한마디로 비어있는 Optional 객체를 생성합니다.

2.Optional.of(value)
Optional<Member> maybeMember = Optional.of(aMember);
//null이 아닌 객체를 담고 있는 Optional 객체를 생성합니다.
//null 넘어 올 경우 NPE를 던지기 때문에 주의를 해야합니다.

3.Optional.ofNullable(value)
Optional<Member> maybeMember = Optional.ofNullable(aMember);
Optional<Member> maybeNotMember = Optional.ofNullable(null);
//null이 넘어올 경우, NPE를 던지지 않고 Optional.empty()와 동일하게 비어 있는 Optional 객체를 얻어옵니다.
//해당 객체가 null인지 아닌지 자신이 없는 상황에서는 이 메소드를 사용하셔야 합니다.
</code></pre>

#### Optional이 담고 있는 객체 접근하기
1. get() - 비어 있는 Optional 객체에 대해서, NoSuchElementExcetpion을 던집니다.
2. orElse(T other) - 비어 있는 Optional 객체에 대해서, 넘어온 인자를 반환합니다.
3. orElseGet(Supplier<? extends T> other) - 비어있는 Optional 객체에 대해서, 넘어온 함수형 인자를 통해 생성된 객체를 반환합니다.
4. orElseThrow(Supplier<? extends X> exceptionSupplier) - 비어있는 Optional 객체에 대해서, 넘어온 함수형 인자를 통해 생성된 예외를 던집니다.
- 위 4개의 메소드는 공통적으로 Optional이 담고 있는 객체가 존재할 경우 동일하게 해당 값을 반환합니다.(위의 설명은 null일 경우 발생 되는 동작들 입니다)

#### Optional 잘못된 사용법
1. 잘못된 예
<pre><code>
public String getCityOfMemberFromOrder(Order order) {
	Optional<Order> maybeOrder = Optional.ofNullable(order);
	if (maybeOrder.isPresent()) {
		Optional<Member> maybeMember = Optional.ofNullable(maybeOrder.get());
		if (maybeMember.isPresent()) {
			Optional<Address> maybeAddress = Optional.ofNullable(maybeMember.get());
			if (maybeAddress.isPresent()) {
				Address address = maybeAddress.get();
				Optinal<String> maybeCity = Optional.ofNullable(address.getCity());
				if (maybeCity.isPresent()) {
					return maybeCity.get();
				}
			}
		}
	}
	return "Seoul";
}
</code></pre>

2. 맞는 예
<pre><code>
int length = Optional.ofNullable(getText()).map(String::length).orElse(0);
</code></pre>

- 함수형 사고로 코드를 작성하십시오
- null처리를 if문으로 자신이 직접 하지 말고 Optional에게 위임을 하십시오.
- null을 체크 하지 마십시오. Optional 대신 해줍니다.

#### Stream처럼 사용하기
1. map()
<pre><code>
public String getCityOfMemberFromOrder(Order order) {
	return Optional.ofNullable(order)
			.map(Order::getMember)
			.map(Member::getAddress)
			.map(Address::getCity)
			.orElse("Seoul");
}
</code></pre>
- 앞선 나온 코드보다 간결하고 명확 해집니다.
- ofNullable()로 null이면 null 객체면 객체를 반환 해줍니다.
- map()을 통하여 객체를 3번 변환 해줍니다. Optional<Order> -> Optional<Member> -> Optional<Address> -> Optional<String> (함수형 프로그래밍)
- orElse() 메소드를 통하여 null일 경우 디폴트 값으로 객체를 생성합니다.
- NPE를 방지 하였습니다.

2. filler()
<pre><code>
public Member getMemberIfOrderWithin(Order order, int min) {
	if (order != null && order.getDate().getTime() > System.currentTimeMillis() - min * 1000) {
		return order.getMember();
	}
}

변환 후

public Optional<Member> getMemberIfOrderWithin(Order order, int min) {
	return Optional.ofNullable(order)
			.filter(o -> o.getDate().getTime() > System.currentTimeMillis() - min * 1000)
			.map(Order::getMember);
}
</code></pre>
- null 체크로 시작하는 if 조건문 패턴문을 없애버릴수 있습니다.
- filter() 메소드를 사용하면 if 조건문 없이 메소드 연쇄 호출만으로도 좀 더 읽기 편한 코드를 작성할 수 있습니다.
- filter() 메소드는 넘어온 함수형 인자의 리턴 값이 false인 경우, Optional을 비워버리므로 그 이후 메소드 호출은 의미가 없어지게 됩니다.
3. ifPresent()
4. isPresent()


참조
1. 자바 8 Optional 1부 : http://www.daleseo.com/java8-optional-before/
2. 자바 8 Optional 2부 : http://www.daleseo.com/java8-optional-after/
3. 자바 8 Optional 3부 : http://www.daleseo.com/java8-optional-effective/
4. NPE(NULL POINTER EXCEPTION) : https://okky.kr/article/13824
5. NPE(NULL POINTER EXCEPTION) : https://m.blog.naver.com/PostView.nhn?blogId=sangrime&logNo=220627761646&proxyReferer=https%3A%2F%2Fwww.google.es%2F
