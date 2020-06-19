// rem等比适配配置文件
 // 基准大小
//   const baseSize = 16 
//   // 设置 rem 函数 
//   function setRem () { 
//     // 当前页面宽度相对于 1920宽的缩放比例，可根据自己需要修改。
//     const scale = document.documentElement.clientWidth / 1920 
//     // 设置页面根节点字体大小（“Math.min(scale, 2)” 指最高放大比例为2，可根据实际业务需求调整） 
//     document.documentElement.style.fontSize = baseSize * Math.min(scale, 2) + 'px' 
//   } 
//     // 初始化 
       
//     setRem() 
//     // 改变窗口大小时重新设置 rem 
//     window.onresize = function () { setRem() }




//设置 rem 函数 
function setRem () { 
    // PC端 
    console.log('非移动设备') 
    // 基准大小 
    baseSize = 100; 
    let basePc = baseSize / 1920; // 表示1920的设计图,使用100PX的默认值 
    let vW = window.innerWidth; // 当前窗口的宽度 
    let vH = window.innerHeight; // 当前窗口的高度 
    // 非正常屏幕下的尺寸换算 
    let dueH = vW * 1080 / 1920 
    if (vH < dueH) { 
        // 当前屏幕高度小于应有的屏幕高度，就需要根据当前屏幕高度重新计算屏幕宽度 
        vW = vH * 1920 /1080 
    } 
    let rem = vW * basePc; 
    // 以默认比例值乘以当前窗口宽度,得到该宽度下的相应font-size值 
    document.documentElement.style.fontSize = rem + "px"; 
} 
// 初始化 
setRem(); 
// 改变窗口大小时重新设置 rem 
window.onresize = function () { setRem() };