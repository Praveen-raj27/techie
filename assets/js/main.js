/**
* Template Name: Vesperr
* Template URL: https://bootstrapmade.com/vesperr-free-bootstrap-template/
* Updated: Aug 07 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */

  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
 

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  
  document.addEventListener("DOMContentLoaded", function () {
    fetch("../header.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("header").innerHTML = data;
            
            // Now that the header is loaded, initialize event listeners
            initNavMenu();
            initMobileMenu();
        })
        .catch(error => console.error("Error loading header:", error));

        fetch("../page-title.html")
        .then(response => response.text())
        .then(data => {
            // Inject page-title.html content into the .page-title container
            let pageTitleContainer = document.getElementsByClassName("page-title")[0];
            if (pageTitleContainer) {
                pageTitleContainer.innerHTML = data;

                updatePageTitle();
                
                
            }
        })
        .catch(error => console.error("Error loading page title:", error));

        setupTitleCapture();
});

function updatePageTitle() {
  const urlParams = new URLSearchParams(window.location.search);
  
  const pageTitle = urlParams.get("title");

  if (pageTitle) {
      document.querySelector(".current").textContent = pageTitle;
      document.querySelector(".title").textContent = pageTitle;
  }
}
function setupTitleCapture() {
  document.querySelectorAll(".details, .team-member, .features-item").forEach(detail => {
      detail.addEventListener("click", function (event) {
          event.preventDefault(); // Prevent default link behavior

          let container = this.closest("a"); // Check if this element or parent is an <a>
            let anchorTag = container ? container : this.querySelector("h3 a, a.stretched-link");

            if (!anchorTag || !anchorTag.href) {
                console.error("Error: anchor tag is missing or href is null");
                return;
            }

            let titleElement = this.querySelector("h3, h4, a"); // Get <h3>, <h4>, or <a>
            let titleText = titleElement ? titleElement.textContent.trim() : "Unknown Title";
            let pageURL = anchorTag.getAttribute("href");

          if (!pageURL) {
              console.error("Error: pageURL is null");
              return;
          }

          // Redirect with title as a URL parameter
          window.location.href = `${pageURL}?title=${encodeURIComponent(titleText)}`;
      });
  });
}

function initMobileMenu(){
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn?.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });
}
  function initNavMenu() {
      let navmenulinks = document.querySelectorAll('.navmenu a');
      function navmenuScrollspy() {
          let position = window.scrollY + 200;
          navmenulinks.forEach(navmenulink => {            
              if (!navmenulink.hash) return;              
              let section = document.querySelector(navmenulink.hash);
              if (!section) return;

              if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
                  document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
                  navmenulink.classList.add('active');
              } else {
                  navmenulink.classList.remove('active');
              }
          });
      }

      function activeMenuOnNavigation(){
        if (!document.querySelector(navmenulinks.hash)) {
          document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
          const url = window.location.pathname;
          let arr = ['trainings','products','services']
          let pageName = url.split('/')[1]
          if(arr.includes(pageName)){
            let currentMenu = Array.from(navmenulinks).find((menu) => {
              // Make sure to trim spaces and check case-insensitive match              
              return menu.textContent.trim().toLowerCase() === pageName.trim().toLowerCase();
            });
            currentMenu.classList.add('active')            
          }
        };
      }
      activeMenuOnNavigation()

      // Run scrollspy on page load and on scroll
      navmenuScrollspy();
      window.addEventListener("scroll", navmenuScrollspy);
    document.addEventListener('scroll', navmenuScrollspy);
  }
})();