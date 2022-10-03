# <img width="30" alt="logo" src="https://user-images.githubusercontent.com/90392240/193596882-0039f118-039e-4b53-ade8-588897987f30.png" /> 바다어때

<div aling="center">
  <img width="200" src="https://user-images.githubusercontent.com/90392240/193597561-4d1cb1a5-4c8b-4cdd-ad6e-4ecd23de8613.gif" />
  <img width="700" src="https://user-images.githubusercontent.com/90392240/193597867-7e0ca834-11b2-4960-bb9e-485f36e5d092.gif" />
</div>

# 🧑🏻‍💻 프로젝트 개요

### 🏖 해수욕장 여행을 위한 바다의 안전정보, 날씨정보, 위치정보 후기를 제공합니다.

> **수질 정보**
- 적합여부, 대장균, 장구균 수치
- 해양수산부 해수욕장 수질 적합여부 API 활용

> **백사장 정보**
- 적합여부, 카드뮴, 수은 수치
- 해양수산부 해수욕장 백사장 적합여부 API 활용

> **날씨 정보**
- 대기상황, 기온, 습도, 풍향
- 기상청 단기예보 조회 API 활용

# 🛠 기술 스택
- **언어**: TypeScript
- **상태관리**: Redux Toolkit 
- **비동기 통신**: Create Async Thunk
- **서버/DB**: Firebase
- **스타일링**: TailWind CSS, Flowbite

# 🎮 기능 설명

## 소셜 로그인

- 구글과 페이스북을 통해 SNS 로그인이 가능합니다.
 
<img width="700" src='https://user-images.githubusercontent.com/90392240/193623291-00c25b06-3709-4399-acca-69951e9f1189.gif' />


## 🎯 내 위치 찾기

<img width="700" src="https://user-images.githubusercontent.com/90392240/193602698-6e569c09-6052-41b2-9c9b-18ca23650066.png" />

- 우측 상단 '내 위치' 토글을 통해 언제나 나의 위치로 이동 가능합니다.

## 🔍 해수욕장 검색

- 시도별 버튼 클릭 후 해수욕장의 마커를 가져가면 해수욕장의 간단한 정보를 확인 가능합니다.

<img width="700" src="https://user-images.githubusercontent.com/90392240/193604058-f6d713c4-51ca-40d3-b16e-b1616ad082df.png" />

## 🏝 해수욕장 날씨, 수질, 백사장 정보

- 해수욕장 마커 클릭시 탭으로 날씨, 수질, 백사장 정보를 확인할 수 있습니다.

<img width="700" src="https://user-images.githubusercontent.com/90392240/193615682-7c81eb3f-1e08-4c9b-a059-0971276d2a25.gif" />

## ☀️ 해수욕장의 상세날씨 정보

- 해수욕장 마커 클릭시 지도 하단에 세부 날씨 정보를 제공합니다.
- 날씨 예보 시간을 계산하여 향후 12시간의 기상예보를 보여줍니다.
- 기온, 습도, 풍속 정보를 그래프를 통해 확인할 수 있습니다.

<img width="700" src="https://user-images.githubusercontent.com/90392240/193617468-3cb2d614-369d-46cc-b1e5-c27a79ee8a93.gif" />

## 🌊 해수욕장 정보 상세페이지

- 오버레이 해수욕장명 클릭시 해수욕장 상세페이지로 이동합니다.
- 상세정보에서는 해수욕장에 대한 좋아요 및 후기를 남길 수 있습니다.
- 후기 수정 및 삭제가 가능합니다.

<img width="700" src="https://user-images.githubusercontent.com/90392240/193626129-5b22e1fe-ff4a-4a44-9647-6cb9a08a2d13.gif" />

- 좋아요 기능의 로직은 Firebase DB 해변 도큐먼트 안에 likes 컬렉션을 만들어 유저의 ID를 넣어 구현했습니다.

<img width="700" src="https://user-images.githubusercontent.com/90392240/193626233-2944ad45-d831-46f5-913b-24250a4a323d.gif" />

- 리뷰 기능 로직은 해변 도큐먼트 안에 posts 컬렉션을 만들어 해면 ID를 포함한 후기관련 필드를 넣어서 구현했습니다.

## ⛱ 해변 한번에 모아보기&필터 기능

- 검색 가능한 해변 한번에 모아볼 수 있습니다.
- 시도 버튼을 통해 원하는 지역의 해변을 필터링할 수 있습니다.

<img width="700" src="https://user-images.githubusercontent.com/90392240/193631318-af691bfb-c81f-4ddf-942f-e87d6ac943d3.gif" />

## ✍️ 후기 한번에 모아보기&필터

- 해수욕장 리뷰들을 한번에 모아볼 수 있습니다.
- 리뷰들을 시도별로 필터링할 수 있습니다.

<img width="700" src="https://user-images.githubusercontent.com/90392240/193632379-df2c1dae-0ff5-45f3-81e7-7e19a5fa2027.gif" />



