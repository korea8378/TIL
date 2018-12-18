# JAVA8

## 12월 18일

### 2장 동작 파라미터화 코드 전달하기

#### 동작 파라미터화
* 자주 바뀌는 요구사항에 효과적으로 대응 할 수 있다.
* 아직은 어떻게 실행할 것인지 결정하지 않은 코드 블록을 의미

#### 일반적인 변화하는 요구사항 해결
* 중복되는 코드가 발생이 된다.
<pre><code>
public static List<Apple> filterApplesByWeight(List<Apple> inventory, int weight) {
	List<Apple> result = new ArrayList<>();
	for (Apple apple : inventory) {
		if(apple.getWeight() > weight) {
			result.add(apple);
		}
	}
	return result;
}


public static List<Apple> filterApplesByColor(List<Apple> inventory, String color) {
	List<Apple> result = new ArrayList<>();
	for (Apple apple : inventory) {
		if(apple.getColor.equals(color) {
			result.add(apple);
		}
	}
	return result;
}
</code></pre>

#### 동작파라미터화를 사용하여 변화하는 요구사항 해결
* 프리디케이트 동작
* 선택 조건을 결정하는 인터페이스를 정의
* 전략 디자인 패턴을 사용
<pre><code>
public interface AppleRredicate {
	boolean test (Apple apple);
}

Public class AppleHeavyWeightPredicate implements ApplePredicate {
	public boolean test(Apple apple) {
		return apple.getWeight() > 150;
	}
}

Public class AppleGreenColorPredicate implements ApplePredicate {
	public boolean test(Apple apple) {
		return “green”.equals(apple.getColor());
	}
}

Public static List<Apple> filterApples(List<Apple> inventory, ApplePredicate P) {
	List<Apple> result = new ArrayList<>();
	for(Apple apple: inventory) {
		if(p.test(apple)) {
			result.add(apple);
		}
	}
	return result;
}
</code></pre>

#### 람다 표현식 사용
<pre><code>
Thread t = new Thread(new Runnable() {
	public void run() {
		System.out.println(“Hello world”);
	}
});

Thread t = new Thread(() -> System.out.println(“Hello world”));
</code></pre>

#### 요약
* 동작 파라미터화에서는 메서드 내부적으로 다양한 동작을 수행할 수 있도록 코드를 메서드 인수로 전달한다.
* 동작 파라미터화를 이용하면 변화하는 요구사항에 더 잘 대응할 수 있는 코드를 구현할 수 있으면 나중에 엔지니어링 비용을 줄일 수 있다.
* 코드 전달 기법을 이용하면 동작을 메서드의 인수로 전달할 수 있다. 하지만 자바 8 이전에는 코드를 지저분하게 구현해야 했다. 익명 클래스로도 어느정도 코드를 깔끔하게 만들 수 있지만 자바 8에서는 인터페이스를 상속받아 여러 클래스를 구현해야 하는 수고를 없앨 수 있는 방법을 제공한다.
* 자바 API의 많은 메서드는 정렬, 스레드, GUI 처리 등을 포함한 다양한 동작으로 파라미터화 할 수 있다.