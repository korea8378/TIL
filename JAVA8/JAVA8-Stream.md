# JAVA8

## 1월 22일

### 스트림

#### 컬렉션
- 거의 모든 자바 애플리케이션은 컬렉션을 만들고 처리하는 과정을 포함한다.
- 컬렉션으로 데이터를 그룹화하고 처리할 수 있다.
- 많은 요소를 포함하는 커다란 컬렉션의 처리는? 병렬로 컬렉션의 요소를 처리해야한다.(병렬 처리 코드를 구현하는 것은 복잡하고 어렵다)

#### 스트림
- 스트림이란? 데이터 처리 연산을 지원하도록 소스에서 추출된 연속된 요소
- 스트림을 이용하면 선언형으로 컬렉션 데이터를 처리 할 수 있다.
- 스트림을 이용하면 스레드 코드를 구현하지 않아도 데이터를 투명하게 병렬로 처리 할 수 있다.

#### 자바 7의 컬렉션 처리 코드
<pre><code>
List<Dish> lowCaloricDishes = new ArrayList<>();
for(Dish d : menu) {
	if(d.getCalories() < 400) {
		lowCaloricDishes.add(d);
	}
}

Collections.sort(lowCaloricDishes, new Comparator<Dish>() {
	public int compare(Dish d1, Dish d2) {
		return Integer.compare(d1.getCalories(), d2.getCalories());
	}
});

List<String> lowCaloricDishesName = new ArrayList<>();
for(Dish d : lowCaloricDishes) {
	lowCaloricDishesName.add(d.getName());
}
</code></pre>

#### 자바 8의 스트림 처리 코드
<pre><code>
List<String> lowCaloricDishesName =
			menu.stream()
				.filter(d -> d.getCalories() < 400)
				.sorted(comparing(Dish::getCalories))
				.map(Dish::getName)
				.collect(toList());
</code></pre>
-stream()을 parallelStream()으로 바꾸면 이 코드를 멀티코어 아키텍처에서 병렬로 실행 할 수 있다.

#### 스트림 API 특징
- 선언형 : 더 간결하고 가독성이 좋아진다.
- 조립 할 수 있음 : 유연성이 좋아진다.
- 병렬화 : 성능이 좋아진다.

#### 컬렉션과 스트림 차이점
- 스트림은 딱 한번만 사용 가능하다.
- 컬렉션은 외부 반복이다.
- 스트림은 내부 반복이다.

#### 스트림 3가지 요소
- 질의를 수행할 데이터소스
- 스트림 파이프라인을 구성할 중간 연산 연결
- 스트림 파이프라인을 실행하고 결과를 만들 최종 연산

#### 요약
- 스트림은 소스에서 추출된 연속 요소로, 데이터 처리 연산을 지원한다.
- 스트림은 내부 반복을 지원한다. 내부 반복은 filter, map, storted 등의 연산으로 반복을 추상화한다.
- 스트림에는 중간 연산과 최종 연산이 있다.
- filter와 map처럼 스트림을 반환하면서 다른 연산과 연결될 수 있는 연산을 중간 연산이 라고 한다. 중간 연산을 이용해서 파이프라인을 구성할 수 있지만 중간 연산으로 어떤 결과도 생성할 수 없다.
- forEach나 count처럼 스트림 파이프라인을 처리해서 스트림이 아닌 결과를 반환하는 연산을 최종 연산이라고 한다.
- 스트림의 요소는 요청할 때만 계산된다.
