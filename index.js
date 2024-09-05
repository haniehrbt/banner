const car = document.getElementById("car");
const scrollText = document.getElementById("scrollText");
const tapText = document.getElementById("tapText");
const wheels = document.querySelectorAll(".wheel");

let currentScrollY = 0;
let lastScrollY = 0;
const maxScrollY = document.body.scrollHeight - window.innerHeight;

const H = 120;
const W = window.innerWidth;
const slope = H / W;
const degree = -Math.atan(slope) * (180 / Math.PI);
console.log(slope);

loremIpsumPercent = 6 / 10;
carStopPercent = 3 / 4;
maxFrames = 50;

const keyframes = [];
for (let i = 0; i < maxFrames * carStopPercent; i++) {
  keyframes.push({ translateX: i });
}
console.log(keyframes[9]);

function transformX(x) {
  return (keyframe.translateX * W) / maxFrames;
}

function transformY(x) {
  return -x * slope - 700000 / Math.pow(W, 1.7);
}

for (keyframe of keyframes) {
  let x = transformX(keyframe.translateX);
  keyframe.translateX = `${x}px`;
  keyframe.translateY = `${transformY(x)}px`;
  keyframe.rotate = degree;
}
console.log(keyframes);

let currentFrameIndex = 0;
let hasReachedEnd = false;

function resetCarPosition() {
  car.style.left = 0;
  car.style.bottom = 0;
  car.style.transform = `translate(${keyframes[0].translateX}, ${keyframes[0].translateY}) rotate(${keyframes[0].rotate}deg)`;
  wheels.forEach((wheel) => {
    wheel.style.transform = `rotate(0deg)`;
  });
  setTimeout(() => {
    car.style.transition = "transform 0.3s linear";
  }, 100);
  currentFrameIndex = 0;
  hasReachedEnd = false;
  window.scrollTo(0, 0);
}

// document.addEventListener("DOMContentLoaded", resetCarPosition);

window.addEventListener("load", resetCarPosition);

window.addEventListener("scroll", () => {
  currentScrollY = window.scrollY;

  const scrollPercentage = Math.min(currentScrollY / maxScrollY, 1);
  const frameIndex = Math.round(scrollPercentage * (keyframes.length - 1));

  if (currentScrollY > lastScrollY && !hasReachedEnd) {
    const { translateX, translateY, rotate } = keyframes[frameIndex];
    car.style.transform = `translate(${translateX}, ${translateY}) rotate(${rotate}deg)`;

    if (frameIndex < keyframes.length - 1) {
      wheels.forEach((wheel) => {
        wheel.style.transform = `rotate(${currentScrollY * 2}deg)`;
      });
    } else {
      wheels.forEach((wheel) => {
        wheel.style.transform = `rotate(${(keyframes.length - 1) * 2}deg)`;
      });
      hasReachedEnd = true;
    }

    currentFrameIndex = frameIndex;

    if (frameIndex >= keyframes.length * loremIpsumPercent) {
      scrollText.style.transform = `translate(30%, -170%) rotate(${degree}deg)`;
      scrollText.style.opacity = 1;
    } else {
      scrollText.style.opacity = 0;
    }
    lastScrollY = currentScrollY;
  }
});

document.addEventListener("touchstart", handleTouch, { passive: true });
document.addEventListener("touchmove", handleTouch, { passive: true });

function handleTouch(event) {
  if (event.type === "touchstart") {
  } else if (event.type === "touchmove") {
    const touchY = event.touches[0].clientY;
  }
}

car.addEventListener("click", () => {
  tapText.style.opacity = 1;
  setTimeout(() => {
    tapText.style.opacity = 0;
  }, 5000);
});
