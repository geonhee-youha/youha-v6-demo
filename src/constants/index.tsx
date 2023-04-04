// export const categories = [
//   {
//     title: "게임",
//     value: "game",
//     secondaries: [
//       {
//         title: "액션게임",
//         value: "action",
//       },
//       {
//         title: "리듬게임",
//         value: "rythem",
//       },
//       {
//         title: "RPG게임",
//         value: "rpg",
//       },
//       {
//         title: "스포츠게임",
//         value: "sports",
//       },
//       {
//         title: "전략게임",
//         value: "stretegy",
//       },
//       {
//         title: "RTS게임",
//         value: "rts",
//       },
//     ],
//   },
//   {
//     title: "뷰티·메이크업",
//     value: "beauty",
//     secondaries: [
//       {
//         title: "뷰티",
//         value: "beauty",
//       },
//       {
//         title: "메이크업",
//         value: "makeup",
//       },
//       {
//         title: "스킨케어",
//         value: "skincare",
//       },
//       {
//         title: "헤어스타일",
//         value: "hairstyle",
//       },
//       {
//         title: "네일",
//         value: "nail",
//       },
//     ],
//   },
//   {
//     title: "패션",
//     value: "fashion",
//     secondaries: [
//       {
//         title: "옷",
//         value: "cloths",
//       },
//       {
//         title: "주얼리",
//         value: "jewerly",
//       },
//       {
//         title: "슈즈",
//         value: "shoes",
//       },
//       {
//         title: "모자",
//         value: "hat",
//       },
//     ],
//   },
//   {
//     title: "전자제품",
//     value: "it",
//     secondaries: [
//       {
//         title: "스마트폰",
//         value: "smartphone",
//       },
//       {
//         title: "카메라",
//         value: "camera",
//       },
//       {
//         title: "컴퓨터",
//         value: "computer",
//       },
//       {
//         title: "게임콘솔",
//         value: "gameconsole",
//       },
//       {
//         title: "헤드셋",
//         value: "headset",
//       },
//       {
//         title: "텔레비전",
//         value: "television",
//       },
//       {
//         title: "스마트워치",
//         value: "smartwatch",
//       },
//       {
//         title: "전자담배",
//         value: "smoke",
//       },
//       {
//         title: "배터리",
//         value: "battery",
//       },
//     ],
//   },
// ];

export const categoryList = [
  {
    emoji: "",
    title: "전체",
    value: "",
  },
  {
    emoji: "💄",
    title: "뷰티·패션",
    value: "beauty_fashion",
  },
  {
    emoji: "🍔",
    title: "먹방",
    value: "mukbang",
  },
  {
    emoji: "🕺",
    title: "BJ·엔터테이너",
    value: "bj_entertainer",
  },
  {
    emoji: "🛀🏻",
    title: "Vlog·일상",
    value: "vlog_lifestyle",
  },
  {
    emoji: "🎮",
    title: "게임",
    value: "game",
  },
  {
    emoji: "📱",
    title: "IT·전자기기",
    value: "it_electronics",
  },
  {
    emoji: "🎵",
    title: "음악·춤",
    value: "music_dance",
  },
  {
    emoji: "👨‍🍳",
    title: "요리·베이킹",
    value: "cooking_baking",
  },
  {
    emoji: "⛰️",
    title: "여행·아웃도어",
    value: "trip_outdoor",
  },
  {
    emoji: "🐩",
    title: "동물·펫",
    value: "animals_pet",
  },
  {
    emoji: "⚽",
    title: "스포츠·건강",
    value: "sports_health",
  },
  {
    emoji: "🎬",
    title: "영화·애니",
    value: "movie_animation",
  },
  {
    emoji: "🚘",
    title: "자동차",
    value: "car",
  },
  {
    emoji: "🔫",
    title: "키즈·플레이",
    value: "kids_play",
  },
  {
    emoji: "👩🏻‍🎓",
    title: "교육",
    value: "education",
  },
  {
    emoji: "🏢",
    title: "부동산·투자",
    value: "real-estimate_invenstment",
  },
  {
    emoji: "🗳️",
    title: "정치·시사",
    value: "politics_current-affairs",
  },
  {
    emoji: "🎨",
    title: "그림·만들기",
    value: "drawing_making",
  },
  {
    emoji: "🔮",
    title: "운세·타로",
    value: "fortune_tarot",
  },
  {
    emoji: "🗨️",
    title: "기타",
    value: "etc",
  },
];

export const tabList = [
  { title: "유튜버", value: "youtuber" },
  { title: "동영상", value: "video" },
  { title: "쇼츠", value: "shorts" },
];

export type FilterProps = {
  title: string;
  value: string;
};

export const hasShortsList: FilterProps[] = [
  { title: "전체", value: "" },
  { title: "쇼츠 보유", value: "shorts" },
  { title: "쇼츠 미보유", value: "non-shorts" },
];

export const targetGenderList: FilterProps[] = [
  { title: "전체", value: "" },
  { title: "남성", value: "male" },
  { title: "여성", value: "female" },
];

export const targetAgeList: FilterProps[] = [
  { title: "전체", value: "" },
  { title: "10대", value: "10" },
  { title: "20~30대", value: "20" },
  { title: "40~50대", value: "40" },
  { title: "60대 이상", value: "60" },
];

export const recentUploadDateList: FilterProps[] = [
  { title: "전체", value: "" },
  { title: "7일 이내", value: "7" },
  { title: "15일 이내", value: "15" },
  { title: "30일 이내", value: "30" },
];

export const mcnList: FilterProps[] = [
  { title: "전체", value: "" },
  { title: "다이아 티비", value: "다이아 티비" },
  { title: "트레져헌터", value: "트레져헌터" },
  { title: "샌드박스", value: "샌드박스" },
  { title: "비디오빌리지", value: "비디오빌리지" },
  { title: "레페리 뷰티 엔터테인먼트", value: "레페리 뷰티 엔터테인먼트" },
  { title: "아이스크리에이티브", value: "아이스크리에이티브" },
  { title: "유니브", value: "유니브" },
  { title: "콜랩코리아", value: "콜랩코리아" },
  { title: "스튜디오 아이스", value: "스튜디오 아이스" },
  { title: "마이룸티비", value: "마이룸티비" },
  { title: "와우엔터테인먼트", value: "와우엔터테인먼트" },
  { title: "롤큐", value: "롤큐" },
  { title: "램스튜디오", value: "램스튜디오" },
  { title: "크리시아미디어", value: "크리시아미디어" },
  { title: "유시스트 엔터테인먼트", value: "유시스트 엔터테인먼트" },
  { title: "에스비엠엔이", value: "에스비엔엠이" },
  { title: "쇼바엔터테인먼트", value: "쇼바엔터테인먼트" },
  { title: "츄더엔터테인먼트", value: "츄더엔터테인먼트" },
  { title: "커넥티비티", value: "커넥티비티" },
  { title: "와프 엔터테인먼트", value: "와프 엔터테인먼트" },
  { title: "어썸엔터테인먼트", value: "어썸엔터테인먼트" },
  { title: "디밀", value: "디밀" },
  { title: "다니엘프로젝트", value: "다니엘프로젝트" },
  { title: "스타일디", value: "스타일디" },
  { title: "플레이타운", value: "플레이타운" },
  { title: "아이엠브랜드", value: "아이엠브랜드" },
  { title: "프리엔터테인먼트", value: "프리엔터테인먼트" },
  { title: "페니엔터테인먼트", value: "페니엔터테인먼트" },
  { title: "스타피쉬 엔터테인먼트", value: "스타피쉬 엔터테인먼트" },
  { title: "윗유", value: "윗유" },
  { title: "콘플로우컴퍼니", value: "콘플로우컴퍼니" },
  { title: "브리온", value: "브리온" },
  { title: "빈 엔터테인먼트", value: "빈 엔터테인먼트" },
  { title: "싸이클럽W", value: "싸이클럽W" },
  { title: "피아이코퍼레이션", value: "피아이코퍼레이션" },
  { title: "망고플레이", value: "망고플레이" },
  { title: "거쉬클라우드 코리아", value: "거쉬클라우드 코리아" },
  { title: "픽셀네트워크", value: "픽셀네트워크" },
  { title: "알로하미디어", value: "알로하미디어" },
  { title: "헤이유니버스", value: "헤이유니버스" },
  { title: "인챈트", value: "인챈트" },
  { title: "스포츠바이브", value: "스포츠바이브" },
  { title: "빅리그", value: "빅리그" },
  { title: "스튜디오 크롬", value: "스튜디오 크롬" },
  { title: "스튜디오 룰루랄라", value: "스튜디오 룰루랄라" },
  { title: "파괴연구소", value: "파괴연구소" },
  { title: "씨제이 이엔엠 티비엔디", value: "씨제이 이엔엠 티비엔디" },
  { title: "메타코미디", value: "메타코미디" },
  { title: "더키트", value: "더키트" },
  { title: "태그바이", value: "태그바이" },
  { title: "라우드코퍼레이션", value: "라우드코퍼레이션" },
  {
    title: "스튜디오 산타클로스 엔터테인먼트",
    value: "스튜디오 산타클로스 엔터테인먼트",
  },
  { title: "아티스트앤스튜디오", value: "아티스트앤스튜디오" },
  { title: "언어스", value: "언어스" },
  { title: "제이메이저", value: "제이메이저" },
  { title: "세븐디바이드", value: "세븐디바이드" },
  { title: "골든웨일즈", value: "골든웨일즈" },
  { title: "소속없음", value: "소속없음" },
];

export const uploadDateList: FilterProps[] = [
  { title: "전체", value: "" },
  { title: "1일 이내", value: "1" },
  { title: "3일 이내", value: "3" },
  { title: "7일 이내", value: "7" },
  { title: "14일 이내", value: "14" },
  { title: "28일 이내", value: "28" },
];

export type FilterValueProps = {
  video?: {
    views: number[];
    uploadDate: string;
    likes: number[];
    comments: number[];
  };
  detail?: {
    viewsPerSubscribers: number[];
    likesPerViews: number[];
    commentsPerViews: number[];
  };
  categories?: {
    categories: string[];
  };
  channel?: {
    subscribers: number[];
    price: number[];
    shorts: string;
  };
  target?: {
    gender: string;
    age: string;
    koreanRatio: number[];
  };
  contents?: {
    everageViews: number[];
    commentRatio: number[];
    likeRatio: number[];
    recentUploadDate: string;
    uploadFrequency: number[];
  };
  mcns?: {
    mcns: string[];
  };
};

export const youtuberFilterValueDefaultProps: FilterValueProps = {
  categories: {
    categories: [],
  },
  channel: {
    subscribers: [0, 5000000],
    price: [0, 100000000],
    shorts: "",
  },
  target: {
    gender: "",
    age: "",
    koreanRatio: [0, 100],
  },
  contents: {
    everageViews: [0, 10000000],
    commentRatio: [0, 100],
    likeRatio: [0, 100],
    recentUploadDate: "",
    uploadFrequency: [0, 100],
  },
  mcns: {
    mcns: [""],
  },
};

export const videoFilterValueDefaultProps: FilterValueProps = {
  video: {
    views: [0, 10000000],
    uploadDate: "",
    likes: [0, 1000],
    comments: [0, 1000],
  },
  detail: {
    viewsPerSubscribers: [0, 100],
    likesPerViews: [0, 100],
    commentsPerViews: [0, 100],
  },
};

export const youtuberSortList = [
  { title: "구독자 순", value: "subscribers" },
  { title: "예상 광고단가 순", value: "price" },
  { title: "평균 조회수 순", value: "views" },
];

export const videoSortList = [
  { title: "업로드 순", value: "uploadDate" },
  { title: "조회수 순", value: "views" },
  { title: "좋아요 순", value: "likes" },
  { title: "댓글 순", value: "comments" },
];

export const userTypes = [
  {
    emoji: "🏢",
    title: "광고주",
    value: "advertiser",
    description: <>광고 의뢰 및 유튜버 찾기가 필요하시다면?</>,
    types: [
      { title: "광고주", value: "광고주" },
      { title: "광고대행사", value: "광고대행사" },
      { title: "미디어렙사", value: "미디어렙사" },
    ],
  },
  {
    emoji: "🎙️",
    title: "크리에이터",
    value: "creator",
    description: <>광고 수주 및 선정산 서비스 등이 필요하시다면?</>,
    types: [
      { title: "유튜버", value: "유튜버" },
      { title: "MCN", value: "MCN" },
    ],
  },
];
