# JAVA8

## 6월 23일

### 스트림으로 데이터 수집

#### Collection, Collector, collect
- Collection : 자바의 다양한 자료구조를 이용할수 있도록 해주는 인터페이스
    - List, Map, Set 등등
- collect : Collector를 매개변수로 하는 Stream의 최종 연산
- Collector : Stream의 collect에서 필요한 메서드를 저의해 놓은 인터페이스
- Collectors : Collector의 다양한 기능을 구현한 클래스
```{.java}
// 통화별로 트랜잭션을 그룹화한 코드
Map<Currency, List<Transaction>> transactionByCurrencies = 
												new HashMap<>();
for (Transaction transaction : transactions) {
	Currency currency = transaction.getCurrency();
	List<Transaction> transactionsForCurrency =
								transactionsByCurrencies.get(currency);
	if (transactionsForCurrency == null) {
		transactionsForCurrency = new ArrayList<>();
		transactionsByCurrencies
							.put(currency, transactionsForCurrency);
	}
	transactionsForCurrency.add(transaction);
}

//stream을 이용한 그룹화한 코드
Map<Currency, List<Transaction>> transactionByCurrencies = 
	transactions.stream().collect(groupingBy(Transaction::getCurrency));
```

#### 컬렉터(Collector)
- 함수형 프로그래밍에서는 ‘무엇’을 원하는지 직접 명시할 수 있어서 어떤 방법으로 이를 얻을지는 신경 쓸 필요가 없다.
- Collector 인터페이스 구현은 스트림의 요소를 어떤 식으로 도출할지 지정한다.
- 다수준으로 그룹화를 수행할 때 명령형 프로그래밍과 함수형 프로그래밍의 차이점이 더욱 두드러진다.
- 명령형 코드에서는 문제를 해결하는 과정에서 다중 루프와 조건문을 추가하며 가독성과 유지보수성이 크게 떨어진다.
- 스트림에 collect를 호출하면 스트림의 요소에 리듀싱 연산이 수행된다.
- Collectors 유틸리티 클래스는 자주 사용하는 켈렉터 인스턴스를 손쉽게 생성할 수 있는 정적 팩토리 메서드를 제공한다.

#### Collectors
- Collectors에서 제공하는 메서드의 기능은 크게 세 가지로 구분할 수 있다.
    - 스트림요소를 하나의 값으로 리듀스하고 요약
    - 요소 그룹화
    - 요소 분할

#### 리듀싱과 요약
- 컬렉터로 스트림의 모든 항목을 하나의 결과로 합칠 수 있다.
```{.java}
//counting
long howManyDishes = menu.stream().collect(Collectors.counting());
long howManyDishes = menu.stream().count();

//maxBy
Comparator<Dish> dishCaloriesComparator =
	Comparator.comparingInt(Dish::getCalories);
Optional<Dish> mostCalorieDish =
		menu.stream()
			.collect(maxBy(dishCaloriesComparator));
```
- 스트림에 있는 객체의 숫자 필드의 합계나 평균등을 반환하는 연산에도 리듀싱 기능이 자주 사용된다. 이러한 연산을 요약 연산이라 부른다.
```{.java}
//요약 연산
//summingInt
int totalCalories = menu.stream().collect(summingInt(Dish::getCalories));

//averagingInt
double avgCalories =
	menu.stream().collect(averagingInt(Dish::getCalories));

//summarizingInt(종합적으로 제공)
IntSummaryStatistics menuStatistics =
	menu.stream().collect(summarizingInt(Dish::getCalories));
IntSummaryStatistics { count=9, sum=4300, min=120, average=477.777778, max=800}

//joining(문자열 연결)
//스트림의 각 객체에 toString 메서드를 호출해서 추출한 모든 문자열을 하나의 문자열로 연결해서 반환한다.(내부적으로 StringBuilder사용)
String shortMenu = menu.stream().map(Dish::getName).collect(joining());
String shortMenu = menu.stream().collect(joining());//toString이 정의 되어있으면 사용 가능
String shortMenu = menu.stream().map(Dish::getName).collect(joining(“, “));//요소 사이의 구분 문자열을 넣어 줄 수 있다.


```

