window.addEventListener("load", () => {
  const CLASS_ON = "ON"
  const gnbTitle = document.querySelectorAll(".gnb__item--title");
  const gnbSubWrap = document.querySelectorAll(".gnb__sub-wrap");
  const lastGnbLink = document.querySelector(".lastGnb")
  const activeEventArr = ["mouseenter", "focus"];
  const inactiveEventArr = ["mouseleave", "blur"];
  // 메뉴 호버 & 포커스시 서브 메뉴 보이기
  function gnbSubWrapActive(element) {
    gnbSubWrap.forEach(item => {
      item.classList.remove(CLASS_ON);
    })
    element.classList.add(CLASS_ON);
  }
  
  gnbTitle.forEach((title, idx) => {
    activeEventArr.forEach(event => {
      title.addEventListener(event, () => {
        gnbSubWrapActive(gnbSubWrap[idx]);
      })
      gnbSubWrap.forEach(sub => {
        sub.addEventListener(event, () => {
          gnbSubWrapActive(sub);
        })
      })
    })
    title.addEventListener("mouseleave", () => {
      gnbSubWrap[idx].classList.remove(CLASS_ON)
      if(window.innerWidth < 1200) {
        gnbSubWrap[0].classList.add(CLASS_ON);
      }
    })
  })
  inactiveEventArr.forEach(event => {
    gnbSubWrap.forEach(item => {
      item.addEventListener(event, () => {
        item.classList.remove(CLASS_ON);
        if(window.innerWidth < 1200) {
          gnbSubWrap[0].classList.add(CLASS_ON);
        }
      })
    })
  })
  lastGnbLink.addEventListener("blur", () => {
    gnbSubWrap.forEach(item => item.classList.remove(CLASS_ON))
  })

  // 모바일 메뉴 활성화
  const mobileMenuBtn = document.querySelector(".m-menu__open-btn");
  const menuWrap = document.querySelector(".header__gnb-wrap");
  mobileMenuBtn.addEventListener("click", () => {
    menuWrap.classList.add(CLASS_ON);
    document.body.classList.add("menuActive")
  })
  function windowSize(width, height) {
    if(width < 1200) {
      document.querySelector(".header").classList.add("m-menu");
    } else {
      document.querySelector(".header").classList.remove("m-menu");
    }
  }
  window.onresize = function() {
    const width = window.innerWidth;
    const height = window.innerHeight;	
    windowSize(width, height);
  }
  windowSize(window.innerWidth, window.innerHeight);

  // 모바일 메뉴 닫기
  const menuCloseBtn = document.querySelector(".m-menu__close-btn");
  menuCloseBtn.addEventListener("click", () => {
    menuWrap.classList.remove(CLASS_ON);
  })

  const introSwiperSlide = new Swiper(".intro__slide", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
  const noticeSwiperSlide = new Swiper(".notice__slide", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".notice__swiperBtn .swiper-pagination",
      type: "fraction"
    },
    navigation: {
      nextEl: ".notice__swiperBtn .swiper-button-next",
      prevEl: ".notice__swiperBtn .swiper-button-prev",
    },
  });
  const policySwiperSlide = new Swiper(".policy__slide", {
    slidesPerView: 4,
    spaceBetween: 30,
  });
  const nuriSwiperSlide = new Swiper(".nuri__slide", {
    slidesPerView: 4,
    spaceBetween: 30,
  });
  const agencyBannerSlide = new Swiper(".agency__banner-slide", {
    slidesPerView: 5,
    spaceBetween: 10,
    navigation: {
      nextEl: ".agency__banner-slide--nextBtn",
      prevEl: ".agency__banner-slide--prevBtn",
    },
  });
  // 활성화된 슬라이드에만 tab으로 이동시 focus가 가도록
  function slideActiveFocus(element) {
    const slideLink = element.querySelectorAll(`.slide__link`);
    slideLink?.forEach(link => {
      link.setAttribute("aria-hidden", false);
      link.setAttribute("tabindex", 0);
    })
    element.setAttribute("aria-hidden", false);
    element.setAttribute("tabindex", 0);
  }
  function slideInactiveFocus(element) {
    const slideLink = element.querySelectorAll(`.slide__link`);
    slideLink?.forEach(link => {
      link.setAttribute("aria-hidden", true);
      link.setAttribute("tabindex", -1);
    })
    element.setAttribute("aria-hidden", true);
    element.setAttribute("tabindex", -1);
  }
  const slideArr = document.querySelectorAll(".swiper-slide");
  slideArr.forEach(slide => {
    slide.classList.contains("swiper-slide-active") ? slideActiveFocus(slide) : slideInactiveFocus(slide)
  })
  introSwiperSlide.on("slideChangeTransitionStart", () => {
    slideArr.forEach(slide => {
      slide.classList.contains("swiper-slide-active") ? slideActiveFocus(slide) : slideInactiveFocus(slide)
    })
  })
  // 자동 슬라이드 제어
  function autoSlideControl(element, slide) {
    const slideBtnWrap = document.querySelector(`${element} .swiper__btn`)
    const slidePlayBtn = document.querySelector(`${element} .swiper-button-play`);
    const slideStopBtn = document.querySelector(`${element} .swiper-button-stop`);

    slideStopBtn.addEventListener("click", () => {
      slideBtnWrap.classList.remove("play");
      slideBtnWrap.classList.add("stop");
      slide.autoplay.stop();
    })
  
    slidePlayBtn.addEventListener("click", () => {
      slideBtnWrap.classList.remove("stop");
      slideBtnWrap.classList.add("play");
      slide.autoplay.start();
    })
  }
  autoSlideControl(".intro", introSwiperSlide);
  autoSlideControl(".notice", noticeSwiperSlide);

  // 메뉴 클릭시 하단 컨텐츠 변화
  function activeTitleCont(parent) {
    const contWrap = document.querySelectorAll(`.${parent} .selectCont__wrap`);
    const titleBtn = document.querySelectorAll(`.${parent} .selectCont__selectBtn`);
    titleBtn.forEach(btn => {
      btn.addEventListener("click", () => {
        contWrap.forEach(cont => {
          cont.classList.remove("active");
        })
        btn.closest(".selectCont__wrap").classList.add("active");
      })
    })
  }
  activeTitleCont("cont1__left");
  activeTitleCont("cont1__right");
  activeTitleCont("cont2__left");
  activeTitleCont("cont3__inner");
})