import m1, { s1, s2 as ss2, say } from './m1' // 默认导入，按需导入（as 别名）

console.log(m1)
console.log(s1)
console.log(ss2)
console.log(say)

import './m2' // 直接导入执行模块方法
