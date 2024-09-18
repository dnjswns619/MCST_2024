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
    })
  })
  inactiveEventArr.forEach(event => {
    gnbSubWrap.forEach(item => {
      item.addEventListener(event, () => {
        item.classList.remove(CLASS_ON);
      })
    })
  })
  lastGnbLink.addEventListener("blur", () => {
    gnbSubWrap.forEach(item => item.classList.remove(CLASS_ON))
  })

  const intro = new Swiper(".intro__slide", {
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
  intro.on("slideChangeTransitionStart", () => {
    slideArr.forEach(slide => {
      slide.classList.contains("swiper-slide-active") ? slideActiveFocus(slide) : slideInactiveFocus(slide)
    })
  })
  // 인트로 자동 슬라이드 제어
  const introSlideBtnWrap = document.querySelector(".swiper__btn")
  const introSlidePlayBtn = document.querySelector(".swiper-button-play");
  const introSlideStopBtn = document.querySelector(".swiper-button-stop");

  introSlideStopBtn.addEventListener("click", () => {
    introSlideBtnWrap.classList.remove("play");
    introSlideBtnWrap.classList.add("stop");
    intro.autoplay.stop();
  })

  introSlidePlayBtn.addEventListener("click", () => {
    introSlideBtnWrap.classList.remove("stop");
    introSlideBtnWrap.classList.add("play");
    intro.autoplay.start();
  })

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
})