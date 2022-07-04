!(function (d) {
  var itemClassName = "carousel-item-wp";
  (items = d.getElementsByClassName(itemClassName)),
    (totalItems = items.length),
    (slide = 0),
    (moving = true),
    (dots = []),
    (timerEnd = 0);

  function setInitialClasses() {
    items[totalItems - 1].classList.add("prev");
    items[0].classList.add("active");
    items[1].classList.add("next");
  }
  function insertDots() {
    const dotsWp = document.createElement("div");
    dotsWp.classList.add("dots");
    document
      .querySelector(".switch-wp")
      .insertBefore(dotsWp, document.querySelector(".switch-wp .next"));
    Array.from(items).map(() => {
      const dot = document.createElement("div");
      dot.classList.add("dot");
      dots.push(dot);
      dotsWp.append(dot);
    });
  }
  function setEventListeners() {
    var next = d.querySelector(".switch-wp .next"),
      prev = d.querySelector(".switch-wp .prev");

    next.addEventListener("click", moveNext);
    prev.addEventListener("click", movePrev);

    dots.forEach((dot, i) => {
      dot.addEventListener("click", () => {
        moveCarouselTo(i);
      });
    });
  }

  // Disable interaction by setting 'moving' to true for the same duration as our transition (0.5s = 500ms)
  function disableInteraction() {
    moving = true;
    setTimeout(function () {
      moving = false;
    }, 500);
  }

  function initDots(slide) {
    Array.from(items).map((dot, i) => {
      dots[i].classList.remove("active");
    });
    dots[slide].classList.add("active");
  }

  function moveCarouselTo(slide) {
    console.log("function moveCarouselTo");
    if (!moving) {
      disableInteraction();
      var newPrevious = slide - 1,
        newNext = slide + 1,
        oldPrevious = slide - 2,
        oldNext = slide + 2;

      // Test if carousel has more than three items
      // if (totalItems >= 3) {
      // Checks if the new potential slide is out of bounds and sets slide numbers
      if (newPrevious <= 0) {
        oldPrevious = totalItems - 1;
      } else if (newNext >= totalItems - 1) {
        oldNext = 0;
      }

      // Check if current slide is at the beginning or end and sets slide numbers
      if (slide === 0) {
        newPrevious = totalItems - 1;
        oldPrevious = totalItems - 2;
        oldNext = slide + 1;
      } else if (slide === totalItems - 1) {
        newPrevious = slide - 1;
        newNext = 0;
        oldNext = 1;
      }
      //if only 3 slide
      if (totalItems === 3 && slide === 1) {
        oldNext = totalItems - 1;
      }
      // Based on the current slide, reset to default classes.
      items[oldPrevious].className = itemClassName;
      items[oldNext].className = itemClassName;
      // Add the new classes
      items[newPrevious].className = itemClassName + " prev";
      items[slide].className = itemClassName + " active";
      items[newNext].className = itemClassName + " next";

      loadVid(slide);
      // }
    }
  }

  function loadVid(slide) {
    initDots(slide);
    clearTimeout(timerEnd);

    const currentVid = items[slide].querySelector("video");
    currentVid.currentTime = 0;
    currentVid.play();
    const timer = (currentVid.duration % 60) * 1000;
    console.log("prepare to switch in ", timer, "ms");
    //timerEnd = setTimeout(moveNext, timer);
  }

  function moveNext() {
    if (!moving) {
      if (slide === totalItems - 1) {
        slide = 0;
      } else {
        slide++;
      }
      moveCarouselTo(slide);
    }
  }
  function movePrev() {
    if (!moving) {
      if (slide === 0) {
        slide = totalItems - 1;
      } else {
        slide--;
      }
      moveCarouselTo(slide);
    }
  }

  // Initialise carousel
  function initCarousel() {
   / console.log("init carousel");
    // if one or multiple vid
    if (items.length > 1) {
      setInitialClasses();
      insertDots();
      setEventListeners();
      loadVid(slide);
    } else {
      document.querySelector(".switch-wp").style.display = "none";
      let currentVid = items[slide].querySelector("video");
      items[slide].className = itemClassName + " active";
      currentVid.currentTime = 0;
      currentVid.loop = true;
      currentVid.play();
    }
    moving = false;
  }

  // make it rain
  let waitLoaded = async () => {
    return await document
      .querySelector("#main-container")
      .classList.contains("loading_stop");
  };
  waitLoaded().then(() => {
    initCarousel();
    //console.log("init");
  });
})(document);
