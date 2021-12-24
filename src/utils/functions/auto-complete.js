/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/**
 * Create by Juno
 */

export class AutoComplete {
  constructor(element, data, highlight) {
    this.element = element;
    this.data = data;
    this.highlight = highlight;
    this.filterData = [];
    this.checkChoSung = true;
    return this.element.value.length ? this._dataFiltering() : [];
  }

  _dataFiltering() {
    this._checkChoSung();

    this.filterData = this.data.filter((item) => {
      this._checkInArray(this._toKorChars(item.name), this._toKorChars(this.element.value));
    }); // 전체 검색 및 초성검색

    if (this.filterData.length === 0)
      this.filterData = this.data.filter(
        (item) => item.name.indexOf(this.element.value) >= 0 && this.element.value.length >= 2
      ); // 중단 검색

    return this.highlight ? this._serchResultMake() : this.filterData;
  }

  _serchResultMake() {
    this.filterData.map((item) => {
      let liInnerHtml = '';
      for (let i = 0; i < item.name.length; i++) {
        liInnerHtml +=
          item.name[i] === this.element.value[i - item.name.indexOf(this.element.value)]
            ? `<b>${item.name[i]}</b>`
            : item.name[i];
        // ? `<span style="color:${this.highlight}">${item.name[i]}</span>`
      }
      item.name = liInnerHtml;
    });
    return this.filterData;
  }

  _checkInArray(array1, array2) {
    let checkArray = [];
    array2.forEach((item, i) => {
      checkArray.push(array1[i] === item ? true : false);
    });
    return checkArray.includes(false) ? false : true;
  }

  _checkChoSung() {
    // 초성 인지 구분
    let cCode,
      str = this.element.value;
    for (let j = 0; j < this.element.value.length; j++) {
      cCode = str.charCodeAt(j);
      if (cCode === 32) {
        continue;
      } // 한글이 아닌 경우
      if (cCode < 0xac00 || cCode > 0xd7a3) {
        // 초성만 들어온 경우
        this.checkChoSung = false;
        continue;
      }
      this.checkChoSung = true;
    }
  }

  _toKorChars(string) {
    const cCho = [
      'ㄱ',
      'ㄲ',
      'ㄴ',
      'ㄷ',
      'ㄸ',
      'ㄹ',
      'ㅁ',
      'ㅂ',
      'ㅃ',
      'ㅅ',
      'ㅆ',
      'ㅇ',
      'ㅈ',
      'ㅉ',
      'ㅊ',
      'ㅋ',
      'ㅌ',
      'ㅍ',
      'ㅎ',
    ];
    const cJung = [
      'ㅏ',
      'ㅐ',
      'ㅑ',
      'ㅒ',
      'ㅓ',
      'ㅔ',
      'ㅕ',
      'ㅖ',
      'ㅗ',
      'ㅘ',
      'ㅙ',
      'ㅚ',
      'ㅛ',
      'ㅜ',
      'ㅝ',
      'ㅞ',
      'ㅟ',
      'ㅠ',
      'ㅡ',
      'ㅢ',
      'ㅣ',
    ];
    const cJong = [
      '',
      'ㄱ',
      'ㄲ',
      'ㄳ',
      'ㄴ',
      'ㄵ',
      'ㄶ',
      'ㄷ',
      'ㄹ',
      'ㄺ',
      'ㄻ',
      'ㄼ',
      'ㄽ',
      'ㄾ',
      'ㄿ',
      'ㅀ',
      'ㅁ',
      'ㅂ',
      'ㅄ',
      'ㅅ',
      'ㅆ',
      'ㅇ',
      'ㅈ',
      'ㅊ',
      'ㅋ',
      'ㅌ',
      'ㅍ',
      'ㅎ',
    ];
    let cho,
      jung,
      jong,
      cCode,
      str = string;
    let cnt = str.length,
      chars = [],
      chos = [];
    for (let i = 0; i < cnt; i++) {
      cCode = str.charCodeAt(i);
      if (cCode === 32) {
        continue;
      } // 한글이 아닌 경우
      if (cCode < 0xac00 || cCode > 0xd7a3) {
        // 초성만 들어온 경우
        chars.push(str.charAt(i));
        chos.push(str.charAt(i));
        continue;
      }
      cCode = str.charCodeAt(i) - 0xac00;
      jong = cCode % 28; // 종성
      jung = ((cCode - jong) / 28) % 21; // 중성
      cho = ((cCode - jong) / 28 - jung) / 21; // 초성
      chars.push(cCho[cho], cJung[jung]);
      chos.push(cCho[cho]);
      if (cJong[jong] !== '') {
        chars.push(cJong[jong]);
      }
    }
    return this.checkChoSung ? chars : chos;
  }
}
