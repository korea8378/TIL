# JAVA

## 6월 11일

### 아이템11.equals를 재정의하려거든 hashCode도 재정의하라.

#### hashCode
- `equals를 재정의한 클래스 모두에서 hashCode도 재정의해야 한다.`
- hashCode 일반 규약을 어기게 되면 클래스의 인스턴스를 HashMap이나 HashSet 같은 컬렉션의 원소로 사용할 때 문제를 일으킬 것이다.
- Object 명세에서의 규약
    - equals 비교에 사용되는 정보가 변경되지 않았다며, 애플리케이션이 실행되는 동안 그 객체의 hashCode 메서드는 몇 번을 호출해도 일관되게 항상 같은 값을 반환해야 한다. 단, 애플리케이션을 다시 실행한다면 이 값이 달라져도 상관없다.
    - equals(Object)가 두 객체를 같다고 판단했다면, 두 객체의 hashCode는 똑같은 값을 반환해야 한다.
    - equals(Object)가 두 객체를 다르다고 판단했더라도, 두 객체의 hashCode가 서로 다른 값을 반환할 필요는 없다. 단, 다른 객체에 대해서는 다른 값을 반환해야 해시테이블의 성능이 좋아진다.
- `hashCode 재정의를 잘못했을 때 크게 문제가 되는 조항은 두 번째다. 즉, 논리적으로 같은 객체는 같은 해시코드를 반환해야 한다.`
```{.java}
//hashCode를 재정의 하지 않았다면 m.get시 null이 반환된다.
Map<PhoneNumber, String> m = new HashMap<>();
m.put(new PhoneNumber(707, 867, 5309), “제니”);
m.get(new PhoneNumber(707, 867, 5309));
```
- 위 문제를 해결하려면 적절한 hashCode 메서드만 작성해주면 된다.

#### 전형적인 hashCode 메서드
```{.java}
@Override
public int hashCode() {
	int result = Short.hashCode(areaCode);
	result = 31 * result * Short.hashCode(prefix);
	result = 31 * result * short.hashCode(lineNum);
	return result;
}
```
- 파생 필드는 해시코드 계산에서 제외해도 된다. 즉, 다른 필드로부터 계싼해 낼 수 있는 필드는 모두 무시해도 된다.
- equals 비교에 사용되지 않은 필드는 `반드시` 제외해야 한다.
- `성능을 높인답시고 해시코드를 계산할 때 핵심 필드를 생략 해서는 안 된다.`
- `hashCode가 반환하는 값의 생성 규칙을 API 사용자에게 자세히 공표하지말자. 그래야 클라이언트가 이 값에 의지하지 않게 되고, 추후에 계산 방식을 바꿀 수도 있다.`

#### 핵심 정리
- `equals를 재정의할 때는 hashCode도 반드시 재정의해야 한다. 그렇지 않으면 프로그램이 제대로 동작하지 않을 것이다.`
- `재정의한 hashCode는 Object의 API 문서에 기술된일반 규약을 따라야 하며, 서로 다른 인스턴스라면 되도록 해시코드도 서로 다르게 구현해야 한다.`
