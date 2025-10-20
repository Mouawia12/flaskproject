(function ($, Modernizr) {
  
    // Mode of the modern standard
    'use strict';
    
    // Event is fired after whole content is loaded.
    $(window).on('load', function () {
    });
    
    // Function to execute when the DOM is fully loaded.
    $(function () {
      
      // Variables
      var js_window = $(window);
      var window_width = js_window.width();
      var window_height = js_window.height();
      var window_scroll_top = js_window.scrollTop();
      var js_document = $(document);
      var html = $('html');
      var cube = $('.js-cube');
      var stories = $('.stories');
      var custom_file = $('.custom__file');
      var form_row = $('.form__row');
      var form_field = $('.form__field').not('[type="file"]');
      var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
      var file_size_limit = $('.js-file-size-limit');
      var file_size_limit_value = parseInt(file_size_limit.val());
      var hasFileSizeLimit = file_size_limit.length;
  
      var isValidFileSize = true;
  
      var textarea = $('.js-autosize');
      var hasTextarea = textarea.length;
  
      // If JavaScript enabled
      jsEnable('html');
      
      // dppx value of retina display
      dppx();
      
      // If support display: flow-root
      supportFlowRoot();
      
      // Remove class .error when receives focus
      errorField('.error');
      
      // Verification of support autofocus
      autoFocus('.autofocus');
      
      // Scroll To Top
      scrollToTop('.scroll-top');
      
      // Smooth scrolling to anchor links
      scrollToAnchorLinks('body');
      
      // Smooth scrolling to element
      scrollToElement('.js-scroll-down', '.stories', 500);
      
      /** Scroll to block stories after mouse scroll (only one time) */
      if (stories.length && window_width > 768) {
        
        var stories_offset = stories.offset().top;
        
        if (window_scroll_top > stories_offset / 2) {
          stories.addClass('is-scrolled');
        }
        
        js_window.on('scroll', function () {
          
          if (stories.hasClass('is-scrolled')) return;
          
          var scrollTop = js_window.scrollTop();
          
          if (scrollTop < stories_offset) {
            stories.addClass('is-scrolled');
            $('html, body').animate({scrollTop: stories_offset}, 500);
            return false;
          }
        });
      }
  
      /** Textarea autosize */
      if (hasTextarea && typeof autosize === 'function') autosize(textarea);
  
      /** Contact form 7 validate file size limit */
      if (hasFileSizeLimit) {
  
        var form = file_size_limit.closest('.wpcf7-form');
  
        var file = form.find('[type="file"]');
  
        file.on('change', function (e) {
  
          var file_error = form.find('.js-file-error');
  
          var files = e.target.files, hasFiles = files.length, file_size;
  
          if (hasFiles) {
  
            file_size = files[0].size;
  
            if (file_size > file_size_limit_value) {
              $(this).closest('.form__row').append('<span role="alert" class="wpcf7-not-valid-tip js-file-error">Uploaded file is too large.</span>');
              isValidFileSize = false;
            } else {
              if (file_error.length) {
                file_error.remove();
              }
              isValidFileSize = true;
            }
  
          } else {
            if (file_error.length) {
              file_error.remove();
            }
            isValidFileSize = true;
          }
  
        });
  
        $('.wpcf7-submit').on('click', function () {
          if (!isValidFileSize) {
            return false;
          }
        });
  
      }
      
      /** Custom File */
      custom_file.on('change', '[type="file"]', function (e) {
        var default_text = 'Select a file...';
        var text = $(this).closest('.custom__file').find('.custom__filename');
        var file_name = e.target.value.split('\\').pop();
        text = file_name !== '' ? text.text(file_name) : text.text(default_text);
      });
  
      /** Form fields hint label */
      form_field.on('focus', function () {
        $(this).closest(form_row).addClass('is-focus');
      }).on('blur', function () {
        var el = $(this);
        if (!is_empty_field(el)) {
          el.closest(form_row).removeClass('is-focus').addClass('is-valid');
        } else {
          el.closest(form_row).removeClass('is-focus is-valid');
        }
      });
      
      function is_empty_field (field) {
        var value = field.val();
        return value === '' || value.length < 1;
      }
      
      check_fields(form_field);
      
      function check_fields (elements) {
        $(elements).each(function (index, value) {
          var el = $(this);
          if (!is_empty_field(el)) {
            el.closest(form_row).removeClass('is-focus').addClass('is-valid');
          } else {
            el.closest(form_row).removeClass('is-focus is-valid');
          }
        });
      }
      
      // Universal JavaScript for blocks with tabs
      //tabs('.fk-tabs', '.fk-tabs-list', '.fk-tab-item');
      
      // JS for working with accordion
      //fk_accordion('.fk-accordion', '.fk-accordion-switch', 'js-opened');
      
      // Counter to increase or decrease the value
      //fk_number('.fk-number', '.fk-number-field', '.fk-number-spin-plus', '.fk-number-spin-minus');
      
      // Modernizr support
      if (Modernizr) {
        
        console.info('Library Modernizr connected');
        
        Modernizr.testStyles('#modernizr { height: 50vh; }', function (elem) {
          var height = parseInt(window.innerHeight / 2, 10);
          var compStyle = parseInt(computedStyle(elem, null, 'height'), 10);
          Modernizr.addTest('cssvhunit', compStyle == height);
        });
        
        Modernizr.addTest('preserve3d', function () {
          var outerAnchor, innerAnchor;
          var CSS = window.CSS;
          var result = false;
          
          if (CSS && CSS.supports && CSS.supports('(transform-style: preserve-3d)')) {
            return true;
          }
          
          outerAnchor = createElement('a');
          innerAnchor = createElement('a');
          
          outerAnchor.style.cssText = 'display: block; transform-style: preserve-3d; transform-origin: right; transform: rotateY(40deg);';
          innerAnchor.style.cssText = 'display: block; width: 9px; height: 1px; background: #000; transform-origin: right; transform: rotateY(40deg);';
          
          outerAnchor.appendChild(innerAnchor);
          docElement.appendChild(outerAnchor);
          
          result = innerAnchor.getBoundingClientRect();
          docElement.removeChild(outerAnchor);
          
          result = result.width && result.width < 4;
          return result;
        });
        
        //setTimeout(function () {}, 200);
        
        if (Modernizr.preserve3d && Modernizr.csstransforms) {
          /** Gyroscope or  Cube motions */
          if (cube.length) {
            if (isMobile) {
              gyroscopeInit();
            } else {
              cubeInertiaPhysics();
            }
          }
        }
        
      } else {
        
        html.addClass('no-modernizr');
        console.info('Library Modernizr is not connected');
        
      }
      
      // Make something with an element when clicked beyond its borders (uncomment for use)
      // $(document).on('click', function (e) {
      //   if (!$(e.target).closest('').length) {}
      // });
      
      // The resize event occurs when the browser window changes size.
      js_window.on('resize', function () {
      });
      
      /**
       * PopUP
       */
      var popup = $('.popup');
      var popupItem = $('.js-popup');
      
      popupItem.on('click', function () {
        if (popup.hasClass('is-opened')) {
          popup.removeClass('is-opened');
        } else {
          popup.addClass('is-opened');
        }
      });
      
      popup.on('click', '.popup__overlay, .popup__close', function () {
        popup.removeClass('is-opened');
      });
      
      /**
       * Slick
       */
      var feedbacks = $('.js-feedbacks');
      if (feedbacks.length) {
        feedbacks.slick({
          adaptiveHeight: false,
          autoplay: true,
          autoplaySpeed: 5000,
          arrows: false,
          appendDots: '.slider-reviews',
          dots: true,
          dotsClass: 'slider-nav', // slick-dots slider-nav
          fade: false,
          infinite: true,
          responsive: [],
          slidesToShow: 1,
          slidesToScroll: 1,
          speed: 500,
          variableWidth: false
        });
      }
      
      var steps_list = $('.js-steps-list').find('.step__item');
      var steps_nav = $('.js-steps-nav');
      
      if (steps_list.length) {
        
        steps_list.on('click', function () {
          var _curr, _prev, _next, _prev_length, _next_length, _curr_index, _curr_slide_index;
          
          _curr = $(this);
          _curr_index = _curr.index();
          
          _prev = _curr.prev();
          _prev_length = _prev.length;
          
          _next = _curr.next();
          _next_length = _next.length;
          
          _curr_slide_index = steps_nav.slick('slickCurrentSlide');
          
          if (_curr_index !== _curr_slide_index) {
            _curr.addClass('is-active').siblings().removeClass('is-active');
            steps_nav.slick('slickGoTo', _curr_index);
          }
          
          window_width = js_window.width();
          
          if (window_width <= 768) {
            steps_list.addClass('is-item-hidden').removeClass('step__item--mobile1 step__item--mobile2 step__item--mobile3');
            
            $([_prev, _curr, _next]).delay(200).removeClass('is-item-hidden');
            
            if (_prev_length === 0) {
              _curr.addClass('step__item--mobile1');
              _next.addClass('step__item--mobile2');
              _next.next().addClass('step__item--mobile3');
            } else if (_next_length === 0) {
              _prev.prev().addClass('step__item--mobile1');
              _prev.addClass('step__item--mobile2');
              _curr.addClass('step__item--mobile3');
            } else {
              _prev.addClass('step__item--mobile1');
              _curr.addClass('step__item--mobile2');
              _next.addClass('step__item--mobile3');
            }
          }
        });
        
        steps_nav.slick({
          infinite: false,
          slidesToShow: 1,
          slidesToScroll: 1,
          prevArrow: '<div class="controls controls--left"></div>',
          nextArrow: '<div class="controls controls--right"></div>',
          fade: false,
          responsive: [
            {
              breakpoint: 769,
              settings: {
                arrows: false,
              }
            },
          ],
        }).on('afterChange', function () {
          var _curr_slide_index = steps_nav.slick('slickCurrentSlide');
          steps_list.eq(_curr_slide_index).click().addClass('is-active').siblings().removeClass('is-active');
        });
        
        if (window_width <= 768) {
          steps_nav.slick('slickGoTo', 3);
        }
        
      }
      
      var testimonials = $('.js-testimonials');
      var testimonials_nav = $('.js-list-logo');
      
      if (testimonials.length) {
        testimonials.slick({
          adaptiveHeight: false,
          autoplay: true,
          autoplaySpeed: 5000,
          arrows: false,
          asNavFor: testimonials_nav,
          dots: false,
          fade: false,
          infinite: true,
          responsive: [],
          slidesToShow: 1,
          slidesToScroll: 1,
          speed: 500,
          variableWidth: false
        });
        
        testimonials_nav.slick({
          slidesToShow: 6,
          slidesToScroll: 1,
          asNavFor: testimonials,
          arrows: false,
          dots: false,
          centerMode: false,
          focusOnSelect: true,
          responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1
              }
            },
          ],
        });
      }
      
      /** Contact page google map toggle */
      var locations = $('.js-locations');
      
      locations.on('click', ':not(.is-active)', function () {
        var data = $(this).data();
        initAdoriasoftGMap(data.coordinates.split(", "), data.content);
        $(this).addClass('is-active').siblings().removeClass('is-active');
      });
      
      var iso = $('.country-iso');
      
      if (iso.length) {
        iso.each(function (index, element) {
          var id = $(element).data('iso').toUpperCase();
          $('#' + id).addClass('is-active');
        });
      }
      
      var worldMap = $('.js-world-map');
      var svgWorldMapPath = $('.svg-world-map').find('path');
      var mapHint = $('.js-map-hint');
      
      
      var current_path = undefined;
      
      function is_undefined (element) {
        return element === undefined;
      }
      
      function attr_id (element) {
        return $(element).attr('id').toLowerCase();
      }
      
      function set_current_path (element) {
        if (is_undefined()) {
          current_path = element;
        }
      }
      
      function clear_current_path () {
        if (!is_undefined(current_path)) {
          current_path.removeClass('is-current');
          showOrHideCountry(attr_id(current_path));
          current_path = undefined;
          mapHint.removeClass('is-active');
        }
      }
      
      function showOrHideCountry (element) {
        var el = $('.iso-' + element);
        if (el.hasClass('is-hidden')) {
          el.removeClass('is-hidden');
        } else {
          el.addClass('is-hidden');
        }
      }
      
      // touchend touchmove
      worldMap.on('mouseover ', function (event) {
        
        if (event.target.tagName === 'path') {
          
          var el = $(event.target);
          
          clear_current_path();
          
          if (!el.hasClass('is-active')) return;
          
          set_current_path(el);
          
          showOrHideCountry(attr_id(el));
          smartPosition(worldMap, event, mapHint);
          
          if (!el.hasClass('is-current')) {
            el.addClass('is-current');
            mapHint.addClass('is-active');
          }
          
        } else if (event.target.tagName === 'svg') {
          clear_current_path();
        } else {
          return false;
        }
        
        /*mapHint.on('transitionend', function () {
         $(this).addClass('is-active');
         });*/
        
      });
      
      
      function smartPosition (container, element, hint) {
        
        var worldMapSize = getElementSize(container);
        var mapHintSize = getElementSize(hint);
        
        var pathSize = getSvgPathSize(element.target);
        var boxOffset = getOffsetElement(element);
        
        var x = worldMapSize.width - boxOffset.offsetX - mapHintSize.width;
        var y = worldMapSize.height - boxOffset.offsetY - mapHintSize.height;
        
        var offsetX = boxOffset.offsetX;
        var offsetY = boxOffset.offsetY;
        
        var horizontal = x >= 0 ? 'left' : 'right';
        var vertical = y >= 0 ? 'top' : 'bottom';
        
        if (horizontal === 'left' && vertical === 'top') {
          hint.css({
            'top': offsetY,
            'right': 'auto',
            'bottom': 'auto',
            'left': offsetX
          })
        } else if (horizontal === 'right' && vertical === 'top') {
          hint.css({
            'top': offsetY,
            'right': worldMapSize.width - offsetX,
            'bottom': 'auto',
            'left': 'auto'
          })
        } else if (horizontal === 'left' && vertical === 'bottom') {
          hint.css({
            'top': 'auto',
            'right': 'auto',
            'bottom': worldMapSize.height - offsetY,
            'left': offsetX
          })
        } else if (horizontal === 'right' && vertical === 'bottom') {
          hint.css({
            'top': 'auto',
            'right': worldMapSize.width - offsetX,
            'bottom': worldMapSize.height - offsetY,
            'left': 'auto'
          })
        }
      }
      
      var timer = $('.js-timer');
      
      if (timer.length) {
        var timerElem = timer.countTo({
          speed: 1000,
          refreshInterval: 100,
          decimals: 0,
          formatter: function (value, options) {
            return value.toFixed(options.decimals);
          },
          onUpdate: function (value) {
            console.debug(this);
          },
          onComplete: function (value) {
            console.debug(this);
          }
        });
        
        if (!isMobile) {
          timerElem.countTo('stop');
        }
      }
      
      var wowElements = $('.wow');
      
      if (wowElements.length) {
        if (window.WOW !== undefined) {
          var wow = new WOW({
            boxClass: 'wow',
            animateClass: 'animated',
            offset: 220,
            mobile: false,
            live: true,
            callback: function (box) {
              if (timer.length) {
                var el = $(box);
                if (el.hasClass('approach__item') && el.hasClass('animated')) {
                  el.find(timerElem).countTo('start');
                }
              }
            },
            scrollContainer: null
          });
          
          wow.init();
          
          if (window_scroll_top > 50) {
            setTimeout(function () {
              $('.logo, .menu').css('visibility', 'visible');
            }, 500);
          }
        }
      }
      
      var html_top = parseInt(html.css('margin-top'));
      
      var share_buttons = $('.a2a_kit'), hasShareButtons = share_buttons.length;
      var share_buttons_position, share_buttons_offset, is_fixed_share_button = false;
      
      if(hasShareButtons) {
        share_buttons_offset = share_buttons.offset().top;
        share_buttons_position = share_buttons.css('position');
      }
      
      var header = $('.js-header');
      var header_height = header.innerHeight();
      var header_space = $('.js-header-space');
      
      var total_height = header_height;
      
      var blog_nav = $('.js-blog-nav'), blog_nav_height, blog_nav_offset;
      
      var hasBlogNav = blog_nav.length && blog_nav.is(':visible');
      
      if (hasBlogNav) {
        blog_nav_height = blog_nav.outerHeight();
        blog_nav_offset = blog_nav.offset().top;
        total_height = header_height + blog_nav_height;
      }
      
      var is_fixed_header = false;
      var is_fixed_blog_nav = false;
      
      var start_point = 0;
      
      function set_fixed_header () {
        header.addClass('is-fixed');
        is_fixed_header = true;
      }
      
      function remote_fixed_header () {
        header.removeClass('is-fixed');
        is_fixed_header = false;
      }
      
      js_window.on('scroll', function () {
        
        var _scroll_top = js_window.scrollTop();
        if (hasBlogNav) {
          
          if (!is_fixed_blog_nav && _scroll_top > blog_nav_offset) {
            blog_nav.addClass('is-fixed');
            header_space.css('height', blog_nav_height);
            is_fixed_blog_nav = true;
          } else if (is_fixed_blog_nav && is_fixed_header && _scroll_top <= html_top) {
            remote_fixed_header();
            blog_nav.removeClass('is-fixed');
            blog_nav.css('top', 0);
            header_space.css('height', 0);
            is_fixed_blog_nav = false;
          }
          
          if (!is_fixed_header && is_fixed_blog_nav && _scroll_top < start_point) {
            set_fixed_header();
            blog_nav.css('top', header_height);
            header_space.css('height', total_height);
          } else if (is_fixed_header && is_fixed_blog_nav && _scroll_top > start_point) {
            remote_fixed_header();
            blog_nav.css('top', 0);
            header_space.css('height', blog_nav_height);
          }
          
          
        } else {
          
          if (!is_fixed_header && _scroll_top < start_point && _scroll_top > header_height && _scroll_top !== 0) {
            set_fixed_header();
            header_space.css('height', header_height);
          } else if ((is_fixed_header && _scroll_top > start_point) || _scroll_top <= html_top) {
            remote_fixed_header();
            header_space.css('height', 0);
          }
          
        }
    
        if (hasShareButtons && share_buttons_position === 'absolute') {
    
          if (!is_fixed_share_button && _scroll_top > share_buttons_offset - 100) {
            share_buttons.addClass('is-fixed');
            is_fixed_share_button = true;
          } else if (is_fixed_share_button && _scroll_top < share_buttons_offset - 150) {
            share_buttons.removeClass('is-fixed');
            is_fixed_share_button = false;
          }
          
        }
        
        start_point = _scroll_top;
        
      });
      
      var hamburger = $('.js-hamburger');
      var nav = $('.js-nav');
      var blackout = $('.js-blackout');
      
      hamburger.on('click', function () {
        hamburger.add(nav).add(blackout).toggleClass('is-active');
      });
      
      $(document).on('click', function (e) {
        if (!$(e.target).closest(hamburger.add(nav)).length) {
          hamburger.add(nav).add(blackout).removeClass('is-active');
        }
      });
      
      var works_list = $('.js-works-list');
      
      if (works_list.length) {
        var works_isotope = works_list.isotope({
          itemSelector: '.works__item',
          filter: '*',
        });
        
        var filter = $('.js-filter');
        
        var hash = location.hash.substr(1);
        
        if (hash) {
          setTimeout(function () {
            filter.find('[data-filter=".' + hash + '"]').click();
          }, 50);
        }
        
        filter.on('click', ':not(.is-active)', function () {
          
          var el = $(this), filter_value = el.data('filter');
          
          $(this).addClass('is-active').siblings().removeClass('is-active');
          
          works_isotope.isotope({
            filter: filter_value
          })
          
        });
      }
      
      /** Ajax function */
      revealPosts();
      
      $(document).on('click', '.js-load-more:not(.is-loading)', function () {
        
        var _this = $(this);
        var page = _this.data('page');
        var cat_id = _this.data('category-id');
        var new_page = page + 1;
        var ajax_url = _this.data('url');
        
        _this.addClass('is-loading').find('.btn__text').addClass('is-hidden');
        _this.find('.ajax-loader').removeClass('is-hidden').addClass('spin');
        
        $.ajax({
          
          url: ajax_url,
          type: 'POST',
          data: {
            page: page,
            cat_id: cat_id,
            action: 'adoriasoft_load_more',
          },
          error: function (response) {
            console.log(response);
          },
          success: function (response) {
            
            //console.log(response);
            
            if (response === '0') {
              
              $('.js-post-container').parent().append('<p class="text-center">No more posts to load.</p>');
              _this.addClass('is-hidden');
              
            } else {
              
              setTimeout(function () {
                
                _this.data('page', new_page);
                $('.js-post-container').append(response);
                _this.removeClass('is-loading').find('.btn__text').removeClass('is-hidden');
                _this.find('.ajax-loader').removeClass('spin').addClass('is-hidden');
                
                revealPosts();
                
              }, 1000);
              
            }
            
          }
          
        });
        
      });
      
      function revealPosts () {
        
        var posts = $('.blog__item:not(.is-revealed)');
        var i = 0;
        setInterval(function () {
          
          if (i >= posts.length) return false;
          
          var el = posts[i];
          
          $(el).addClass('is-revealed');
          
          i++;
          
        }, 200);
      }
      
      /** init Progress indicate scroll article */
      var article = $('.content'), progress = $('.js-progress');
      
      if (progress.length) {
        progress_scroll_article(progress, article);
      }
      
      /** Progress indicate scroll article */
      function progress_scroll_article (progress_element, article_element) {
        
        var article = $(article_element), article_height = article.height(), article_offset = article.offset().top;
        
        var progress_max, progress = $(progress_element);
        
        progress_max = article_height - window_height + article_offset;
        
        progress.attr({
          'max': progress_max,
          'value': window_scroll_top
        });
        
        js_document.on('scroll', function () {
          
          window_scroll_top = js_window.scrollTop();
          
          progress.attr('value', window_scroll_top);
          
        });
      }
      
    });
    
    function getOffsetElement (elem) {
      return {
        offsetX: elem.offsetX,
        offsetY: elem.offsetY
      }
    }
    
    function getElementSize (elem) {
      return {
        width: round(elem.outerWidth()),
        height: round(elem.outerHeight())
      }
    }
    
    function getSvgPathSize (elem) {
      var box = elem.getBoundingClientRect();
      
      return {
        width: round(box.width),
        height: round(box.height)
      }
    }
    
    function round (value) {
      return Math.round(value);
    }
    
    /*var stepsLine = $('.js-steps-line');
     if(stepsLine.length) {
     var linePath = document.getElementById('js-line-path');
     var linePathLength = linePath.getTotalLength();
     $(linePath).attr({
     'stroke-dasharray': linePathLength,
     'stroke-dashoffset': linePathLength
     });
     setTimeout(function () {
     $(linePath).attr({
     'stroke-dashoffset': linePathLength * 2
     });
     }, 1000);
     console.log(linePath);
     console.log(linePathLength);
     }*/
    
    var docElement = document.documentElement;
    var isSVG = docElement.nodeName.toLowerCase() === 'svg';
    
    /**
     * createElement is a convenience wrapper around document.createElement. Since we
     * use createElement all over the place, this allows for (slightly) smaller code
     * as well as abstracting away issues with creating elements in contexts other than
     * HTML documents (e.g. SVG documents).
     *
     * @access private
     * @function createElement
     * @returns {HTMLElement|SVGElement} An HTML or SVG element
     */
    
    function createElement () {
      if (typeof document.createElement !== 'function') {
        // This is the case in IE7, where the type of createElement is "object".
        // For this reason, we cannot call apply() as Object is not a Function.
        return document.createElement(arguments[0]);
      } else if (isSVG) {
        return document.createElementNS.call(document, 'http://www.w3.org/2000/svg', arguments[0]);
      } else {
        return document.createElement.apply(document, arguments);
      }
    }
    
    /**
     * wrapper around getComputedStyle, to fix issues with Firefox returning null when
     * called inside of a hidden iframe
     *
     * @access private
     * @function computedStyle
     * @param {HTMLElement|SVGElement} - The element we want to find the computed styles of
     * @param {string|null} [pseudoSelector]- An optional pseudo element selector (e.g. :before), of null if none
     * @returns {CSSStyleDeclaration}
     */
    function computedStyle (elem, pseudo, prop) {
      var result;
      
      if ('getComputedStyle' in window) {
        result = getComputedStyle.call(window, elem, pseudo);
        var console = window.console;
        
        if (result !== null) {
          if (prop) {
            result = result.getPropertyValue(prop);
          }
        } else {
          if (console) {
            var method = console.error ? 'error' : 'log';
            console[method].call(console, 'getComputedStyle returning null, its possible modernizr test results are inaccurate');
          }
        }
      } else {
        result = !pseudo && elem.currentStyle && elem.currentStyle[prop];
      }
      
      return result;
    }
    
    /**
     * Filter of projects
     *
     * @example
     * filterBy('.js-filter', '.js-works-list');
     * @author Fedor Kudinov <brothersrabbits@mail.ru>
     * @param {(string|Object)} filter_element -
     * @param {(string|Object)} container_element -
     */
    function filterBy (filter_element, container_element) {
      var filter = $(filter_element), items = $(container_element).children();
      
      var hash = location.hash.substr(1);
      
      if (hash) {
        setTimeout(function () {
          filter.find('[data-id=' + hash + ']').click();
        }, 50);
      }
      
      filter.on('click', ':not(.is-active)', function () {
        
        var _this = $(this);
        
        _this.addClass('is-active').siblings().removeClass('is-active');
        
        var current_id = _this.data('id');
        
        items.each(function (index, value) {
          var el = $(this);
          var data_id = el.data('id');
          
          if (data_id.indexOf(current_id) !== -1) {
            el.removeClass('is-hidden');
          } else {
            el.addClass('is-hidden');
          }
        });
        
      });
    }
    
    // Variables
    var supportsCSS = !!((window.CSS && window.CSS.supports) || window.supportsCSS || false);
    
    /**
     * Javascript enable
     *
     * @example
     * jsEnable('html');
     * @author Fedor Kudinov <brothersrabbits@mail.ru>
     * @param {(string|Object)} [element='html'] - selected element (the default html tag)
     */
    function jsEnable (element) {
      
      var el = element || 'html';
      
      $(el).removeClass('no-js').addClass('js');
      
    }
    
    /**
     * dppx value of retina display
     *
     * @example
     * dppx();
     * @author Fedor Kudinov <brothersrabbits@mail.ru>
     */
    function dppx () {
      
      if (window.devicePixelRatio !== undefined) {
        
        $('html').addClass(window.devicePixelRatio + 'dppx');
        
      }
      
    }
    
    /**
     * Support display: flow-root
     *
     * @example
     * supportFlowRoot();
     * @author Fedor Kudinov <brothersrabbits@mail.ru>
     */
    function supportFlowRoot () {
      
      if (supportsCSS) {
        
        var html = $('html'), isSupport = CSS.supports('(display: flow-root)');
        
        if (isSupport) {
          
          html.addClass('flow-root');
          
        } else {
          
          html.addClass('no-flow-root');
          
        }
        
      }
      
    }
    
    /**
     * Delete class .error with focus
     *
     * @example
     * errorField('.error');
     * @author Fedor Kudinov <brothersrabbits@mail.ru>
     * @param {(string|Object)} [element='.error'] - selected element
     * @param {string} [class_error='error'] - class which will be removed after receiving focus
     */
    function errorField (element, class_error) {
      
      var el = element || '.error', error = class_error || 'error';
      
      $('body').on('focus', el, function () {
        
        $(this).removeClass(error);
        
      });
      
    }
    
    /**
     * Autofocus
     *
     * @example
     * autoFocus('.autofocus');
     * @author Fedor Kudinov <brothersrabbits@mail.ru>
     * @param {(string|Object)} element - by selected element will be added focus
     */
    function autoFocus (element) {
      
      if (!('autofocus' in document.createElement('input'))) {
        
        $(element).focus();
        
      }
      
    }
    
    /**
     * Scroll To Top
     *
     * @example
     * scrollToTop('.scroll-top');
     * @author Fedor Kudinov <brothersrabbits@mail.ru>
     * @param {string} scroll_id - selected item to perform the a clicked
     * @param {(number|string)} [scroll_duration='slow'] - determining how long the animation will run
     */
    function scrollToTop (scroll_id, scroll_duration) {
      
      var el = $(scroll_id), duration = scroll_duration || 'slow';
      
      $(document).on('click touchend', scroll_id, function () {
        
        $('html, body').animate({scrollTop: 0}, duration);
        
        return false;
        
      });
      
      $(window).on('scroll', function () {
        
        var scrollPosition = $(this).scrollTop();
        
        if (scrollPosition > 200) {
          
          if (!el.hasClass('is-visible')) {
            
            el.addClass('is-visible');
            
          }
          
        } else {
          
          el.removeClass('is-visible');
          
        }
        
      });
      
    }
    
    /**
     * Smooth scrolling to element
     *
     * @example
     * scrollToElement('.js-scroll-down', '.stories');
     * @author Fedor Kudinov <brothersrabbits@mail.ru>
     * @param {(string|Object)} element - selected item to perform the a clicked
     * @param {(string|Object)} target - selected element to scrolling
     * @param {(number|string)} [scroll_duration=1000] - determining how long the animation will run
     */
    function scrollToElement (element, target, scroll_duration) {
      
      var el = $(element), duration = scroll_duration || 1000;
      
      el.on('click', function () {
        
        $('html, body').animate({scrollTop: $(target).offset().top}, duration);
        
        return false;
        
      });
      
    }
    
    /**
     * Smooth scrolling to anchor links
     *
     * @example
     * scrollToAnchorLinks('body');
     * @author Fedor Kudinov <brothersrabbits@mail.ru>
     * @param {(string|Object)} id - selected item to perform the a clicked
     * @param {(number|string)} [scroll_duration=1000] - determining how long the animation will run
     */
    function scrollToAnchorLinks (id, scroll_duration) {
      
      var el = $(id), duration = scroll_duration || 1000;
      
      el.on('click', 'a[href*="#"]:not([href="#"])', function () {
        
        var el = $(this).attr('href');
        
        $('html, body').animate({scrollTop: $(el).offset().top}, duration);
        
        return false;
        
      });
      
    }
    
    /**
     * Preloader
     *
     * @example
     * var preloader = new Preloader();
     * @this {Preloader}
     * @author Fedor Kudinov <brothersrabbits@mail.ru>
     * @param {(number|string)} [delay=350] - delay before function fade(In|Out) is start
     * @param {(string|number)} [duration='slow'] - determining how long the fadeOut will run
     * @returns {Preloader} - return constructor with new
     * @constructor
     */
    function Preloader (delay, duration) {
      
      if (!(this instanceof Preloader)) {
        
        return new Preloader(delay, duration);
        
      }
      
      /**
       * @type {string}
       */
      this.element = '.preloader';
      /**
       * @type {(number|string)}
       */
      this.delay = delay || 350;
      /**
       * @type {(string|number)}
       */
      this.duration = duration || 'slow';
      
      if (!$(this.element).length) {
        
        $('body').append('<span class="preloader"></span>');
        
      }
      
    }
    
    /**
     * Method hide
     *
     * @example
     * preloader.hide();
     * @this {Preloader}
     * @returns {Preloader} - return this of constructor Preloader
     */
    Preloader.prototype.hide = function () {
      
      $(this.element).delay(this.delay).fadeOut(this.duration);
      
      return this;
      
    };
    
    /**
     * Method show
     *
     * @example
     * preloader.show();
     * @this {Preloader}
     * @returns {Preloader} - return this of constructor Preloader
     */
    Preloader.prototype.show = function () {
      
      $(this.element).delay(this.delay).fadeIn(this.duration);
      
      return this;
      
    };
    
    /**
     * Number
     *
     * @example
     * fk_number('.fk-number', '.fk-number-field', '.fk-number-spin-plus', '.fk-number-spin-minus');
     * @author Fedor Kudinov <brothersrabbits@mail.ru>
     * @param {(string|Object)} id - container of element
     * @param {(string|Object)} field - field with number
     * @param {(string|Object)} plus - button plus
     * @param {(string|Object)} minus - button minus
     */
    function fk_number (id, field, plus, minus) {
      
      $(id).each(function () {
        
        var el = $(this), fk_field = el.find(field),
          fk_plus = el.find(plus), fk_minus = el.find(minus);
        
        fk_plus.on('click', function () {
          
          var field_value = parseInt(fk_field.text());
          
          if (field_value >= 1) {
            
            field_value++;
            
            fk_field.text(field_value);
            
          }
          
        });
        
        fk_minus.on('click', function () {
          
          var field_value = parseInt(fk_field.text());
          
          if (field_value > 1) {
            
            field_value--;
            
            fk_field.text(field_value);
            
          }
          
        });
        
      });
      
    }
    
    /**
     * Tabs
     *
     * @example
     * tabs('.fk-tabs', '.fk-tabs-list', '.fk-tab-item');
     * @author Fedor Kudinov <brothersrabbits@mail.ru>
     * @param {(string|Object)} tabs_container - main container for tabs
     * @param {(string|Object)} tabs_list - ul list for each tab item
     * @param {(string|Object)} tabs_item - tab block for each li item
     */
    function tabs (tabs_container, tabs_list, tabs_item) {
      
      var parent = $(tabs_container), list = $(tabs_list), child = $(tabs_item);
      
      list.on('click', 'li:not(.active)', function () {
        
        $(this)
          .addClass('active').siblings().removeClass('active')
          .closest(parent).find(child).removeClass('active').eq($(this).index()).addClass('active');
      });
      
    }
    
    /**
     * Accordion
     *
     * @example
     * fk_accordion('.fk-accordion', '.fk-accordion-switch', 'js-opened');
     * @author Fedor Kudinov <brothersrabbits@mail.ru>
     * @param {(string|Object)} accordion_container - container for each accordion item
     * @param {(string|Object)} accordion_switch - element for open and close accordion
     * @param {string} [accordion_class_open='js-opened'] - class when accordion is opened
     */
    function fk_accordion (accordion_container, accordion_switch, accordion_class_open) {
      
      var fk_accordion = $(accordion_container), fk_switch = $(accordion_switch),
        fk_opened = accordion_class_open || 'js-opened';
      
      fk_switch.on('click', function () {
        
        var el_parent = $(this).closest(fk_accordion);
        
        if (el_parent.hasClass(fk_opened)) {
          
          el_parent.removeClass(fk_opened);
          
        } else {
          
          el_parent.addClass(fk_opened).siblings().removeClass(fk_opened);
          
        }
        
      });
    }
    
    var Vx = 0, Vy = 0, rotateX = 46, rotateY = -36;
    
    function cubeInertiaPhysics () {
      var cube = $('.js-cube');
      var timer = setInterval(function () {
        rotateX = rotateX + Vx;
        rotateY = rotateY - Vy;
        cube.css({
          'transform': 'rotateX(' + rotateY + 'deg) rotateY(' + rotateX + 'deg)',
          'transition-duration': '.0s'
        });
        Vx *= 0.99;
        Vy *= 0.99;
      }, 5);
      
      var scene = $('.scene-wrapper');
      
      var x = 0, y = 0, time = Date.now(), deltaS = 1;
      
      //touchend touchmove
      scene.on('mouseover', function (e) {
        x = e.offsetX;
        y = e.offsetY;
        time = Date.now();
      });
      
      scene.on('mouseout', function (e) {
      });
      
      scene.on('mousemove', function (e) {
        var currentX = e.offsetX;
        var currentY = e.offsetY;
        var currentTime = Date.now();
        
        var path = calcPath(x, currentX, y, currentY);
        
        if (path > deltaS) {
          calcSpeed(x, currentX, y, currentY, time, currentTime);
          
          x = e.offsetX;
          y = e.offsetY;
          time = Date.now();
          
        }
        
      });
      
      function calcPath (x0, x1, y0, y1) {
        return Math.sqrt((x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0));
      }
      
      function calcSpeed (x0, x1, y0, y1, t0, t1) {
        Vx = (x1 - x0) / (t1 - t0);
        Vy = (y1 - y0) / (t1 - t0);
      }
      
    }
    
    function gyroscopeInit () {
      if (window.DeviceMotionEvent) {
        var beta, gamma;
        window.addEventListener('deviceorientation', function (event) {
          beta = event.beta; // X axis
          gamma = event.gamma; // Y axis
          setTimeout(function () {
            gyroscopeCube(beta, gamma);
          }, 30);
        });
      }
    }
    
    function gyroscopeCube (_beta, _gamma) {
      var cube = $('.js-cube'), cubeRotateX = 0, cubeRotateY = 0;
      var beta = Math.round(_beta); // X axis
      var gamma = Math.round(_gamma); // Y axis
      
      cubeRotateX += -36 + Math.round((beta - cubeRotateX));
      cubeRotateY += 46 + Math.round((gamma - cubeRotateY));
      
      //$('.gyroscope-info').html("beta: " + beta + "<br> gamma: " + gamma + "<br> rotateX(" + cubeRotateX + "deg)<br> rotateY(" + cubeRotateY + "deg)");
      
      cube.css('transform', 'rotateX(' + cubeRotateX + 'deg) rotateY(' + cubeRotateY + 'deg)');
    }
    
  })(jQuery, window.Modernizr);
  
  function initAdoriasoftGMap (point, content) {
    var AdoriasoftGMapDefault = {
      point: [50.022075, 36.227082],
      content: 'Ukraine, Kharkiv \nNovgorodska Street, \n11, office 411, 61166',
    };
    
    point = (point && point.length === 2) ? point : AdoriasoftGMapDefault.point;
    content = content || AdoriasoftGMapDefault.content;
    
    var adoriasoft_gmap = document.getElementById('adoriasoft-gmap');
    
    var coordinates = new google.maps.LatLng(point[0], point[1]);
    
    var map = new google.maps.Map(adoriasoft_gmap, {
      zoom: 15,
      center: coordinates,
      backgroundColor: '#e9e5dc'
    });
    
    var contentString = '<div class="info-window-content">' + content + '</div>';
    
    var infoWindow = new google.maps.InfoWindow({content: contentString, maxWidth: 300});
    
    var marker = new google.maps.Marker({
      position: coordinates,
      map: map,
      title: 'Adoriasoft',
      icon: {
        //url: '/wp-content/themes/adoriasoft/assets/img/marker.png',
        url: window.adoriasoft_gmap_marker,
        scaledSize: new google.maps.Size(14, 14)
      }
    });
    
    marker.addListener('click', function () {
      infoWindow.open(map, marker);
    });
    
    infoWindow.open(map, marker);
}

document.querySelectorAll('.country-iso').forEach(e=>{
    e.classList.add('hidden')
});
  
document.querySelectorAll("path").forEach(elm=>{
    elm.addEventListener('mouseover',function(){
        document.querySelectorAll('.country-iso').forEach(e=>{
            e.classList.add('hidden')
        });
        [...document.querySelectorAll('.country-iso')].filter(e=>e.getAttribute('data-iso').toLocaleUpperCase()==elm.id).forEach(e=>{
            e.classList.remove('hidden')
        })
    });
})