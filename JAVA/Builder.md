# JAVA

## 1월 06일

### Builder

#### Builder
- 빌더 패턴은 객체 생성을 깔끔하고 유연하게 하기 위한 기법

#### 점층적 생성자 패턴
- 생성자를 이용한 패턴
1. 필수 인자를 받는 필수 생성자를 하나 만든다.
2. 1 개의 선택적 인자를 받는 생성자를 추가한다.
3. 2 개의 선택적 인자를 받는 생성자를 추가한다.
4. …반복
5. 모든 선택적 인자를 다 받는 생성자를 추가한다.
<pre><code>
// 점층적 생성자 패턴 코드의 예 : 회원가입 관련 코드
public class Member {

    private final String name;      // 필수 인자
    private final String location;  // 선택적 인자
    private final String hobby;     // 선택적 인자

    // 필수 생성자
    public Member(String name) {
        this(name, "출신지역 비공개", "취미 비공개");
    }

    // 1 개의 선택적 인자를 받는 생성자
    public Member(String name, String location) {
        this(name, location, "취미 비공개");
    }

    // 모든 선택적 인자를 다 받는 생성자
    public Member(String name, String location, String hobby) {
        this.name = name;
        this.location = location;
        this.hobby = hobby;
    }
}
</code></pre>
- 장점
  - new Member("홍길동", "출신지역 비공개", "취미 비공개") 같은 호출이 빈번하게 일어난다면, new Member("홍길동")로 대체할 수 있다.
- 단점
  - 다른 생성자를 호출하는 생성자가 많으므로, 인자가 추가되는 일이 발생하면 코드를 수정하기 어렵다.
  - 코드 가독성이 떨어진다.
  - 특히 인자 수가 많을 때 호출 코드만 봐서는 의미를 알기 어렵다.

#### 자바빈 패턴
- setter메서드를 이용해 생성 코드를 읽기 좋게 만드는 것
<pre><code>
NutritionFacts cocaCola = new NutritionFacts();
cocaCola.setServingSize(240);
cocaCola.setServings(8);
cocaCola.setCalories(100);
cocaCola.setSodium(35);
cocaCola.setCarbohdydrate(27);
</code></pre>

- 장점
  - 이제 각 인자의 의미를 파악하기 쉬워졌다.
  - 복잡하게 여러 개의 생성자를 만들지 않아도 된다.
- 단점		
  - 객체 일관성(consistency)이 깨진다.
  - 1회의 호출로 객체 생성이 끝나지 않았다.
  - setter 메서드가 있으므로 변경 불가능(immutable)클래스를 만들 수가 없다.

#### 빌더 패턴
<pre><code>
// Effective Java의 Builder Pattern
public class NutritionFacts {
    private final int servingSize;
    private final int servings;
    private final int calories;
    private final int fat;
    private final int sodium;
    private final int carbohydrate;

    public static class Builder {
        // Required parameters(필수 인자)
        private final int servingSize;
        private final int servings;

        // Optional parameters - initialized to default values(선택적 인자는 기본값으로 초기화)
        private int calories      = 0;
        private int fat           = 0;
        private int carbohydrate  = 0;
        private int sodium        = 0;

        public Builder(int servingSize, int servings) {
            this.servingSize = servingSize;
            this.servings    = servings;
        }

        public Builder calories(int val) {
            calories = val;
            return this;    // 이렇게 하면 . 으로 체인을 이어갈 수 있다.
        }
        public Builder fat(int val) {
            fat = val;
            return this;
        }
        public Builder carbohydrate(int val) {
            carbohydrate = val;
            return this;
        }
        public Builder sodium(int val) {
            sodium = val;
            return this;
        }
        public NutritionFacts build() {
            return new NutritionFacts(this);
        }
    }

    private NutritionFacts(Builder builder) {
        servingSize  = builder.servingSize;
        servings     = builder.servings;
        calories     = builder.calories;
        fat          = builder.fat;
        sodium       = builder.sodium;
        carbohydrate = builder.carbohydrate;
    }
}

NutritionFacts cocaCola = new NutritionFacts
    .Builder(240, 8)   
    .calories(100)
    .sodium(35)
    .carbohydrate(27)
    .build();   
</code></pre>

- 장점
  - 각 인자가 어떤 의미인지 알기 쉽다.
  - setter 메소드가 없으므로 변경 불가능 객체를 만들 수 있다.
  - 한 번에 객체를 생성하므로 객체 일관성이 깨지지 않는다.
  - build() 함수가 잘못된 값이 입력되었는지 검증하게 할 수도 있다.

#### Lombok @Builder 
- @Builder 애노테이션을 위 builder패턴과 비슷한 패턴 코드로 컴파일 된다.
