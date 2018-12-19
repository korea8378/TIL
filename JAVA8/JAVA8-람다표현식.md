# JAVA8

## 12월 18일

### 3장 람다 표현식

#### 람다 표현식
* 메서드로 전달할 수 있는 익명 함수를 단순화한 것
* 익명 : 이름이 없다.
* 함수 : 특정클래스에 종속되지 않는다. 파라미터 리스트, 바디, 반환형식, 예외리스트를 가지고 있다.
* 전달 : 메서드 인수로 전달하거나 변수로 저장 할 수 있다.
* 간결성 : 자질구레한 코드를 구현할 필요가 없다.
<pre><code>
Comparator<Apple> byWeight = new Comparator<Apple>() {
	public int compare(Apple a1, Apple a2) {
		return a1.getWeight().compareTo(a2.getWeight());
	}
};

Comparator<Apple> byWeight = (Apple a1, Apple a2) -> a1.getWeight().compareTo(a2.getWeight());
</code></pre>

#### 람다
* 파라미터 리스트, 화살표, 람다의 바디로 구성

#### 함수 디스크립터
* 람다 표현식의 시그너처를 서술하는 메서드
* () -> void : 매개변수와 반환이 없는 시그니처(특징)
* (Apple, Apple) -> int : 두개의 Apple을 인수, int를 반환

#### 하나의 추상메소드를 갖는 인터페이스
* 람다 사용 예(실행 어라운드 패턴)
<pre><code>
public static String processFile() throws IOException {
	try (BufferedReader br = 
			new BufferedReader(new FileReader(“data.txt”))) {
				return br.readLine();
	}
}

public interface BufferedReaderProcessor {
	String process(BufferedReader b) throws IOException;
}

public static String processFile(BufferedReaderProcessor p) throws
	IOException {
			….
	}
}

public static String processFile(BufferedReaderProcessor p) 
	throws IOException {
	try (BufferedReader br =
		new BufferedReader(new FileReader(“data.txt”))) {
		return p.process(br);
	}
}

String oneLine = processFile ((BufferedReader br) ->
							br.readLine());

String twoLines = processFile ((BufferedReader br) ->
							br.readLine()) + br.readLine());
</code></pre>

#### 함수형 인터페이스
* 자바8에는 이미 다양한 하나의 추상메소드를 갖는 인터페이스가 정의되어 있다.
* Predicate(boolean), Runnable, Callable, Consumer 등

#### 람다 표현식 형식 검사
* 람다 표현식의 형식을 대상형식이라고 부른다.
<pre><code>
List<Apple> heavierThan150g = 
			filter(inventory, (Apple a) -> a.getWeight() > 150);

1.filter 메서드의 선언을 확인한다.
2.filter 메서드는 두 번째 파라미터로 Predicate<Apple> 형식(대상 형식)을 기대한다.
3.Predicate<Apple>은 test라는 한 개의 추상 메서드를 정의하는 함수형 인터페이스이다.
4.test 메서드는 Apple을 받아 boolean을 반환하는 함수 디스크립터를 묘사한다.
5.filter 메서드로 전달된 인수는 이와 같은 요구사항을 만족해야 한다.
</code></pre>

#### 메서드 레퍼런스
* 메서드 레퍼런스를 이용하면 기존의 메서드 정의를 재활용해서 람다처럼 전달할 수 있다.
<pre><code>
inventory.sort((Apple a1, Apple a2) -> a1.getWeight().compareTo(a2.getWeight()));

Java.utill.Comparator.comparing을 활용한 코드
inventory.sort(comparing(Apple::getWeight));
</code></pre>
#### 생성자 레퍼런스

