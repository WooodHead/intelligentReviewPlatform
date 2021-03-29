/**
 * 用于把微信原生callback的api，转换为promise
 *
 * 示例：
 *     import {promisify} from '...' // 这一部可以在全局引入或挂载
 *     const res= await promisify(wx.showModal,{content:'确认删除？'})
 */
export function promisify( api, options, ...params ) {
  return new Promise( (resolve, reject) => {
    api( Object.assign( {},  options,  {
      success: resolve,
      fail: reject
    } ), ...params )
  } ).catch( err=>console.log(err) )
}

// 暴露的是一个对象
export default {
  promisify
}
