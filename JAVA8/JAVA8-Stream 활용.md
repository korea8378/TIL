# JAVA8

## 6월 18일

### 스트림 활용

#### 컬렉션
- 외부 반복
- 데이터를 저장
- 순차

#### 스트림
- 내부 반복
- 데이터 처리
- 순차, 병렬
- 스트림 API가 지원하는 다양한 연산
    - 필터링, 슬라이싱, 매핑, 검색, 매칭, 리듀싱등

#### 필터링과 슬라이싱
- 스트림 요소를 선택하는 방법

#### 프레디케이트로 필터링
- 스트림 인터페이스는 filter 메서드를 지원한다.
- filter 메서드는 프레디케이트(boolean을 반환하는 함수)를 인수로 받아서 프레디케이트와 일치하는 모든요소를 포함하는 스트림을 반환한다.
```{.java}
List<Dish> vegetarianMenu = menu.stream()
							.filter(Dish::isVegetarian)
							.collect(toList());
```

#### 고유 요소 필터링
- 스트림은 고유 요소로 이루어진 스트림을 반환하는 distinct라는 메서드도 지원한다.
```{.java}
List<Integer> numbers = Arrays.asList(1, 2, 1, 3, 3, 2, 4);
numbers.stream()
		.filter(I -> I % 2 == 0)
		.distinct()
		.forEach(System.out::println);
```

#### 스트림 축소
- 스트림은 주어진 사이즈 이하의 크기를 갖는 새로운 스트림을 반환하는 limit(n) 메서드를 지원한다.
```{.java}
List<Dish> dishes = menu.stream()
					.filter(d -> d.getCalories() > 300)
					.limit(3)
					.collect(toList());
```

#### 요소 건너뛰기
- 스트림은 처음 n개 요소를 제외한 스트림을 반환하는 skip(n)메서드를 지원한다.
```{.java}
List<Dish> dishes = menu.stream()
					.filter(d -> d.getCalories() > 300)
					.skip(2)
					.collect(toList());
```


#### 매핑
- 특정 객체에서 특정 데이터를 선택하는 작업은 데이터 처리 과정에서 자주 수행되는 연산이다.
- map 
- flatMap

#### 매칭(쇼트서킷)
- anyMatch : 적어도 한요소가 매칭
- allMatch : 모든요소가 매칭
- noneMatch : allMatch의 반대로 동작

#### 검색
- findAny, findFirst : 병렬실행에서는 첫 번째 요소를 찾기 어렵다. 따라서 요소의 반환 순서가 상관없다면 병렬 스트림에서는 제약이 적은 finAny를 사용한다.

#### 리듀싱
- 모든 스트림 요소를 처리해서 값으로 도출하는 연산
- 함수령 프로그래밍 용어로는 폴드
```{.java}

int sum = numbers.stream().reduce(0, (a, b) -> a + b);

// 간결한 버전
int sum = numbers.stream().reduce(0, Integer::sum);

// 초기값 없음
Optional<Integer> sum = numbers.stream().reduce(Integer::sum);
```
- Reduce는 두개의 인수를 갖는다.
    - 초기값 0
    - 두 요소를 조합해서 새로운 값을 만드는 BinaryOperator<T>
```{.java}
//최대값
Optional<Integer> max = numbers.stream().reduce(Integer::max);

//최솟값
Optional<Integer> min = numbers.stream().reduce(Integer::min);
```

#### 스트림 연산
- 상태 없음
    - map, filter 등은 입력 스트림에서 각 요소를 받아 0 또는 결과를 출력 스트림으로 보낸다.
    - 따라서 이들은 보통 상태가 없는, 즉 내부 상태를 갖지 않는 연산이다.
- 상태 있음
    - reduce, sum, mas, sorted, distinct 등은 모든 요소가 버퍼에 추가되어 있어야한다.
    - 스트림의 요소를 정렬하거나 중복을 제거하려면 과거의 이력을 알고 있어야 하기 때문이다.
    - 데이터 스트림의 크기가 크거나 무한이라면 문제가 생길 수 있다.(모든 소수를 포함하는 스트림을 역순으로 출력 할 경우)

#### 기본형 특화 스트림
```{.java}
//박싱 비용이 생긴다.(언박싱)
Optional<Integer> sum = numbers.stream().reduce(Integer::sum);

//사용 할 수 없는 코드
int calories = menu.stream()
				.map(Dish::getCalories)
				.sum();
```
- 위 코드처럼 sum 메서드를 직접 호출할 수 없다. map 메서드가 Stream<T>를 생성하기 때문이다.
- 스트림의 요소 형식은 Integer지만 인터페이스에는 sum 메서드가 없다.
    - ex)Stream<Dish> 형식의 요소만 있다면 sum이라는 연산을 수행할 수 없기 때문이다.
- 자바8에서는 세 가지 기본형 특화 스트림을 제공한다.
    - ex)int - IntStream, double - DoubleStream, long - LongStream
- 특화 스트림은 오직 박싱과정에서 일어나는 효율성과 관련 있으며 스트림에 추가 기능을 제공하진 않는다.
```{.java}
int calories = menu.stream()
				.mapToInt(Dish::getCalories)
				.sum();


//객체 스트림으로 복원하기
IntStream intstream = menu.stream()
				.mapToInt(Dish::getCalories);
Stream<Integer> stream = intStream.boxed();


//기본형 특화 스트림의 Optional
OptionalInt maxCalories = menu.stream()
				.mapToInt(Dish::getCalories)
				.max();
int max = maxCalories.roElse(1);			
```

#### 숫자 범위
- ex)1에서 100사이의 숫자를 생성하려 한다.
- 자바 8의 IntStream과 LongStream에서는 range와 rangeClosed라는 두 가지 정적 메서드를 제공한다.
- 두 메서드 모두 첫 번째 인수는 시작값을, 두 번째 인수로 종료값을 갖는다.
```{.java}
IntStream evenNumbers = IntStream.rangeClosed(1, 100)
							.filter(n -> n % 2 == 0);
System.out.println(evenNumbers.count());

rangeClosed(1, 100) - 1~100까지
range(1, 100) - 1~100까지(1과100을 포함하지 않음)
```

#### 스트림 만들기
- 다양한 방식으로 스트림을 만들 수 있다.
```{.java}
//값으로 스트림 만들기
Stream<String> stream = stream.of(“java 8”, “Lambdas”, “in”, “Action”);

//비어있는 스트림
Stream<String> emptyStream = Stream.empty();

//배열로 스트림 만들기
int[] numbers = {2, 3, 5, 7, 11, 13};
int sum = Arrays.stream(numbers).sum();

//파일로 스트림 만들기
Stream<String> lines = Files.lines(Paths.get(“data.txt”), Charset.defaultCharset());

//함수로 무한 스트림 만들기
Stream.iterate(0, n -> n + 2)
	.limit(10)
	.forEach(System.out::println);

Stream.generate(Math::random)
	.limit(5)
	.forEach(System.out::println);
```
