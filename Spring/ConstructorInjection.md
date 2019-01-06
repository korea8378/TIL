# Spring

## 01월 06일

### Constructor Injection

#### Constructor injection VS Field injection

#### 생성자(Constructor)
<pre><code>
private DependencyA dependencyA;
private DependencyB dependencyB;
private DependencyC dependencyC;

@Autowired
public DI(DependencyA dependencyA, DependencyB dependencyB, DependencyC dependencyC) {
    this.dependencyA = dependencyA;
    this.dependencyB = dependencyB;
    this.dependencyC = dependencyC;
}
</code></pre>

#### 설정자(setter)
<pre><code>
private DependencyA dependencyA;
private DependencyB dependencyB;
private DependencyC dependencyC;

@Autowired
public void setDependencyA(DependencyA dependencyA) {
    this.dependencyA = dependencyA;
}

@Autowired
public void setDependencyB(DependencyB dependencyB) {
    this.dependencyB = dependencyB;
}

@Autowired
public void setDependencyC(DependencyC dependencyC) {
    this.dependencyC = dependencyC;
}
</code></pre>

#### 필드(field)
<pre><code>
@Autowired
private DependencyA dependencyA;

@Autowired
private DependencyB dependencyB;

@Autowired
private DependencyC dependencyC;
</code></pre>

#### @Autowired
- 매우 짧고 간결하게 사용 할 수 있다.
- 단일 책임 원칙 위반 : 새로운 의존성을 제한없이 계속해서 추가 할수 있는데 아무런 문제가 없다. 생성자를 사용하게 된다면 매개변수의 수를 보고 무엇인가 잘 못 되었다는 것을 파악 할 수 있습니다. 많은 의존성을 추가하 된다면 해당 클래스에 많은 책임이 있다고 판단 할 수 있다.
- 의존성 숨기기 : DI 컨테이너를 통해 의존성을 외부에서 만들어져 주입을 받게 됩니다. DI컨테이너가 바뀌게되면 의존성이 변동이 되기 때문에 DI컨테이너를 의존하게 됩니다. 이 클래스가 요구하는 의존성이 무엇인지 생성자와 선택자를 통해 명시를 해주어야 합니다.
- DI 컨테이너 커플 링 : 관리되는 클래스는 DI 컨테이너에 의존적으로 만들어지면 안된다. DI 컨테이너를 사용하지 않고도 인스턴스화 할 수 있고, 단위 테스트도 가능하며, 다른 DI 프레임 워크로 전환할 수도 있게 된다.
- 불변성 : 필드 주입은 final 키워드를 사용 할 수 없기 때문에 변동 될 수 있는 가능성이 있다
생성자

