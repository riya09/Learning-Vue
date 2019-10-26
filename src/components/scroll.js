export function scrollAnimate(elem){
    const target = document.querySelector(elem);
    const targetPosition = target.getBoundingClientRect().top;
    const startPosition = window.pageYOffset;
    let distance = targetPosition - startPosition;
    let startTime = null;

    function animate(timestamp){
        if(!startTime)startTime = timestamp;
        let timeElapsed = timestamp - startTime;
        let run = ease(timeElapsed,startPosition,distance,500);
        window.scrollTo(0,run);
        if(timeElapsed < 500) {
            requestAnimationFrame(animate)
        }
    }
    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) {
            return c / 2 * t * t + b
        }
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
    requestAnimationFrame(animate)
}
