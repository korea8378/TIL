# JAVA

## 6월 7일

### 아이템9.try-finally보다는 try-with-resources를 사용하라.

#### try-finally
- 자바 라이브러리에는 close 메서드를 호출해 직접 닫아줘야 하는 자원이 많다.
    - ex)InputStream, OutputStream, java.sql.Connection 등이 좋은 예다.
- 자원 닫기는 클라이언트가 놓치기 쉬워서 예측할 수 없는 성능 문제로 이어지기도 한다.
```{.java}
//try catch를 이용한 자원 해제
static String firstLineOfFile(String path) throws IOException {
	BufferedReader br =new BufferedReader(new FileReader(path));
	try {
		return br.readLine();
	} finally {
		br.close();
	}
}

//try catch를 이용한 자원 해제2
static void copy(String src. String dot) throws IOException {
	InputStream in = new FileInputStream(src);
	try {
		OutputStream out = new FileOutputStream(dst);
		try {
			byte [] but = new byte[BUFFER_SIZE];
			int n;
			while ((n = in.read(bud)) >= 0) {
				out.write(buf, 0, n);
			}
		} finally {
			out.close();
		} 
	} finally {
		in.close();
	}
}
```
- 두번째 자원 해제 코드는 복잡하다.
- 첫번째 자원 해제 코드는 예외가 try 블록과 finally 블록 모두에서 발생할 수 있다
    - ex) 기기에 물리적인 무제가 생긴다면 firstLineOfFile 메서드 안의 readLine 메서드가 예외를 던지고, 같은 이유로 close 메서드도 실패 할 것이다. 이런 상황이라면 두번째 예외가 첫 번째 예외를 집어삼켜 버린다. 그러면 스택 추적 내역에 첫 번째 예외에 관한 정보는 남지 않게 되어, 실제 시스템에서의 디버깅을 몹시 어렵게 한다. 코드로 구현하여 첫번째 예외 정보를 확인 할 수 있지만 구현이 복잡하다.

#### try-with-resources
- 자바 7이 부터는 try-with-resources를 지원한다.
- 이 구조를 사용하려면 해당 자원이 AutoCloseable 인터페이스를 구현해야 하는데 자바 라이브러리와 서드파티 라이브러리들의 수많은 클래스와 인터페이스가 이미 AutoCloseable을 구현하거나 확장해뒀다.
- AutoCloseable을 구현하여 닫아야 하는 자원을 가지는 클래스를 만들자.
```{.java}
//첫번째 try-finally 개선
static String firstLineOfFile(String path) throws IOException {
	try (BufferedReader br = new BufferedReader(
			new FileReader(path))) {
		return br.readLine();
	}
}

//두번째 try-finally 개선
Static void copy(String src, String dot) throws IOException {
	try(InputStream in = new FileInputStream(src);
		OutputStream out = new OutputStream(dst)) {
		byte[] but = new byte[BUFFER_SIZE];
		int n;
		while (( n = in.read(buf)) >= 0) {
			out.write(bud, 0, n);
		}
	} 
}
```
- try-finally에 비해 짧고 읽기 수월할 뿐 아니라 문제를 진단하기도 훨씬 좋다.
- firstLineOfFile 메서드에서 readLine과 close 호출 양쪽에서 예외가 발생하면, close에서 발생한 예외는 숨겨지고 readLine에서 발생한 예외가 기록된다.
- 예외 하나만 보존되고 여러 개의 다른 예외가 숨겨질 수도 있다.
- 숨겨진 예외들도 그냥 버려지지는 않고, 스택 추적 내역에 ’suppressed’라는 꼬리표를 달고 출력한다.
- 자바 7에서 Throwable에 추가된 getSuppressed 메서드를 이용하면 프로그램 코드에서 가져 올 수도 있다.

#### try-with-resources & catch
```{.java}
static String firstLineOfFile(String path) throws IOException {
	try (BufferedReader br = new BufferedReader(
			new FileReader(path))) {
		return br.readLine();
	} catch (IOException e) {
		return defaultVal;
	}
}
```
- try-with-resources에서도 catch 절을 쓸 수 있다.
- catch 절 덕분에 try 문을 더 중첩하지 않고도 다수의 예외를 처리할 수 있다.

#### 핵심 정리
- `꼭 회수해야 하는 자원을 다룰 때는 try-finally 말고, try-with-resources를 사용하자.`
- `예외는 없다. 코드는 더 짧고 분명해지고, 만들어지는 예외 정보도 훨씬 유용하다.`
- `try-finllay로 작성하면 실용적이지 못할 만큼 코드가 지저분해지는 경우라도, try-with-resources로는 정확하고 쉽게 자원을 회수 할 수 있다.`

