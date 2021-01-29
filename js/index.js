const IOS_USER_AGENT_REGEX = /ipad|iphone|ipod/i;
const PLUMPOP_APP_STORE_URL = "https://apps.apple.com/us/app/super-mario-run/id1145275343";

const ANDROID_USER_AGENT_REGEX = /android/i;
const PLUMPOP_GOOGLE_PLAY_URL = "https://play.google.com/store/apps/details?id=com.nintendo.zara&hl=en_US&gl=US";

const SWIPER_CONTAINER_QUERY_SELECTOR = "div.swiper-container";

const VENDOR_LOGO_WIDTH = 250;

function openURL(url) {
    window.open(url);
}

function initDownloadAppButtonSmallScreen() {
    let showButton = false;
    const downloadAppButton = document.querySelector("a.download-app-small");

    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (IOS_USER_AGENT_REGEX.test(userAgent) && !window.MSStream) {
        downloadAppButton.href = PLUMPOP_APP_STORE_URL;
        showButton = true;
    } else if (ANDROID_USER_AGENT_REGEX.test(userAgent)) {
        downloadAppButton.href = PLUMPOP_GOOGLE_PLAY_URL;
        showButton = true;
    }

    if (showButton) {
        downloadAppButton.style.visibility = "visible";
    }
}

function initDownloadAppButtonsMediumScreen() {
    const downloadIOSAppButton = document.querySelector("a#download-ios-app-medium");
    downloadIOSAppButton.href = PLUMPOP_APP_STORE_URL;

    const downloadAndroidAppButton = document.querySelector("a#download-android-app-medium");
    downloadAndroidAppButton.href = PLUMPOP_GOOGLE_PLAY_URL;
}

window.addEventListener("DOMContentLoaded", function () {
    initDownloadAppButtonSmallScreen();
    initDownloadAppButtonsMediumScreen();
});

function getNumSlidesPerView(windowWidth) {
    let numSlidesPerView;

    if (windowWidth < 540) {
        numSlidesPerView = 1;
    } else if (windowWidth < 840) {
        numSlidesPerView = 2;
    } else if (windowWidth < 1100) {
        numSlidesPerView = 3;
    } else {
        numSlidesPerView = 4;
    }

    return numSlidesPerView;
}

function initSwiperComponent() {
    return new Swiper(SWIPER_CONTAINER_QUERY_SELECTOR, {
        speed: 1500,
        slidesPerView: getNumSlidesPerView(0),
        grabCursor: true,
        touchRatio: 1.75,
        threshold: 5,
        resistance: false,
        freeMode: true,
        freeModeMomentumRatio: 1,
        freeModeMomentumVelocityRatio: 0.15,
        freeModeSticky: true,
        loop: true,
        breakpoints: {
            540: {
                slidesPerView: getNumSlidesPerView(540),
            },
            840: {
                slidesPerView: getNumSlidesPerView(840),
            },
            1100: {
                slidesPerView: getNumSlidesPerView(1100)
            }
        },
        autoplay: {
            delay: 5000,
            disableOnInteraction: false
        }
    });
}

function resizeSwiperContainerPadding() {
    const $swiperContainerContainer = $("div#swiper-container-container");
    const swiperContainerContainerWidth = $swiperContainerContainer.width();

    const windowWidth = $(window).width();
    const numSlidesPerView = getNumSlidesPerView(windowWidth);

    const slidesWidth = numSlidesPerView * VENDOR_LOGO_WIDTH;

    const swiperContainerElement = document.querySelector(SWIPER_CONTAINER_QUERY_SELECTOR);
    const spaceBetweenSlides = (swiperContainerContainerWidth - slidesWidth) / (numSlidesPerView + 1);
    swiperContainerElement.style.paddingLeft = spaceBetweenSlides + "px";
}

function initSwiper() {
    const swiper = initSwiperComponent();
    resizeSwiperContainerPadding();
    swiper.on("resize", function () {
        resizeSwiperContainerPadding();
    });
}

$(document).ready(function () {
    initSwiper();
});
