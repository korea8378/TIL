# SQL

## 10월 30일

### SELECT 구문

#### 검색
* 데이터베이스를 이용하는 때 핵심이 되는처리가 바로 검색
* 데이터가 저장되어 있는 테이블에서 필요한 데이터를 뽑아내는 것
* 질의 or 추출

#### WHERE 구
|연산자|의미|
|:------|:------|
|=	|~와 같음|
|<>	|~와 같지 않음|
|>=	|~이상|
|>	|~보다 큼|
|<=	|~이하|
|<	|~보다 작음|

#### IN(,,,,)
* OR로 하게되면 많은 조건식 일 때는 귀찮아진다.
<pre><code>
SELECT name, address
	FROM Address
	WHERE address = ‘서울시’
		OR address = ‘부산시’
		OR address = ‘인천시’;

SELECT name, address
	FROM Address
	WHERE address IN (‘서울시’, ‘부산시’, ‘인천시’);
</pre></code>

#### IS NULL
* 데이터거 NULL인 값을 검색하고 싶을때는 ‘=‘ 연산자를 사용 할 수없다.
* IS NULL이라는 키워드를 사용

#### IS NOT NULL

#### GROUP BY
* 집합을 만든다고 생각하면서 쿼리문을 짜라

#### HAVING

#### ORDER BY

#### SELECT 구문은 테이블(관계)를 반환한다.

#### View
* Create View 뷰이름(….) AS Select문
* 데이터가 아니고 Select문을 다시 실행

#### SubQuery
* Select * From (서브쿼리), SELECT 문 IN(Subquery)
* SubQuery를 이용하면 서브쿼리에 사용되는 데이터가 변경되어도 sql문을 수정할필요가 없음(동적)