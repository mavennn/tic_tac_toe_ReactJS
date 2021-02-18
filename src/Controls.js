import Scene from './Scene';

document.addEventListener("scroll", () => {
   var st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
   if (st > lastScrollTop){
      // downscroll
      scene.scaleDown(st / 100);
   } else {
      // upscroll
      scene.scaleUp(st / 100);
   }
});


document.addEventListener("click", () => {

    // y axes
    var oldx = 0;
    var direction = "";
    if (e.pageX < oldx) {
        direction = "left"
        scene.transform(e.pageX);

    } else if (e.pageX > oldx) {
        direction = "right"
        scene.transform(-e.pageX);
    }
})