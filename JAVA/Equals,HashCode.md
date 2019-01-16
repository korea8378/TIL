# JAVA

## 1월 16일

### Equals, hashCode

#### equals()
- 두 객체의 내용이 같은지 확인하는 Method

#### hashCode()
- 두 객체가 같은 객체인지 확인하는 Method

#### equals()
<pre><code>
class student {
	private int age;
	private String name;

	 public int getAge() {
		return age;
	}
	public void setAge(int age) {
		this.age = age;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}	
}

public static void main(String[] args){
	Student p1 = new Student();
	p1.setAge(27);
	p1.setName("YoungJae");

	Student p2 = new Student();
	p2.setAge(27);
	p2.setName("YoungJae");

	System.out.println(p1.equals(p2)); // false
}

</code></pre>
- 동일한 class(Student)와 동일한 값을 이용하여 객체를 생성했지만 false가 나온다.

#### Object에 정의된 Equals
<pre><code>
Public boolean equals(Object obj) {
	return (this == obj);
}
</code></pre>

#### Equals를 @Override
<pre><code>
@Override
public boolean equals(Object obj) {

    if (obj == null) {
        return false;
    }

    if (this.getClass() != obj.getClass()) {
        return false;
    }

    if (this == obj) {
        System.out.println("Object Same");
        return true;
    }

    Nesoy that = (Nesoy) obj;

    if (this.name == null && that.name != null) {
        return false;
    }

    if (this.age == that.age && this.name.equals(that.name)) {
        System.out.println("Object Value Same");
        return true;
    }

    return false;
}
</code></pre>
- 객체의 값들을 일일이 비교하는 비교문을 만들어준다.
- Equals를 override를 통하여 객체의 내용을 비교 할 수 있게 된다.



#### hashCode()
- equals()가 true인 두 Object를 HashMap에 put을 할 때 동일한 Key로 인식하고 싶은 경우
<pre><code>
Map<Student, Integer> map = new HashMap<Student, Integer>();
map.put(p1, 1);
map.put(p2, 1);
System.out.println(map.size()); // 2
</code></pre>
- 크기가 2인 이유는 Hash를 사용한 collection에서는 key를 결정할때 hashCode()를 사용하기 때문

#### HashCode를 @Overried
<pre><code>
@Override
public int hashCode() {

	final int prime = 31;
	int hashCode = 1;

	hashCode = prime * hashCode + ((name == null) ? 0 : name.hashCode());
	hashCode = prime * hashCode + age;

	return hashCode;
}
- hashCode()로 native call을 하여 Memory에서 가진 해쉬 주소값을 출력합니다.
- 특별한 설정을 하지 않았을 경우 System.identityHashCode()와 동일한 값을 나타냅니다.


</code></pre> 

정리
- equals()를 재정의한다면 side effect를 줄이기 위해서 hashCode()도 재정의하는것이 좋습니다.


참조
- Java equals()와 hashCode()에 대해 : https://nesoy.github.io/articles/2018-06/Java-equals-hashcode
