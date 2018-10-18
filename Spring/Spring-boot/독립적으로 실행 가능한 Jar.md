# SPRING-BOOT

## 10월 18일

### 독립적으로 실행 가능한 JAR

#### 하나의 JAR
* Spring-boot에서는 하나의 JAR파일로 실행이 가능하다.
* JAR파일 안에 어플리케이션에 관련된 의존성파일들이 다 포함되어 있다.
* 과거의 java에서는 jar파일 내부의 jar파일들을 읽을 방법이 없었다.
* 그래서 다풀어서 하나의 jar로 만들었다.
* Spring-boot에서는 jar끼리 묶어놓고 loader를 통해서 읽고 실행한다.
* MANIFEST.MF부터 app이 시작된다.
* Main-class로 JarLauncher로 설정되어 처음으로 시작이 되고 다음으로 개발자가 만들어 놓은 Application파일을 실행 시킨다.
