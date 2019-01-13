# JavaScript

## 1월 13일

### Exception
- 프로그램이 실행되는 동안 문제가 발생할 때 대처할 수 있게 처리하는 것
- 예외(Exception) : 프로그램 실행 중 발생하는 오류
- 에러(Error) : 프로그래밍 언어의 문법적인 오류
- 기본 예외 처리, 고급 예외처리 두 가지 방법으로 처리

1. 기본 예외처리 
- 예외가 발생하지 않게 사전에 해결하는 것
<pre><code>
function registerEventListener(node, event, listener) { 
    if (node.addEventListener) { 
        node.addEventListener(event, listener, false); // 파이어폭스, 크롬, 사파리, 오페라 
    } else if (node.attachEvent) { 
        node.attachEvent('on' + event, listener); // 익스 플로러 
    } // if 
}
function whenClick(e) { 
    var event = window.event || e; 
    var willAlert = ''; 

    willAlert += 'clientX : ' + event.clientX + '\n'; 
    willAlert += 'clientY : ' + event.clientY + '\n'; 

    alert(willAlert); 
}
</code></pre>


2. 고급 예외 처리  
- try 키워드, catch 키워드, finally 키워드로 예외를 처리
- try 구문안에서 예외가 발생하면 catch 구문에서 처리, finally 구문은 필 수 사항은 아니고, 예외 발생 여부와 상관없이 수행돼야 하는 작업을 처리
<pre><code>
    try { 
        alert('try 구문'); 
        abcd.run(); // 없는객체의 없는 메서드이기 때문에 예외 발생 
        alert('try 구문 끝'); // 예외로 인해 실행 되지 않음 
    } catch (exception) { 
        alert('예외 발생시 실행 되는 catch 구문');
    } finally { 
        alert('예외 발생 여부 상관없이 실행 되는 finaylly 구문'); 
    }
</code></pre>


3. 예외 객체 
- try catch 구문을 사용할 때 catch 괄호 안에 입력하는 식별자
- e, 또는 exception 식별자를 사용
- 예외 객체의 속성

<pre><code>
    try { 
        var array = new Array(99999999999999999999999); 
    } catch (exception) { 
        var output = ''; 
        for (var i in exception) { 
            output += i + ' : ' + exception[i] + '\n';
        } 
        alert(output); 
    }
</code></pre>

4. 에러와 예외
- 예외 : try catch 구문으로 해결할 수 있는 것
- 에러 : try catch 구문으로 해결할 수 없는 것

5. 예외 강제 발생
- 예외를 강제로 발생시킬 때는 throw 키워드를 사용
- 에러와 다르게 예외는 try catch 구문으로 처리할 수 있음


#### 참조  
- 자바스크립트(JavaScript) 예외 처리(Exception handling) : http://gangzzang.tistory.com/entry/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8JavaScript-%EC%98%88%EC%99%B8-%EC%B2%98%EB%A6%ACException-handling
- Try Catch 구문 및 디버깅 관련 알아보기 : https://webisfree.com/2014-11-17/[%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8]-try-catch-%EA%B5%AC%EB%AC%B8-%EB%B0%8F-%EB%94%94%EB%B2%84%EA%B9%85-%EA%B4%80%EB%A0%A8-%EC%95%8C%EC%95%84%EB%B3%B4%EA%B8%B0
- JavaScript Errors - Throw and Try to Catch : https://www.w3schools.com/js/js_errors.asp