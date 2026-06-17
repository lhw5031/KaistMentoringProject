## 테이블 1

테이블명: **\_\_**
설명: **\_\_**을 저장한다.

컬럼:
[id]: 정수(integer), PK, 자동 증가, not null
[컬럼_1_이름]: 문자열(text), not null
[컬럼_2_이름]: 문자열(text), not null
[컬럼_3_이름]: 정수(integer), not null, FK -> 연결할\_테이블(id)
[created_at]: 날짜/시간(datetime), not null, 기본값 현재 시간

관계:

- 이 테이블의 [컬럼_3_이름]은 연결할\_테이블의 [id]를 가리킨다.

## 테이블 2

테이블명: **\_\_**
설명: **\_\_**을 저장한다.

컬럼:
[id]: 정수(integer), PK, 자동 증가, not null
[컬럼_1_이름]: 문자열(text), not null
[컬럼_2_이름]: 정수(integer), not null
[created_at]: 날짜/시간(datetime), not null, 기본값 현재 시간

관계:

- 연결되는 테이블이 없다면 '없음'이라고 적는다.

## 타입 작성 규칙

- 정수: integer
- 글자: text
- 날짜/시간: datetime
- 필수값: not null
- 기본키: PK
- 외래키: FK -> 테이블명(id)
