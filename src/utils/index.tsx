import _ from "lodash";
import createCache from "@emotion/cache";
export function createEmotionCache() {
  return createCache({ key: "css" });
}
export function getIsEmail(value: string | null) {
  if (typeof value !== "string") return false;
  var regExp =
    /^([\w\.\_\-])*[a-zA-Z0-9]+([\w\.\_\-])*([a-zA-Z0-9])+([\w\.\_\-])+@(([a-zA-Z0-9])+([\w\.\_\-])+\.)+[a-zA-Z0-9]{2,8}$/;
  return regExp.test(value);
}

export const comma = (num: number) => {
  var regexp = /\B(?=(\d{3})+(?!\d))/g;
  return num.toString().replace(regexp, ",");
};

export function splitBold(text: string) {
  const textArr = text.split("{");
  if (textArr.length === 1) return text;
  const newTextArr = textArr[1].split("}");
  return (
    <span>
      {textArr[0]}
      <b>
        <span className="bar" />
        {newTextArr[0]}
      </b>
      {newTextArr[1]}
    </span>
  );
}

function numberFormat(x: number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function numberToKorean(number: number) {
  var inputNumber = number < 0 ? null : number;
  var unitWords = ["", "만", "억", "조", "경"];
  var splitUnit = 10000;
  var splitCount = unitWords.length;
  var resultArray = [];
  var resultString = "";
  if (inputNumber !== null && number !== 0) {
    for (var i = 0; i < splitCount; i++) {
      var unitResult =
        (inputNumber % Math.pow(splitUnit, i + 1)) / Math.pow(splitUnit, i);
      unitResult = Math.floor(unitResult);
      if (unitResult > 0) {
        resultArray[i] = unitResult;
      }
    }

    for (var i = 0; i < resultArray.length; i++) {
      if (!resultArray[i]) continue;
      resultString =
        String(numberFormat(resultArray[i])) + unitWords[i] + resultString;
    }

    return resultString;
  } else if (number === 0) {
    return 0;
  } else {
    return number;
  }
}
