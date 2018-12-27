/**
 * @description 函数去抖动
 * @param {*} delay
 * @returns
 */
function debounce(delay) {
    return function (target, name, descriptor) {
        let oriMethod = descriptor.value;
        var timer = null;
        var lastTime = null;
        var queue = 0;
        descriptor.value = function () {
            let args = arguments;
            let now = new Date().getTime();
            if (!timer && queue === 0 && (!lastTime || now - lastTime > delay)) {
                lastTime = new Date().getTime();
                oriMethod.apply(target, args)
            } else { //  至少是lastTime存在
                if (now - lastTime < delay) {
                    queue++;
                    clearTimeout(timer);
                    timer = setTimeout(() => {
                        oriMethod.apply(target, args)
                        queue = 0;
                        timer = null;
                        lastTime = null;
                    }, lastTime + delay - now);
                }
            }
        }
    }
}

export default debounce;