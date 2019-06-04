# JAVA

## 6월 4일

### 아이템2.생성자에 매개변수가 많다면 빌더를 고려하라

#### 정적 팩터리와 생성자
- 정적 팩터리와 생성자에는 똑같은 제약이 하나 있다.
- 선택적 매개변수가 많을때 적절히 대응하기 어렵다는 점이다.
- ex) 영양정보
    - 1회 내용량, 총 n회 제공량, 1회 제공량당 칼로리 같은 필수 항목 몇 개와 총 지방, 트랜스지방, 포화지방 등 총 20개가 넘는 선택항목으로 이루어져 있다.
- 영양정보를 점층적 생성자 패턴을 사용하여 구현 할 수 있다.

#### 점층적 생성자 패턴
- 필수 매개변수만 받는 생성자, 필수 매개변수와 선택 매개변수 1개를 받는 생성자, 선택 매개변수를 2개까지 받는 생성자 등등
```{.java}
public class NutritionFacts {
	private final int servingSize;
	private final int servings;
	private final int calories;
	private final int fat;
	private final int sodium;
	private final int carbohydrate;

	public NutritionFacts(int servingSize, int servings) {
		this(servingSize, servings, 0);
	}

	public NutritionFacts(int servingsSize, int servings, int calories) {
		this(servingSize, servings, calories, 0);
	}

	public NutritionFacts(int servingsSize, int servings, int calories, int fat) {
		this(servingSize, servings, calories, fat, 0);
	}

	public NutritionFacts(int servingsSize, int servings, int calories, int fat, int sodium) {
		this(servingSize, servings, calories, fat, sodium, 0);
	}
	
	public NutritionFacts(int servingsSize, int servings, int calories, int fat, int sodium, int carbohydrate) {
		this(servingSize, servings, calories, fat, sodium, carbohydrate, 0);
	}
}

	NutritionFacts cocaCola = new NutritionFacts(240, 8, 100, 0, 35, 27);
```
- 단점
    - 점층적 생성자는 사용자가 설정하길 원치 않는 매개변수까지 포함하기 쉬운데, 어쩔 수 없이 그런 매개변수에도 값을 지정해줘야 한다.
    - `점층적 생성자 패턴도 쓸 수는 있지만, 매개변수 개수가 많아지면 클라이너트 코드를 작성하거나 읽기 어렵다`
    - 코드를 읽을 때 각 값의 의미가 무엇인지 헷갈릴 것이고, 매개변수가 몇 개인지도 주의해서 세어 보아야 할 것이다.
    - 클라이언트가 실수로 매개변수의 순서를 바꿔 건네줘도 컴파일러는 알아채지 못하고, 결국 런타임에 엉뚱한 동작을 하게 된다.

#### 자바빈즈 패턴(setter)
- 매개변수가 없는 생성자로 객체를 만든 후, 세터(setter) 메서드들을 호출해 원하는 매개변수의 값을 설정하는 방식이다.
```{.java}
public class NutritionFacts {
	private final int servingSize = -1;
	private final int servings = -1;
	private final int calories = 0;
	private final int fat = 0;
	private final int sodium = 0;
	private final int carbohydrate = 0;

	public NutritionFacts() {}

	public void setServingSize(int val) {
		servingSize = val;
	}

	public void setServings(int val) {
		servings = val;
	}

	public void setCalories(int val) {
		calories = val;
	}

	public void setFat(int val) {
		fat = val;
	}

	public void setSodium(int val) {
		sodium = val;
	}

	public void setCarbohydrate(int val) {
		carbohydrate = val;
	}
}

	NutritionFacts cocaCola = new NutritionFacts();
	cocaCola.setServingSize(240);
	cocaCola.setServings(8);
	cocaCola.setCalories(100);
	cocaCola.setSodium(35);
	cocaCola.setCarbohydrate(27);
```
- 점층적 생성자 패턴의 단점들이 자바빈즈 패턴에서는 더 이상 보이지 않는다.
- 코드가 길어지긴 했지만 인스턴스를 만들기 쉽고, 그 결과 더 읽기 쉬운 코드가 되었다.
- 단점
    - `자바빈즈 패턴에서는 객체 하나를 만들려면 메서드를 여러 개 호출해야 하고, 객체가 완전히 생성되기 전까지는 일관성이 무너진 상태에 놓이게 된다`
    - 점층적 생성자 패턴에서는 매개변수들이 유효한지를 생성자에서만 확인하면 일관성을 유지할 수 있었는데, 그 장치가 완전히 사라진 것이다.
    - 일관성이 깨진 객체가 만들어지면, 버그를 심은 코드와 그 버그 때문에 런타임에 문제를 겪는 코드가 물리적으로 멀리 떨어져 있을 것이므로 디버깅도 만만치 않다.
    - 이처럼 일관성이 무너지는 문제 때문에 자바빈즈 패턴에서는 클래스를 불편으로 만들 수 없으면 스레드 안정성을 얻으려면 프로그래머가 추가 작업을 해줘야만 한다.

#### 빌더패턴
- 점층적 생성자 패턴의 안전성과 자바 빈즈 패턴의 가독성을 겸비한 빌더 패턴이다.
- 클라이언트는 필요한 객체를 직접 만드는 대신, 필수 매개변수만으로 생성자를 호출해 빌더 객체를 얻는다.
- 그런 다음 빌더 객체가 제공하는 일종의 세터 메서드들로 원하는 선택 매개변수들을 설정한다.
- 마지막으로 매개변수 없는 build 메서드를 호출해 필요한 객체를 얻는다.
```{.java}
public class NutritionFacts {
	private final int servingSize;
	private final int servings;
	private final int calories;
	private final int fat;
	private final int sodium;
	private final int carbohydrate;

	public static class Builder {
		
		private final int servingSize;
		private final int servings;
		
		private int calories = 0;
		private int fat = 0;
		private int sodium = 0;
		private int. carbohydrate = 0;

		public Builder(int servingSize, int servings) {
			this.servingSize = servingsSize;
			this.servings = servings;
		}
		
		public Builder calories(int val) {
			calories = val;
			return this;
		}
		
		public Builder fat(int val) {
			fat = val;
			return this;
		}

		public Builder sodium(int val) {
			sodium = val;
			return this;
		}

		public Builder carbohydrate(int val) {
			carbohydrate = val;
			return this;
		}

		public NutritionFacts build() {
			return new NutritionFacts(this);
		}	
	}
	
	private NutritionFacts(Builder builder) {
		servingSize = builder.servingSize;
		servings = builder.servings;
		calories = builder.calories;
		fat = builder.fat;
		sodium = builder.sodium;
		carbohydrate = builder.carbohydrate;
	}
}

	NutritionFacts cocaCola = new NutritionFacts.Builder(240, 8)
		.calories(100).sodium(35).carbohydrate(27).build();
```
- NutritionFacts 클래스는 불변이며, 모든 매개변수의 기본값들을 한곳에 모아뒀다.
- 빌더의 세터 메서드들은 빌더 자신을 반환하기 때문에 연쇄적으로 호출 할 수 있다.
- 이런 방식을 메서드 호출이 흐르듯 연결된다는 뜻으로 플루언트 API 혹은 메서드 연쇄라 한다.
- 장점
    - 빌더 패턴은 쓰기 쉽고, 무엇보다도 읽기 쉽다.
    - 빌더 패턴은 계층적으로 설계된 클래스와 함께 쓰기에 좋다.
    - 빌더 패턴은 상당히 유연하다. 빌더 하나로 여러 객체를 순회하면서 만들수 있고, 빌더에 넘기는 매개변수에 따라 다른 객체를 만들 수도 있다.
    - 객체마다 부여되는 일련번호와 특정 필드는 빌더가 알아서 채우도록 할 수도 있다.
- 단점
    - 객체를 만들려면, 빌더부터 만들어야 한다.
    - 빌더 생성 비용이 크지는 않지만 성능에 민감한 상황에서는 문제가 될 수 있다.
    - 또한 점층적 생성자 패턴보다는 코드가 장황해서 매개변수가 4개 이상은 되어야 값어치를 한다.

#### 계층적으로 설계괸 클래스와 어울리는 빌더패턴
- 각 계층의 클래스에 관련 빌더를 멤버로 정의하자. 추상클래스는 추상 빌더를, 구체 클래스는 구체 빌더를 갖게 한다.
```{.java}
public abstract class Pizza {
	public enum Topping { HAM, MUSHROOM, ONION, PEPPER, SAUSAGE }
	final set<Topping> toppings;

	abstract static class Builder<T extends Builder<T>> {
		EnumSet<Topping> toppings = EnumSet.noneOf(Topping.class);
		public T addTopping(Topping topping) {
			toppings.add(Objects.requireNonNull(topping));
			return self();
		}

		abstract Pizza build();

		protected abstract T self();
	}
	
	Pizza(Builder<?> builder) {
		toppings = builder.toppings.clone();
	}
}

public class NyPizza extends Pizza {
	public enum Size { SMALL, MEDIUM, LARGE }
	private final Size size;
	
	public static class Builder extends Pizza.Builder<Builder> {
		private final Size size;
		
		public Builder(Size size)	{
			this.size = Objects.requireNonNull(size);
		}
		
		@Override
		public NyPizza build() {
			return new NyPizza(this);
		}
		
		@Override
		protected Builder self() {
			return this;
		}
	}
	
	private NyPizza(Builder builder) {
		super(builder);
		size = builder.size;
	}
}

public class Calzone extends Pizza {
	private final boolean sauceInside;
	
	public static class Builder extends Pizza.Builder<Builder> {
		private boolean sauceInside = false;
		
		public Builder sauceInside() {
			this.sauceInside = true;
			return this;
		}
		
		@Override
		public Calzone build() {
			return new Calzone(this);
		}
		
		@Override
		protected Builder self() {
			return this;
		}
	}
	
	private Calzone(Builder builder) {
		super(builder);
		this.sauceInside = builder.sauceInside;
	}
}

	NyPizza pizza = new NyPizza.BUilder(SMALL)
			.addTopping(SAUSAGE).addTopping(ONION).build();
	Calzone calzone = new Calzone.Builder()
			.addTopping(HAM).sauceInside.build();

```

#### 핵심정리
- `생성자나 정적 팩터리가 처리해야 할 매개변수가 많다면 빌더 패턴을 선택하는 게 더 낫다.`
- 매개변수 중 다수가 필수가 아니거나 같은 타입이면 특히 더 그렇다. 빌더는 점층적 생성자보다 클라이언트 코드를 읽고 쓰기가 훨씬 간결하고, 자비빈즈보다 훨씬 안전하다.
