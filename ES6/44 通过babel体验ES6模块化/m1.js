let a = 10
let b = 20
let c = 30

function show() {
  console.log('111111111111')
}
// 一个模块只允许一个export default(默认导出)
export default {
  a,
  b,
  show
}

export let s1 = 'aaa'
export let s2 = 'bbb'
export function say() {
  console.log('22222222222')
}
