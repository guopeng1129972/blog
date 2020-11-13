/* jshint esversion: 6 */
function ToolSidePlugin(options) {
  let defaultOptions = {
    slidesClass: ".singleSlide",
    container: ".slideContainer",
    nextButton: ".nextSlide",
    previousButton: ".previousSlide"
  };

  options = {
    ...defaultOptions,
    ...options
  };

  let _this = this;
  let slides = [];
  let currentSlideIdex = 0;

  this.prepareControls = function () {
    const nextButton = document.createElement("button");
    const previousButton = document.createElement("button");
    nextButton.setAttribute("class", "next");
    nextButton.innerHTML = "Next";
    previousButton.setAttribute("class", "prev");
    previousButton.innerHTML = "Prev";
    let controleContainer = document.createElement("div");
    controleContainer.setAttribute("class", "too-slide-control-container");
    controleContainer.appendChild(previousButton);
    controleContainer.appendChild(nextButton);
    document.querySelector(options.container).appendChild(controleContainer);
    nextButton.addEventListener("click", function () {
      _this.next();
    });
    previousButton.addEventListener("click", function () {
      _this.previous();
    });
  };

  this.hideOtherSlides = function () {
    document.querySelectorAll(options.slidesClass).forEach((slide, index) => {
      slides[index].style = "display:none";
    });
  };

  this.goToSlide = function (index) {
    this.hideOtherSlides();
    if (index > slides.length - 1) {
      index = 0;
    }
    if (index < 0) {
      index = slides.length - 1;
    }
    slides[index].style = "display:block";
    currentSlideIndex = index;
  };



  this.next = function () {
    this.goToSlide(currentSlideIndex + 1);
  };
  this.previous = function () {
    this.goToSlide(currentSlideIndex - 1);
  };
  this.init = function () {
    document.querySelectorAll(options.container).className += " too-slide-slider-container";
    document.querySelectorAll(options.slidesClass).forEach((slide, index) => {
      slides[index] = slide;
      slides[index].style = "display:none";
      slides[index].className += " too-slide-single-slide too-slide-fade";
    });
    this.goToSlide(0);
    this.prepareControls();
  };

  this.init();

}