import { Component } from 'react';

class StringUtil extends Component {

  /**
  * 判断某字符串是否是空字符串
  */
  static isEmpty(string) {
    return string === undefined || string === '';
  }
}

export default StringUtil;
