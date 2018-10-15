#CSS-INIT

## 10월 15일

### float시 
* 자식요소를 부모요소에 포함시키기 
<pre><code>
clearfix::after {
    content: '';
    display: block;
    clear: both;
}
</pre></code>


###reset CSS
* 모든 요소를 완전히 초기화

### normalize CSS
* 일부 요소만 초기화한다(어느정도 필요한 요소에 대한 css는 남겨 둔다.

### 기타 초기화!!!!
<pre><code>
button {
    border: none;
    background-color: transparent;
}

h1 {
   margin : 0;
}

a {
    color: inherit;
    text-decoration: none;
}
</pre></code>

### 요소 감추기
* 마크업 구조는 유지하된 스타일상에서 요소를 감춘다. 
<pre><code>
.a11y-hidden {
	overflow : hidden;
	position : absolute;
	clip : rect(0, 0, 0, 0);
	width : 1px;
	height : 1px;
	margin : -1px;
}

caption.a11y-hidden {
	position : static;
}
</pre></code>

### Box-sizing 속성
* Content-box, border-box 사용
* content-box는 변경이 잦은 padding이나 margin 값에 따라 width도 매번 변경해줘야하는게 번거로워서 Border-box가 나왔다.

* css 맨 위에
<pre><code>
*, *::after, *::before {
	box-sizing: border-box;
}
</pre></code>