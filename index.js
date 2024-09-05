const car = document.getElementById("car");
const scrollText = document.getElementById("scrollText");
const tapText = document.getElementById("tapText");
const wheels = document.querySelectorAll(".wheel");

let currentScrollY = 0;
let lastScrollY = 0;
const maxScrollY = document.body.scrollHeight - window.innerHeight;

// موقعیت‌های کلیدی برای انیمیشن
const keyframes = [
  { translateX: 0, translateY: 0, rotate: 0 },
  { translateX: 15, translateY: -20, rotate: -5 },
  { translateX: 20, translateY: -40, rotate: -10 },
  { translateX: 40, translateY: -80, rotate: -15 },
  { translateX: 60, translateY: -110, rotate: -15 },
  { translateX: 105, translateY: -180, rotate: -15 },
];

// موقعیت فعلی ماشین
let currentFrameIndex = 0;
let hasReachedEnd = false; // متغیر برای پیگیری اینکه آیا ماشین به انتها رسیده است

// تابع برای تنظیم موقعیت اولیه ماشین
function resetCarPosition() {
  car.style.transform = `translate(0%, 0%) rotate(0deg)`;
  wheels.forEach((wheel) => {
    wheel.style.transform = `rotate(0deg)`;
  });
  currentFrameIndex = 0;
  hasReachedEnd = false;
  window.scrollTo(0, 0); // اسکرول صفحه را به ابتدای صفحه ببر
}

// هنگام بارگذاری صفحه
// document.addEventListener("DOMContentLoaded", resetCarPosition);

// هنگام رفرش صفحه
window.addEventListener("load", resetCarPosition);

// هنگام اسکرول کردن
window.addEventListener("scroll", () => {
  currentScrollY = window.scrollY;

  // محاسبه درصد اسکرول
  const scrollPercentage = Math.min(currentScrollY / maxScrollY, 1);
  const frameIndex = Math.floor(scrollPercentage * (keyframes.length - 1));

  // فقط در صورت اسکرول به پایین و اگر به انتها نرسیده باشد، موقعیت ماشین را به‌روز کن
  if (true || (currentScrollY > lastScrollY && !hasReachedEnd)) {
    // تنظیم موقعیت ماشین بر اساس اسکرول
    const { translateX, translateY, rotate } = keyframes[frameIndex];
    car.style.transform = `translate(${translateX}%, ${translateY}%) rotate(${rotate}deg)`;

    // چرخش چرخ‌ها
    if (frameIndex < keyframes.length - 1) {
      wheels.forEach((wheel) => {
        wheel.style.transform = `rotate(${currentScrollY * 2}deg)`;
      });
    } else {
      // چرخ‌ها متوقف می‌شوند
      wheels.forEach((wheel) => {
        wheel.style.transform = `rotate(${(keyframes.length - 1) * 2}deg)`;
      });
      hasReachedEnd = true; // ماشین به انتها رسیده است
    }

    // به‌روزرسانی موقعیت فعلی ماشین
    currentFrameIndex = frameIndex;

    // نمایش متن پشت سر ماشین
    if (frameIndex >= 5) {
      // اگر ماشین از نقطه translateX: 40, translateY: -80 گذشته باشد
      scrollText.style.transform = `translate(30%, -70%) rotate(-15deg)`; // تنظیم موقعیت متن
      scrollText.style.opacity = 1;
    } else {
      scrollText.style.opacity = 0;
    }
  }

  // در صورت اسکرول به بالا یا اگر به انتها رسیده باشد، ماشین در موقعیت فعلی خود باقی می‌ماند
  // if (currentScrollY < lastScrollY || hasReachedEnd) {
  //     // تنظیم موقعیت ماشین به آخرین موقعیت
  //     const { translateX, translateY, rotate } = keyframes[currentFrameIndex];
  //     car.style.transform = `translate(${translateX}%, ${translateY}%) rotate(${rotate}deg)`;

  //     // چرخ‌ها متوقف شوند
  //     wheels.forEach((wheel) => {
  //         wheel.style.transform = `rotate(${(keyframes.length - 1) * 2}deg)`; // یا هر زاویه دیگری که مناسب باشد
  //     });
  // }

  lastScrollY = currentScrollY; // بروزرسانی موقعیت آخرین اسکرول
});

// اضافه کردن رویداد لمسی با پارامتر passive
document.addEventListener("touchstart", handleTouch, { passive: true });
document.addEventListener("touchmove", handleTouch, { passive: true });

// تابع دستگیرنده رویداد لمسی
function handleTouch(event) {
  // کد شما برای مدیریت رویداد لمسی
  if (event.type === "touchstart") {
    // کد برای رویداد touchstart
  } else if (event.type === "touchmove") {
    // کد برای رویداد touchmove
    // می‌توانید از event.touches[0].clientY برای دسترسی به موقعیت لمسی استفاده کنید
    const touchY = event.touches[0].clientY;
    // می‌توانید این مقدار را برای به‌روزرسانی موقعیت ماشین استفاده کنید
  }
}

// هنگام کلیک روی ماشین
car.addEventListener("click", () => {
  tapText.style.opacity = 1; // نمایش متن
  setTimeout(() => {
    tapText.style.opacity = 0; // مخفی کردن متن بعد از 2 ثانیه
  }, 5000);
});
