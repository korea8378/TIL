# JAVA

## 6월 6일

### 아이템5.자원을 직접 명시하지 말고 의존 객체 주입을 사용하라

#### 의존하는 자원
- 많은 클래스가 하나 이상의 자원에 의존한다. 가령 맞춤법 검사기는 사전에 의존하는데, 이런 클래스를 정적 유틸리티 클래스로 구현한 모습을 드물지 않게 볼 수 있다
- 싱글턴으로 구현하는 경우도 흔하다.
```{.java}
//정적 유틸리티를 잘못 사용한 예 - 유연하지 않고 테스트하기 어렵다.
public class SpellChecker {
	private static final Lexicon dictionary = …;

	private SpellChecker() {}

	public static boolean isValid(String word) { … }
	public static List<String> suggestions(String typo) { … }

}

//싱글턴을 잘못 사용한 예 - 유연하지 않고 테스트하기 어렵다.
public class SpellChecker {
	private final Lexicon dictionary = …;
	
	private SpellChecker(…) {}
	public static SpellChecker INSTANCE = new SpellChecker(…);
	
	public boolean isValid(String word) {…}
	public List<String> suggestions(String typo) {…}
}
```
- 두 방식 모두 사전을 단 하나만 사용한다고 가정한다는 점에서 그리 훌륭해 보이지 않는다.
- 실전에서는 사전이 언어별로 따로 있고 특수 어휘용 사전을 별도로 두기도 한다.
- 또한 테스트용 사전도 필요할 수 있다.
- 간단히 필드에서 final 한정자를 제거하고 다른 사전으로 교체하는 메서드를 추가할 수 있지만, 아쉽게도 이 방식은 어색하고 오류를 내기 쉬우면 멀트스레드 환경에서는 쓸 수 없다.
- `사용하는 자원에 따라 동작이 달라지는 클래스에는 정적 유틸리티 클래스나 싱글턴 방식이 적합하지 않다.   

#### 해결 방법(의존 객체 주입)
- `인스턴스를 생성할 때 생성자에 필요한 자원을 넘겨주는 방식으로 하자`
```{.java}
//의존 객체 주입은 유연성과 테스트 용이성을 높여준다.
public class SpellChecker {
	private final Lexicon dictionary;
	
	public SpellChecker(Lexicon dictionary) {
		this.dictionary = Objects.requireNonNull(dictionary);
	}

	public boolean isValid(String word) {…}
	public List<String> suggestions(String typo) {…}
}
```
- dictionary라는 딱 하나의 자원만 사용하지만, 자원이 몇 개든 의존 관계가 어떻든 상관없이 잘 작동한다.
- 또한 불변을 보장하여 여러 클라이언트가 의존 객체들을 안심하고 공유할 수 있기도 하다.
- 의존 객체 주입은 생성자, 정적팩터리, 빌더 모두에 똑같이 응용할 수 있다.
- 이 패턴의 쓸만한 변형으로, 팩터리 메서드 패턴이 있다.
    - 생성자에 자원 팩터리를 넘겨주는 방식으로, 팩터리란 호출할 때마다 특정 타입의 인스턴스를 반복해서 만들어주는 객체를 말한다.
- 의존 객체 주입이 유연성과 테스트 용이성을 개선해주긴 하지만, 의존성이 수천 개나 되는 큰 프로젝트에서는 코드를 어지럽게 만들기도 한다.
- 대거, 주스, 스프링 같은 의존 객체 주입 프레임워크를 사용하면 이런 어질러집을 해소할 수 있다.

#### 핵심 정리
- `클래스가 내부적으로 하나 이상의 자원에 의존하고, 그자원이 클래스에 동작에 영향을 준다면 싱글턴과 정적 유틸리티 클래스는 사용하지 않는 것이 좋다.`
- `이 자원들을 클래스가 직접 만들게 해서도 안된다.`
- `대신 필요한 자원을 생성자에 넘겨주자.`
- `의존 객체 주입이라 하는 이 기법은 클래스의 유연성, 재사용성, 테스트 용이성을 기막히게 개선해준다.`
