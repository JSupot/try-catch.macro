# try-catch.macro

在项目开发中经常会遇到一些错误没有抛出，导致无法定位问题。希望通过一种简单的方法来对函数进行`try catch`包装。

通过babel-plugin-marcos来进行按需的转换，而不是通过babel的插件进行全局的替换。

装饰器语法对于单纯的函数没法处理，所以这里就选用了flow的语法。使用flow的语法来对需要转换的方法进行标记，在语法方法可能不太符合flow的标准。


## Installation

```
npm install --save-dev babel-plugin-macros try-catch.macro @babel/preset-flow 
```

```
yarn add babel-plugin-macros try-catch.macro @babel/preset-flow --dev
```

因为使用了flow的语法进行函数标记，所以需要安装`@babel/preset-flow`来对flow的语法进行处理

## Usage

```js

// babel.config.js add babel-plugin-macros and @babel/preset-flow

plugins = ['babel-plugin-macros'];
presets = ['@babel/preset-flow'];

```

```js
import { TryCatch } from 'try-catch.macro';

var a = (b): TryCatch => {
  return b;
}

class Test {

  print = (): TryCatch => {
    const data = this.getData();

    return data;
  }
}

      ↓ ↓ ↓ ↓ ↓ ↓

var a = (b) => {
  try {
    return b;
  } catch(e) {
    console.error(e);
  }
}

class Test {

  print = () => {
    try {
      const data = this.getData();

      return data;
    } catch(e) {
      console.log(e);
    }
  }
}

```

```js
import { TryCatch } from 'try-catch.macro';

var a = (b): TryCatch => {
  try {
    return b;
  } catch(e) {
    console.log(e);
  }
}

      ↓ ↓ ↓ ↓ ↓ ↓

var a = (b) => {
  try {
    return b;
  } catch(e) {
    console.log(e);
  }
}

```

对于非函数或者函数已经被try catch包裹了一层，不会进行处理