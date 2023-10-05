export function viewSplitLine(content: string) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;

  // 링크를 감지하여 a 태그로 감싸기
  const replace = (content: string) => {
    const convertContent = content.replace(urlRegex, function (url) {
      return '<a href="' + url + '" target="_blank">' + url + "</a>";
    });
    const htmlArr: any = [];
    convertContent.split("\n").forEach(function (text) {
      const textHtml = "<p style='min-height: 24px'>" + text + "</p>";
      htmlArr.push(textHtml);
    });

    return { __html: htmlArr.join("") };
  };

  return (
    <div>
      <div dangerouslySetInnerHTML={replace(content)}></div>
    </div>
  );
}

type ModelProps = {
  name: string;
  thumbnail: string;
};

export type ProductProps = {
  id: string;
  registrationDuration: [Date, Date];
  selectionDate: Date | null;
  uploadDuration: [Date, Date] | null;
  videoType: string;
  type: "배송형";
  state: string;
  brand: string;
  brandLinkUrl: string;
  product: string;
  offer: {
    summary: string;
    detail: string;
  };
  productLinkUrl: string;
  quota: number;
  applicants: number;
  fee: number;
  thumbnail: string;
  detailImgs?: string[];
  models?: ModelProps[];
  mission: string;
  keywords: string[];
  tags: string[];
  registerLinkUrl: string;
};
export const products: ProductProps[] = [
  {
    id: "0",
    registrationDuration: [new Date("2023-08-29"), new Date("2023-10-10")],
    selectionDate: new Date("2023-10-10"),
    uploadDuration: [new Date("2023-10-24"), new Date("2023-11-14")],
    videoType: "롱폼/쇼츠",
    type: "배송형",
    state: "오픈중",
    brand: "세리박스",
    brandLinkUrl: "https://www.serybox.com/",
    product: "세리번 나이트 V2",
    offer: {
      summary: "세리번 나이트 1세트 증정",
      detail: "세리번 나이트 1세트 + 콘텐츠 제작비 260,000원",
    },
    productLinkUrl:
      "https://www.serybox.com/shop/detail.php?pno=9C838D2E45B2AD1094D42F4EF36764F6&rURL=https%3A%2F%2Fwww.serybox.com%2F&ctype=1&cno1=1011",
    quota: 30,
    applicants: 109,
    fee: 260000,
    thumbnail:
      "https://i.pinimg.com/736x/68/07/2d/68072d8ac84fcfd44ebe5972a62946f7.jpg",
    detailImgs: [
      "https://image.serybox.com/pc/banner/230922_chuseock_bnr.jpg",
      "https://image.serybox.com/pc/banner/det_branding_01_20230727.jpg",
      "https://image.serybox.com/pc/banner/det_branding_07_20230727.jpg",
      "https://serybox.wisacdn.com/_data/attach/202308/01/338b5e984f45193da159ed1cc2f297ca.jpg",
    ],
    mission: `[영상 가이드]
    - 영상 형태: 쇼츠, 롱폼 중 자유롭게 선택해주세요.
    - 롱폼의 경우, 영상의 처음부터 끝까지 제품에 관한 내용으로 이루어지지 않아도 됩니다. 브이로그 등 영상의 일부분에 노출해주셔도 됩니다.
    - 제품을 섭취해본 후기를 다뤄주세요. (제품을 통해 다이어트 과정을 담으면 좋아요.)
    - 고정댓글에 제품URL과 할인쿠폰을 게시해주세요. 
    - 제품URL: https://bit.ly/3PTzNTO 
    - 할인쿠폰: (선정자 대상)추후 안내
     
    [멘트 가이드]
    - “자면서 하는 다이어트”
    - “자기 전 1포 섭취로 간편!”
    - “다음날 라인이 달라지는” / “라인이 깨어나는”
    - “다음날 아침 땡땡함이 사라졌다”
    - “아침 거울이 계속 보고 싶은” / “아침 거울 속 미모” / “거울 보는게 즐겁다”
    - “출시 이후 첫 리뉴얼 된 제품”
    - “3,000만 포 판매된 제품”
    - “다이어트 제품 판매 1위”
    - “김태희, (여자)아이들 우기가 모델인 제품”
    `,
    keywords: [
      "이너뷰티",
      "다이어트 보조제",
      "붓기 개선",
      "나이트케어",
      "체지방 감소",
      "혈행 개선",
    ],
    tags: [
      "세리박스",
      "세리번 나이트",
      "이너뷰티",
      "다이어트",
      "다이어트 보조제",
      "붓기 개선",
      "라인",
      "나이트케어",
      "체지방 감소",
      "혈행 개선",
    ],
    registerLinkUrl: "https://forms.gle/7JJReHsJhyTGJKbk8",
  },
  {
    id: "1",
    registrationDuration: [new Date("2023-10-14"), new Date("2023-10-21")],
    selectionDate: null,
    uploadDuration: null,
    videoType: "롱폼/쇼츠",
    type: "배송형",
    state: "오픈예정",
    brand: "세리박스",
    brandLinkUrl: "https://www.serybox.com/",
    product: "세리번 비우밍 다이어트",
    offer: {
      summary: "세리번 비우밍 다이어트 1세트 증정",
      detail: "",
    },
    productLinkUrl: "https://www.serybox.com/shop/detail.php?pno=EE16FA83C0F151EF85E617F5AA3867A6&rURL=https%3A%2F%2Fwww.serybox.com%2Fshop%2Fbig_section.php%3Fcno1%3D1005&ctype=1&cno1=1005",
    quota: 30,
    applicants: 0,
    fee: 260000,
    thumbnail:
      "https://gd.image-gmkt.com/li/805/483/1813483805.g_520-w-st_g.jpg",
    mission: "",
    keywords: [""],
    tags: [""],
    registerLinkUrl: "",
  },
  {
    id: "2",
    registrationDuration: [new Date("2023-10-14"), new Date("2023-10-21")],
    selectionDate: null,
    uploadDuration: null,
    videoType: "롱폼/쇼츠",
    type: "배송형",
    state: "오픈예정",
    brand: "세리박스",
    brandLinkUrl: "https://www.serybox.com/",
    product: "세리번 블루맨 올인원",
    offer: {
      summary: "세리번 블루맨 올인원 1세트 증정",
      detail: "",
    },
    productLinkUrl:
      "https://www.serybox.com/shop/detail.php?pno=32B991E5D77AD140559FFB95522992D0&rURL=https%3A%2F%2Fwww.serybox.com%2F&ctype=1&cno1=1011",
    quota: 30,
    applicants: 0,
    fee: 260000,
    thumbnail:
      "https://serybox.wisacdn.com/_data/attach/202205/31/2b8daba390b5b9bc7ad09f9776be5167.jpg",
    mission: "",
    keywords: [""],
    tags: [""],
    registerLinkUrl: "",
  },
  {
    id: "3",
    registrationDuration: [new Date("2023-10-14"), new Date("2023-10-21")],
    selectionDate: null,
    uploadDuration: null,
    videoType: "롱폼/쇼츠",
    type: "배송형",
    state: "오픈예정",
    brand: "라소미",
    brandLinkUrl: "https://lasomi.co.kr/",
    product: "김태희 글루효소",
    offer: {
      summary: "김태희 글루요소 1세트 증정",
      detail: "",
    },
    productLinkUrl:
      "https://lasomi.co.kr/product/11-%EA%B9%80%ED%83%9C%ED%9D%AC-%EA%B8%80%EB%A3%A8%ED%9A%A8%EC%86%8C/11/category/1/display/2/",
    quota: 30,
    applicants: 0,
    fee: 260000,
    thumbnail:
      "https://lasomi.co.kr/web/product/big/202308/83a37f0bc24bcf3ad50e887270d692c5.png",
    mission: "",
    keywords: [""],
    tags: [""],
    registerLinkUrl: "",
  },
  {
    id: "4",
    registrationDuration: [new Date("2023-10-14"), new Date("2023-10-21")],
    selectionDate: null,
    uploadDuration: null,
    videoType: "롱폼/쇼츠",
    type: "배송형",
    state: "오픈예정",
    brand: "라소미",
    brandLinkUrl: "https://lasomi.co.kr/",
    product: "김태희 탄수효소",
    offer: {
      summary: "김태희 탄수효소 1세트 증정",
      detail: "",
    },
    productLinkUrl:
      "https://lasomi.co.kr/product/11-%EA%B9%80%ED%83%9C%ED%9D%AC-%ED%83%84%EC%88%98%ED%9A%A8%EC%86%8C/10/category/1/display/2/",
    quota: 30,
    applicants: 0,
    fee: 260000,
    thumbnail:
      "https://lasomi.co.kr/web/product/big/202309/2a8bd444ee53136b40e1f68fab937d5e.png",
    mission: "",
    keywords: [""],
    tags: [""],
    registerLinkUrl: "",
  },
  {
    id: "5",
    registrationDuration: [new Date("2023-10-14"), new Date("2023-10-21")],
    selectionDate: null,
    uploadDuration: null,
    videoType: "롱폼/쇼츠",
    type: "배송형",
    state: "오픈예정",
    brand: "라소미",
    brandLinkUrl: "https://lasomi.co.kr/",
    product: "김태희 클렌즙",
    offer: {
      summary: "김태희 클렌즙 1세트 증정",
      detail: "",
    },
    productLinkUrl:
      "https://lasomi.co.kr/product/%EA%B9%80%ED%83%9C%ED%9D%AC-%ED%81%B4%EB%A0%8C%EC%A6%99/9/category/1/display/2/",
    quota: 30,
    applicants: 0,
    fee: 260000,
    thumbnail:
      "https://lasomi.co.kr/web/product/big/202308/43772e2285520cb400dbc8d3973f0f78.png",
    mission: "",
    keywords: [""],
    tags: [""],
    registerLinkUrl: "",
  },
];
