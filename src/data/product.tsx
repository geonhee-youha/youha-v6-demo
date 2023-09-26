type ModelProps = {
  name: string;
  thumbnail: string;
};

export type ProductProps = {
  registrationDuration: [Date, Date];
  deadline: Date;
  selectionDate: Date;
  uploadDuration: [Date, Date];
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
  models?: ModelProps[];
  mission: string;
  keywords: string[];
  tags: string[];
};
export const products: ProductProps[] = [
  {
    registrationDuration: [new Date("2017-01-26"), new Date("2017-01-26")],
    deadline: new Date("2023-09-31"),
    selectionDate: new Date("2017-01-26"),
    uploadDuration: [new Date("2017-01-26"), new Date("2017-01-26")],
    videoType: "롱폼/쇼츠",
    type: "배송형",
    state: "오픈중",
    brand: "세리박스",
    brandLinkUrl: "https://www.serybox.com/",
    product: "세리번 나이트 V2",
    offer: {
      summary: "세리번 나이트 1세트 증정",
      detail: "",
    },
    productLinkUrl: "",
    quota: 30,
    applicants: 109,
    fee: 260000,
    thumbnail:
      "https://imgproxy.pillyze.io/76x0lo9V-2-FUeKqxIn-6Bv0D-x3OmTavwe47GfaHeI/rs:fill:500:500/czM6Ly9waWxseXplLXByZC1pbWFnZS9wcm9kdWN0cy92MS8zay82YmFjOTdiNC0zMTkzLzEwMDA",
    mission: "",
    keywords: [""],
    tags: [""],
  },
  {
    registrationDuration: [new Date("2017-01-26"), new Date("2017-01-26")],
    deadline: new Date("2023-09-31"),
    selectionDate: new Date("2017-01-26"),
    uploadDuration: [new Date("2017-01-26"), new Date("2017-01-26")],
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
    productLinkUrl: "",
    quota: 30,
    applicants: 0,
    fee: 260000,
    thumbnail:
      "https://gd.image-gmkt.com/li/805/483/1813483805.g_520-w-st_g.jpg",
    mission: "",
    keywords: [""],
    tags: [""],
  },
  {
    registrationDuration: [new Date("2017-01-26"), new Date("2017-01-26")],
    deadline: new Date("2023-09-31"),
    selectionDate: new Date("2017-01-26"),
    uploadDuration: [new Date("2017-01-26"), new Date("2017-01-26")],
    videoType: "롱폼/쇼츠",
    type: "배송형",
    state: "오픈예정",
    brand: "세리박스",
    brandLinkUrl: "https://www.serybox.com/",
    product: "세리번 블루맨 올인원",
    offer: {
      summary: "세리번 비우밍 다이어트 1세트 증정",
      detail: "",
    },
    productLinkUrl: "",
    quota: 30,
    applicants: 0,
    fee: 260000,
    thumbnail:
      "https://serybox.wisacdn.com/_data/attach/202205/31/2b8daba390b5b9bc7ad09f9776be5167.jpg",
    mission: "",
    keywords: [""],
    tags: [""],
  },
  {
    registrationDuration: [new Date("2017-01-26"), new Date("2017-01-26")],
    deadline: new Date("2023-09-31"),
    selectionDate: new Date("2017-01-26"),
    uploadDuration: [new Date("2017-01-26"), new Date("2017-01-26")],
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
    productLinkUrl: "",
    quota: 30,
    applicants: 0,
    fee: 260000,
    thumbnail:
      "https://lasomi.co.kr/web/product/big/202308/83a37f0bc24bcf3ad50e887270d692c5.png",
    mission: "",
    keywords: [""],
    tags: [""],
  },
  {
    registrationDuration: [new Date("2017-01-26"), new Date("2017-01-26")],
    deadline: new Date("2023-09-31"),
    selectionDate: new Date("2017-01-26"),
    uploadDuration: [new Date("2017-01-26"), new Date("2017-01-26")],
    videoType: "롱폼/쇼츠",
    type: "배송형",
    state: "오픈예정",
    brand: "라소미",
    brandLinkUrl: "https://lasomi.co.kr/",
    product: "김태희 탄수효소",
    offer: {
      summary: "김태희 글루요소 1세트 증정",
      detail: "",
    },
    productLinkUrl: "",
    quota: 30,
    applicants: 0,
    fee: 260000,
    thumbnail:
      "https://lasomi.co.kr/web/product/big/202309/2a8bd444ee53136b40e1f68fab937d5e.png",
    mission: "",
    keywords: [""],
    tags: [""],
  },
  {
    registrationDuration: [new Date("2017-01-26"), new Date("2017-01-26")],
    deadline: new Date("2023-09-31"),
    selectionDate: new Date("2017-01-26"),
    uploadDuration: [new Date("2017-01-26"), new Date("2017-01-26")],
    videoType: "롱폼/쇼츠",
    type: "배송형",
    state: "오픈예정",
    brand: "라소미",
    brandLinkUrl: "https://lasomi.co.kr/",
    product: "김태희 클렌즙",
    offer: {
      summary: "김태희 글루요소 1세트 증정",
      detail: "",
    },
    productLinkUrl: "",
    quota: 30,
    applicants: 0,
    fee: 260000,
    thumbnail:
      "https://lasomi.co.kr/web/product/big/202308/43772e2285520cb400dbc8d3973f0f78.png",
    mission: "",
    keywords: [""],
    tags: [""],
  },
];
