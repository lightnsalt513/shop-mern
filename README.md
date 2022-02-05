<br />
<br />

1. [Overview](#overview)
2. [주요 페이지 및 컴포넌트 구성](#structure)
3. [기술 스택](#techstack)

<br />
<br />

## 1. Overview <a id="overview"></a>
* [E-Commerce MERN 스택 앱 구현 강의](https://www.youtube.com/watch?v=y66RgYMAgSo&t=25s)를 통해 MongoDB, Express, React, Node.js 를 사용한 간단한 e-commerce 사이트를 만들어 보면서 DB부터 서버 그리고 프론트까지의 구현 과정을 경험  
  * 튜터리얼 내용 중 Payment 및 Dashboard 관련 구현은 작업에서 제외  
> **Demo URL** : https://lightnsalt513.github.io/shop-mern/#/shop-mern/
* **습득 개념** :
  * Express.js를 통해 주요 API를 설계하여 client와 DB와의 통신 인터페이스 개발하는 과정 
  * Cryptojs를 활용한 사용자 패스워드 암호화 및 JWT와 redux-persist를 사용해 로그인 상태 유지
  * Redux toolkit 를 사용한 state 관리
  * 별도 CSS/SASS 파일이 아닌 CSS-in-JS 개념을 활용한 스타일 적용법
* **주요 기능** :
  * 회원가입(Register)을 통해 수집된 유저 정보를 기반으로 로그인 구현
  * 페이지 리프레시에도 로그인 상태 유지
  * GNB를 통해 회원가입, 로그인 및 장바구니 페이지로 이동
  * 랜딩페이지에서 특정 카테고리의 '제품 목록'으로 이동, 또는 특정 상품을 장바구니에 바로 담거나 해당 상품의 상세 페이지로 이동
  * 제품목록 페이지에서 상품들의 사이즈별로 필터하거나, 제품의 등록일 또는 가격순으로 정렬
  * 제품상세 페이지에서 제품 사이즈 및 수량 변경 후 장바구니에 추가 가능
  * 장바구니 페이지에서 추가된 상품들 상세 정보 및 합산된 총 가격 노출
* **추가/변경 부분** : (강의 내용 외)
  * 스타일에서 반응형 tablet 구간 추가
  * slide영역 slick-carousel 라이브러리로 교체
  * 각 페이지 컴포넌트 내에 있던 공통 컴포넌트(GNB, Footer 등)들을 하나의 레이아웃 컴포넌트 MainWithGnbFooter로 생성하고 라우팅 단계에서 적용하여 라우팅 시 공통 컴포넌트 관련 DOM이 새롭게 그려지지 않도록 함
  * 페이지 라우팅 시 최상단부터 시작하지 않고 스크롤영역이 기존 위치에서 노출됨. 이를 수정하기 위해 ScrollToTop 헬퍼 함수를 추가하고 URL이 바뀔 때 마다 실행되도록 함
  * 회원등록 기능 추가 (관련 API, reducer 추가; Validation 기능 추가)    
  (강의 내용에서는 회원등록 기능 없이 DB에서 직접 사용자 정보를 입력하고 해당 정보로 로그인해 작업)
  * 로그아웃 기능 추가 (관련 API, reducer 추가)
  * 로그인 redux-persist 구현에서 전체 user state를 localStorage에 저장함으로 error, errorMessage 상태들이 화면 리프레시에도 유지되면서 버그 발생. user 상태 중 currentUser 데이터만 유지하도록 수정
  * 하드코딩 되어있던 사용자 token 정보를 axios의 axios.interceptors.request.use() 함수를 사용해 서버에 사용자 비동기 작업 요청 시 token 정보를 localStorage에서 먼저 가져와 확인 후 요청을 날릴 수 있도록 수정
  * 각 Products, Product 컴포넌트에서 바로 Product API 호출하던 부분 유지보수를 위해 모든 API 요청 관련 로직이 모아져있는 apiCall 파일로 이동    (각 컴포넌트 단위에서 API 호출 이후에 useState 등으로 데이터 저장을 하는 로직을 위해 Promise를 반환하도록 하여 각 컴포넌트에서는 then으로 받아 필요한 로직 처리하도록 수정)
  * 제품목록 페이지에서 '전체상품 보기 (Show All Products)' 버튼 추가
  * 404 페이지 추가
  * 장바구니 관련 :  
    * 간단한 'Add to Cart(장바구기에 담기)' 기능만 구현된 상태에서 아래와 같이 추가 기능들 구현
    * 사용자 ID 기준으로 장바구기 정보 fetch 하는 기능 추가 (관련 API, reducer 함수 추가)
    * 장바구니에 담긴 제품의 수량 변경 기능 추가 (관련 API, reducer 함수 추가)
    * 장바구니에 담긴 제품 제거 기능 추가 (관련 API, reducer 함수 추가)
    * 제품목록 또는 제품상세 페이지에서 동일 제품(ID 및 Size 동일)을 장바구니에 추가하려고 하는 경우 confirm창을 띄어 사용자 확인 후 기존 제품이 대체되도록 구현
    * 간단한 Checkout 모달 추가 (Payment 기능 미구현)
    * Order 버튼 클릭 시 장바구기가 비워지고 Order DB에 해당 정보 추가되도록 구현
    * 하드코딩 되어 있던 Shipping Discount 부분 최소 주문액 이하인 경우 하드코딩된 배송비 만큼 총 결제 금액에 합산되도록 기능 추가

<br />
<br />

## 2. 주요 페이지 및 컴포넌트 구성 <a id="structure"></a>

| 컴포넌트명 | 설명  |
| - | - |
| MainWithGnbFooter | 공통 컴포넌트들(`Navbar`, `Footer`, `Announcement`)을 합친 레이아웃 컴포넌트 |

<br />

| 경로 | 페이지 컴포넌트명 | 설명 |
| - | - | - |
| /login | Login | 로그인 페이지 |
| /register | Register | 회원등록 페이지 | 
| / | Home <br /> - MainWithGnbFooter <br /> - Slider <br /> - Categories <br /> - Products <br /> - Newsletter | 의류 이커머스 사이트 랜딩페이지 |      
| /products | ProductList <br /> - MainWithGnbFooter <br /> - Products <br /> - Newsletter | 전체 제품 목록 페이지 |
| /products/:category | ProductList | 카테고리로 필터 된 제품 목록 페이지 |
| /products/:id | Product <br /> - MainWithGnbFooter <br /> - Newsletter | 제품 상세 페이지 |
| /cart  | Cart <br /> - MainWithGnbFooter <br /> - ModalOrder | 장바구니 페이지 |
|  | 404 | 404 페이지 |
    
<br />
<br />

## 3. 기술 스택 <a id="techstack"></a>
### 주요 기술 스택
  * Server : `Express`
  * DB : `MongoDB`
  * FE :
    * `React`
    * `Redux` (State관리)
    * `Styled Components`

&nbsp;
### 기타 주요 라이브러리
  * `react-router-dom` / `react-redux` / `@reduxjs/toolkit` / `redux-persist`
  * `styled-components`
  * `axios`
  * `crypto-js`
  * `jsonwebtoken`
  * `skick-carousel`
  * `material-ui`
