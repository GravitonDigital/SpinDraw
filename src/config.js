let height = 600;
let width = 600;
if (height > window.innerHeight) {
  height = innerHeight;
}
if (width > window.innerWidth) {
  width = innerWidth;
}
if (width < height) {
  height = width;
} else {
  width = height;
}

export default {
  GAMEHEIGHT: width,
  GAMEWIDTH: height,
  LOCALSTORAGENAME: 'spindraw',
  TITLE: 'Spin Draw',
  DISKWIDTH_RADIUS: width/2,
  DISKHEIGHT_RADIUS: height/2,
  DISKCOLOR: 0xffffff
}