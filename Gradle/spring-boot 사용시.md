# Git

## 10월 18일

### 패키징 관련 문제
* 기본적으로 gradle을 이용하여 spring-boot개발시에는 bootjar, bootwar로 작업이 가능하다.
* spring-boot에서 gradle을 이용하여 jar파일 생성시 gradle에서 설정을 변경을 해줘야 한다.
* application.class(psvm)가 없기 때문에

#### bootJar 비활성화시
<pre><code>
bootJar.enabled = false
jar.enabled = true
</pre></code>

#### bootWar 비활성화시
<pre><code>
bootWar.enabled = false
war.enabled = true
</pre></code>

#### Maven Publish Plugin

<pre><code>
apply plugin: 'maven-publish'
publishing {
    publications {
        maven(MavenPublication) {
            groupId = ''
            artifactId = ''
            version = ''

            from components.java
        }
    }
}
</pre></code>