!(function($) {
    // regular js
    function formatDate(myDate) {
        var monthList = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var myDay = "<span class='rss-item-pubDate-date'>" + myDate.getUTCDate() + "</span> ";
        var myMonth = "<span class='rss-item-pubDate-month'>" + monthList[myDate.getUTCMonth()] + "</span> ";
        var myYear = "<span class='rss-item-pubDate-full-year'>" + myDate.getUTCFullYear() + "</span> ";
        return myDay + "<br>" + myMonth;
    }
    // jquery
    $(function() {
        // bootstrap classes
        $("#dynamic-container, #content-container, #job-dynamic-container").wrap("<div class='container-fluid'></div>").addClass("row");
        $("#content-container.newDash").removeClass("container");
        if ($.trim($("#dynamic-side-left-container, #side-left").text()).length) {
            $("#dynamic-side-left-container, #side-left").addClass("col-md-3 hidden-sm hidden-xs pull-right");
            $("#dynamic-content, #content-container #content").addClass("col-md-9 col-sm-12 col-xs-12 pull-left");
            $("#job-dynamic-container #content").addClass("col-xs-12");
        } else {
            $("#dynamic-side-left-container, #side-left").hide();
            $("#dynamic-content, #content").addClass("col-xs-12");
        }
        $("#side-right, #dynamic-side-right-container, #job-side-column").hide();
        // make new job board design.
        $(".job-holder").each(function() {
            $(this).addClass('clearfix');
            $(this).find('.job-rightlinks > a').wrap("<span class='button'></span>");
            $(this).find('.job-rightlinks').append($(this).find('.locandsalary'));
            $(this).find('.job-toplink').append($(this).find('.job-breadcrumbs'));
            $(this).find('.job-toplink').append($(this).find('.description-holder'));
            $(this).find('.locandsalary').prepend($(this).find('.dateText'));
            $('<div class="readmore-job"></div>').appendTo($(this).find('.job-toplink')).append($(this).find('.job-toplink > a').clone().text('READ MORE'))
            $(this).find('.job-rightlinks').append($(this).find('.description-logo'));
            $(this).find('.locandsalary span:empty').remove();
            $(this).find('.dateText').prepend('<i class="fa fa-calendar"></i>');
            $(this).find('.jxt-result-loc').prepend('<i class="fa fa-map-marker"></i>');
            $(this).find('.jxt-result-worktype').prepend('<i class="fa fa-clock-o"></i>');
        });
        // move inner page title
        $("#inner-banner-title .col-xs-12").append($("#dynamic-content h1:first, #content-container #content h1:first"));
        // move breadcrumbs to be outside of containers
        $("#header").append($(".breadcrumbs, .num-results, .job-detailtop-title, .dynamic-breadcrumb"));
        // make breadcrumbs aligned with #content
        $(".breadcrumbs, .num-results, .dynamic-breadcrumb").wrapInner("<div class='col-md-8 col-sm-12 col-xs-12 pull-right'></div>"); // this class needs to be the same as #content but with pull-right
        $(".job-detailtop-title").wrapInner("<div class='col-xs-12'></div>");
        $(".breadcrumbs, .num-results, .job-detailtop-title, .dynamic-breadcrumb").wrapInner("<div class='row'></div>");
        $(".breadcrumbs, .num-results, .job-detailtop-title, .dynamic-breadcrumb").wrapInner("<div class='container-fluid'></div>");
        // put back to results button above apply now.
        $(".job-detail-centre .jobdetail-padding").prepend($(".jobdetail-top"));
        // show page
        $("#wrapper").show();
        // skip link
        $("#skip-link").attr("href", "#" + $("#dynamic-content, #content").attr("id"));
        // remove empty li's and ul's on the system pages.
        $(".links-2 li:empty").remove();
        $(".links-2 ul:empty").remove();
        // add active class to links.
        $("li a[href='" + window.location.pathname.toLowerCase() + "']").parent().addClass("active");
        $("li.active li.active").parent().closest("li.active").removeClass("active");
        // add nbsp;
        $("#side-drop-menu > li > ul > li > a").each(function() {
            var linkText = $(this).text();
            linkText = linkText.replace(" (", "&nbsp;(");
            $(this).html(linkText);
        });
        // move news rss feed to bottom of news index.
        $(".newsIndex").append($(".newsIndex .search-options"));
        // move date on new page.
        $(".news-individual-container").each(function() {
            $(this).children(".news-excerpt").children("h3").after($(this).children(".news-date"));
        });
        // make read more a button
        $(".news-excerpt p a").wrap("<span class='button'></span>");
        // add news icon
        $(".news .date, .news-excerpt .news-date").prepend("<i class='fa fa-calendar'></i>");
        // generate actions button
        $(".job-navbtns").convertButtons({
            buttonTitle: "Actions&hellip;",
            title: "Please choose&hellip;",
            links: ".job-navbtns a"
        });
        // generate filters button
        $(".job-navbtns").convertFilters({
            buttonTitle: "Filters&hellip;",
            filteredTitle: "Applied Filters",
            title: "Please choose&hellip;",
            filtered: ".search-query p",
            list: "ul#side-drop-menu",
            excludeFromList: "#AdvancedSearchFilter_PnlCompany"
        });
        // copy header social media links to footer and contact page.
        var contactSocialMedia = $(".social-media").clone()
        var footerSocialMedia = $(".social-media").clone()
        $("#contact-us-social-media").prepend(contactSocialMedia);
        $("#footer-social-media").append(footerSocialMedia);
        // mobile menu / site search
        $(".toggle-navigation").click(function(e) {
            e.preventDefault();
            var elementToToggle = $(this).attr("href");
            $(elementToToggle).toggleClass("active");
        });
        // home banner
        $(".slider").cycle({
            slides: "> div",
            pager: ".banner .cycle-pager",
            next: ".banner .cycle-next",
            prev: ".banner .cycle-prev"
        });
        // inner banners
        // write inner banner image if it doesn't already contain an image
        /*      if ( $(".single-banner:visible").length  && !$(".single-banner img").length )
                {
                    var parentIndex;
                    $("#navigation a").each(function(){
                        if ( location.pathname.toLowerCase() == $(this).attr("href") )
                        {
                            parentIndex = $(this).closest("#navigation > ul > li").index();
                        }
                    });
                    var bgImage = "url(/media/xpress-3/images/banners/inner-" + (parentIndex > -1 ? parentIndex : "0") + ".jpg)";
                    $(".single-banner").css( "background-image", bgImage );
                }*/
        /*dynamic testimonial*/
        $(".testimonial").each(function() {
            var dataURL = $(this).attr("data-url");
            $(this).includeFeed({
                baseSettings: {
                    rssURL: [dataURL || "/newsrss.aspx"],
                    limit: 200,
                },
                templates: {
                    itemTemplate: '<div class="testimonial-bg"><div class="testimonial-cont"><p>{{description}}</p></div><div class="textminoal-head"><p>{{title}}</p></div></div>'
                },
            });
        });
        // if 'all team' is clicked (eq(0) then show all.
        $("#meet-team-menu a").click(function() {
            $(".team-member-profile").removeClass("active");
            var myIndex = $(this).parent().index();
            if (0 != myIndex) {
                $("#meet-team-menu li").not($(this).parent()).removeClass("active");
                $(this).parent().addClass("active");
                $(".team-member-page").not($(".team-member-page").eq(myIndex)).removeClass("active");
                $(".team-member-page").eq(myIndex).addClass("active");
            } else {
                $(".team-member-page").addClass("active");
            }
        });
        //job
        $("#myJobsList ul").each(function() {
            var dataURL = $(this).attr("data-url");
            $(this).includeFeed({
                baseSettings: {
                    rssURL: [dataURL || "/job/rss.aspx?search=1&addlocation=1"]
                },
                elements: {
                    pubDate: formatDate,
                    title: 1,
                    description: 1
                },
                complete: function() {
                    $(this).simplyScroll({
                        frameRate: 60
                    });
                }
            });
        });
        // if user logged in, change register links to dashboard.
        if ($(".user-loggedIn").length) {
            $("a[href='/member/register.aspx']").text("My Dashboard");
            $("a[href='/member/register.aspx']").attr("href", "/member/default.aspx");
            $("a[href='/member/login.aspx']").text("Logout");
            $("a[href='/member/login.aspx']").attr("href", "/logout.aspx");
        }
        // onclick on service, show service.
        $(".service a").click(function() {
            var myService = $(this).attr("href");
            if ($(myService).length) {
                $(".service-description").not($(myService)).removeClass("active");
                $(myService).addClass("active");
            }
        });
        $(".service-description a").click(function() {
            $(".service-description").removeClass("active");
        });
        // expandable tab
        $(".tab-heading a").click(function(e) {
            if (!$(this).attr("href")) {
                e.preventDefault();
                $(this).parent().parent().toggleClass("active");
                $(this).parent().parent().next(".tab-content").toggleClass("active");
            }
        });
        //consultant module
        $(".team-member-page").each(function() {
            var dataURL = $(this).attr("data-url");
            $(this).includeFeed({
                baseSettings: {
                    rssURL: [dataURL || "/ConsultantsRSS.aspx"],
                    limit: 200,
                    addNBSP: false,
                    repeatTag: "consultant"
                },
                templates: {
                    itemTemplate: '<div class="col-sm-4 col-xs-12"><div class="team-member"><a href="/t/{{FriendlyURL}}" class="team-img"><img alt="Team Member" src="{{ImageURL}}" /></a><div class="team-member-social"><a href="{{LinkedInURL}}" target="_blank"><span>LinkedIn Profile</span><i class="fa fa-linkedin"><!-- c --></i></a><a href="{{TwitterURL}}" target="_blank"><span>Twitter Profile</span><i class="fa fa-twitter"><!-- c --></i></a></div><h2>{{FirstName}} {{LastName}}<small>{{PositionTitle}}</small></h2><span>{{ShortDescription}}</span><div class="team-member-profile" id="/t/{{FriendlyURL}}"><div class="row"><div class="col-sm-4 col-xs-12 team-member-profile-side"><p class="team-member-profile-photo"><img alt="{{FirstName}} {{LastName}}" src="{{ImageURL}}" /></p><p class="team-member-profile-contact"><a href="mailto:{{Email}}">{{Email}}</a><br /><a href="tel:{{Phone}}">{{Phone}}</a></p><p class="team-member-profile-linkedin"><a href="{{LinkedInURL}}" target="_blank"><span>LinkedIn Profile</span><i class="fa fa-linkedin"><!-- c --></i></a></p><p class="team-member-profile-back"><a><i class="fa fa-chevron-left"><!-- c --></i>See All Team Members</a></p>\</div><div class="col-sm-8 col-xs-12 team-member-profile-description"><h2>{{FirstName}} {{LastName}}<small>{{PositionTitle}}</small></h2><span>{{FullDescription}}</span><hr/><div class="team-member-jobs"><h3>Latest Jobs <small>From {{FirstName}} {{LastName}}</small></h3><div class="rss-holder"><ul data-url="{{JobRSS}}"><!-- c --></ul></div></div></div></div></div></div></div>'
                },
                complete: function() {
                    // Callback
                    if($(this).find(".rss-holder ul").length){
                       var dataURL = $(this).find(".rss-holder ul").attr("data-url");
                        $(this).find(".rss-holder ul").includeFeed({
                            baseSettings: {
                                rssURL: [dataURL || "/job/rss.aspx"]
                            },
                            templates: {
                                itemTemplate: "<li><span class='rss-item' id='rss-item-{{item-index}}'>\n\
                                <span class='rss-item-description'>{{description}}</span>\n\
                                <span class='rss-item-title'><a target='_blank' href='{{link}}'>{{title}}</a></span>\n\
                                <span class='rss-item-category'>{{category}}</span></span></li>"
                            },
                            complete: function() {
                                if ($(this).children().length > 3) {
                                        $(this).simplyScroll({
                                            frameRate: 60
                                        });
                                    // var jcarousel = $(this).parent();
                                    // jcarousel.on('jcarousel:reload jcarousel:create', function() {
                                    //     var carousel = $(this);
                                    //     var width = carousel.innerWidth();
                                    //     if (700 < width) {
                                    //         width = width / 3;
                                    //     } else {
                                    //         width = width;
                                    //     }
                                    //     carousel.jcarousel('items').css('width', Math.ceil(width) + 'px');
                                    // });
                                    // jcarousel.jcarousel({
                                    //     wrap: 'circular'
                                    // });
                                    // jcarousel.jcarouselAutoscroll();
                                    // $('#home-latest-jobs .jcarousel-prev').jcarouselControl({
                                    //     target: '-=1'
                                    // });
                                    // $('#home-latest-jobs .jcarousel-next').jcarouselControl({
                                    //     target: '+=1'
                                    // });
                                }
                            }
                        });
                    }
                    var fullProfElems = $(".team-member .team-member-profile");
                    fullProfElems.each(function(ind, elem) {
                        var parent = $(this).closest(".team-member");
                        var hashTag = parent.find('a.team-img').attr('href').replace("/t/", "");
                        if ($("[data-name-tab='" + hashTag + "']").length < 1) {
                            $(".team-full-detail").append($(elem));
                            $(elem).attr('data-name-tab', hashTag);
                            $(elem).attr('id', hashTag);
                        } else {
                            $(elem).remove();
                        }
                        parent.find('a.team-img').attr('data-href', parent.find('a.team-img').attr('href'));
                        parent.find('a.team-img').attr('href', window.location.href.split("#")[0] + "#" + parent.find('a.team-img').attr('href').split("/")[2])
                    });

                  
                }
            });
        });
        $("body").on('click', '.team-member .team-img', function(event) {
            event.preventDefault();
            var hashTag = $(this).attr('data-href').replace("/t/", "");
            $("[data-name-tab]").hide();
            $("[data-name-tab='" + hashTag + "']").fadeIn();
            window.location.hash = hashTag;
        });
        $("body").on('click', '.team-member-profile-back', function(event) {
            event.preventDefault();
            $("[data-name-tab]").hide();
        });
        $("a[href='" + window.location.pathname.toLowerCase() + "']").parent().addClass("active");
        // if tab is in hash, click it automatically.
        if (location.hash.toLowerCase() && $(location.hash.toLowerCase() + ".tab-heading").length) {
            $(location.hash.toLowerCase()).find("a").click();
        }
        // add iframe url for a map
        function loadMap(iframeObject) {
            // if the iframe has no src or a blank src, and it has a data-src attribute
            if (!(iframeObject.attr("src") && iframeObject.attr("src").length) && iframeObject.attr("data-src")) {
                iframeObject.attr("src", iframeObject.attr("data-src"));
            }
        }
        // scroll to a map
        function scrollToDiv(divID) {
            $("html, body").animate({
                scrollTop: $(divID).offset().top - ($("#header-container").height() || 0) - 20
            }, 300);
        }
        // if a location hash is on the url, add active to the div.
        if (location.hash && $(location.hash + ".map").length) {
            $(location.hash + ".map").addClass("active");
        } else {
            // otherwise, just make the first map active.
            $(".map:first").addClass("active");
        }
        loadMap($(".map.active iframe"));
        // contact page maps on click
        $(".contact-map-link").click(function(e) {
            var myLink = $(this).attr("href")
            var targetMap = $(myLink.substr(myLink.indexOf("#")));
            if (targetMap.length) {
                e.preventDefault();
                loadMap(targetMap.children("iframe"));
                scrollToDiv(targetMap);
                $(".map").not(targetMap).removeClass("active");
                targetMap.addClass("active");
            }
        });
        // contact page stop scrolling until clicked.
        $(".map-overlay").click(function() {
            $(this).hide();
        });
        // home tab boxes
        $("#home-tab-menu a").click(function(e) {
            e.preventDefault();
            $("#home-tab-menu a").not($(this)).parent("li").removeClass("active");
            $(this).parent("li").addClass("active");
            var myIndex = $(this).parent().index();
            var myTab = $(".home-tab").eq(myIndex);
            $(".home-tab").not(myTab).removeClass("active");
            myTab.addClass("active");
        });
        // duplicate link for heading on team page
        $(".team-member").each(function() {
            var myLink = $(this).find("a:first").attr("href");
            $(this).find("h2").wrapInner("<a href='" + myLink + "'></a>")
        });
        //job rss
        // $(".rss-holder ul").includeFeed({
        //     baseSettings: {
        //         rssURL: "/job/rss.aspx"
        //     },
        //     templates: {
        //         itemTemplate: "<li><div class='rss-item' id='rss-item-{{item-index}}'><span class='rss-item-description'>{{description}}</span><span class='rss-item-title'><a target='_blank' href='{{link}}'>{{title}}</a></span><span class='rss-item-category'>{{category}}</span></div></li>"
        //     },
        //     complete: function() {
        //         $(this).jcarousel({
        //             auto: 5,
        //             scroll: 3,
        //             wrap: "circular",
        //         });
        //     }
        // });
        // load latest jobs for team member
        function loadTeamMemberJobs(jobsUL, rssURL) {
            $(jobsUL).each(function() {
                $(this).includeFeed({
                    baseSettings: {
                        rssURL: [rssURL],
                        addNBSP: false
                    },
                    templates: {
                        itemTemplate: "<li><div class='rss-item' id='rss-item-{{item-index}}'><span class='rss-item-description'>{{description}}</span><span class='rss-item-title'><a target='_blank' href='{{link}}'>{{title}}</a></span><span class='rss-item-category'>{{category}}</span></div></li>"
                    },
                    complete: function() {
                        $(this).children().each(function() {
                            var thisExtraField = $(this).find(".xmlLocation");
                            if (thisExtraField.length) {
                                $(this).find(".rss-item-description").after(thisExtraField);
                            }
                        });
                        // jcarousel
                        if ($(this).children().length > 3) {
                            var jcarousel = $(this).parent();
                            jcarousel.on('jcarousel:reload jcarousel:create', function() {
                                var carousel = $(this);
                                var width = carousel.innerWidth();
                                if (700 < width) {
                                    width = width / 3;
                                } else {
                                    width = width;
                                }
                                carousel.jcarousel('items').css('width', Math.ceil(width) + 'px');
                            });
                            jcarousel.jcarousel({
                                wrap: 'circular'
                            });
                            jcarousel.jcarouselAutoscroll();
                            $('#home-latest-jobs .jcarousel-prev').jcarouselControl({
                                target: '-=1'
                            });
                            $('#home-latest-jobs .jcarousel-next').jcarouselControl({
                                target: '+=1'
                            });
                        }
                    }
                });
            });
        }
        // scroll to div if it's in the URL.
        if (location.hash.toLowerCase() && $(location.hash.toLowerCase()).length) {
            scrollToDiv(location.hash.toLowerCase());
        }
        // in case top navigation redirects to a hash.
        $("a[href^=#]").click(function(e) {
            var myLink = $(this).attr("href") || "";
            if ($(myLink).length) {
                e.preventDefault();
                scrollToDiv($(myLink));
            }
        });
    });

    function equalhight() {
        // var $height = 0;
        // $(".team-member").each(function() {
        //     $(this).css("height", "auto");
        //     if (($(this).height()) > $height) {
        //         $height = $(this).outerHeight();
        //     }
        // });
        // $(".team-member").each(function() {
        //     $(this).css("height", $height);
        // });
    }
    $(document).ready(function() {
        var pageTitle = window.location.pathname.replace("/", "");
        if (pageTitle != "") {
            $("body").addClass(pageTitle);
        }
        $(window).on('hashchange', function(e) {
            if (window.location.hash) {
                var target_ = window.location.href;
                console.log($("a[href='" + target_ + "']"));
                $("a[href='" + target_ + "']").trigger("click")
            }
        });

        
        /*$("body").on('click', '#navigation > ul > li > ul > li > a', function(event) {
            event.preventDefault();
            $(this.hash).trigger('click');
            alert(this.hash);
        });*/
    });
    $(window).resize(function() {
        equalhight();
    });
    $(window).load(function() {
        equalhight();
    });
    $(window).load(function() {
        if (window.location.hash) {
            var target_ = window.location.href;
            console.log($("a[href='" + target_ + "']"));
            $("a[href='" + target_ + "']").trigger("click")
        }
    })
})(jQuery);