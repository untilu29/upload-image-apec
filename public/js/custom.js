$(function() {
    "use strict";
    $(function() {
        $(".preloader").fadeOut();
    });

    if (typeof header !== 'undefined')
    $.ajaxSetup({
        beforeSend: function (xhr)
        {
            xhr.setRequestHeader(header,token);
        }
    });

    jQuery(document).on('click', '.mega-dropdown', function(e) {
        e.stopPropagation()
    });
    // ==============================================================
    // This is for the top header part and sidebar part
    // ==============================================================
    var set = function() {
        var width = (window.innerWidth > 0) ? window.innerWidth : this.screen.width;
        var topOffset = 70;
        if (width < 768) {
            $("body").addClass("mini-sidebar");
            $('.navbar-brand span').hide();
            $(".scroll-sidebar, .slimScrollDiv").css("overflow-x", "visible").parent().css("overflow", "visible");
            $(".sidebartoggler i").addClass("ti-menu");
            $('.navbar-header').hide();
            $('ul.navbar-nav.mr-auto.mt-md-0').css("margin-left","20px");

        } else {
            $("body").removeClass("mini-sidebar");
            $('.navbar-brand span').show();
            $(".sidebartoggler i").removeClass("ti-menu");
            $('.navbar-header').show();
            $('ul.navbar-nav.mr-auto.mt-md-0').css("margin-left","0");
        }

        var height = ((window.innerHeight > 0) ? window.innerHeight : this.screen.height) - 1;
        height = height - topOffset;
        if (height < 1) height = 1;
        if (height > topOffset) {
            $(".page-wrapper").css("min-height", (height) + "px");
        }

    };
    $(window).ready(set);
    $(window).on("resize", set);

    // topbar stickey on scroll

    $(".fix-header .topbar").stick_in_parent({

    });

    // this is for close icon when navigation open in mobile view
    $(".nav-toggler").click(function() {
        $("body").toggleClass("show-sidebar");
        $(".nav-toggler i").toggleClass("ti-menu");
        $(".nav-toggler i").addClass("ti-close");
    });
    $(".sidebartoggler").on('click', function() {
        $(".sidebartoggler i").toggleClass("ti-menu");
    });

    // ==============================================================
    // Auto select left navbar
    // ==============================================================
    $(function() {
        var url = window.location;
        var element = $('ul#sidebarnav a').filter(function() {
            return this.href == url;
        }).addClass('active').parent().addClass('active');
        while (true) {
            if (element.is('li')) {
                element = element.parent().addClass('in').parent().addClass('active');
            } else {
                break;
            }
        }
    });

    // ==============================================================
    // Sidebarmenu
    // ==============================================================
    $(function() {
        $('#sidebarnav').metisMenu();
    });
    // ==============================================================
    // Slimscrollbars
    // ==============================================================
    $('.scroll-sidebar').slimScroll({
        position: 'left',
        size: "5px",
        height: '100%',
        color: '#dcdcdc'
    });

    // ==============================================================
    // Resize all elements
    // ==============================================================
    $("body").trigger("resize");
});


const fetchBlob = function(uri, params, callback){
    $(".preloader").show();
    var xhr = new XMLHttpRequest();
    xhr.open('GET', uri+'?'+params, true);
    xhr.responseType = "blob";
    xhr.setRequestHeader(header,token);
    xhr.onload = function(e) {
        if (this.status == 200) {
            var blob = this.response;
            if (callback) {
                callback(blob);
                $(".preloader").fadeOut();
            }
        }
        else {
            $(".preloader").fadeOut();
            toastr.error('Có lỗi xảy ra!');
        }
    };
    xhr.send();
};

// Collapse Custom
$(document).ready(function(){
    $.ajax({
        url: '/api/supporter/events',
        dataType: 'json',
        success: function (data) {
            var html='';
            $.each(data,function (idx,el) {
                html+='<li><a href="/supporter/'+el.id+'?type=1" class="waves-effect">'+
                    '<i class="fa fa-table m-r-10" aria-hidden="true"></i> Sự kiện '+el.name+'</a></li>';
                $('#eventsSupporter').html(html);
                console.log("Fetch data thanh cong")
            });
        }
        });

    if (localStorage.getItem("collapse")==1||localStorage.getItem("collapse")==null){
        $('#filter').addClass("show")
    }
    else  $('#filter').removeClass("show")

    $("#filter").on("hide.bs.collapse", function(){
        localStorage.setItem("collapse",0);
        $(".collapse_btn").html('<span class="fa fa-chevron-down"></span> Đóng/Mở');
    });
    $("#filter").on("show.bs.collapse", function(){
        localStorage.setItem("collapse",1);
        $(".collapse_btn").html('<span class="fa fa-chevron-up"></span> Đóng/Mở');
    });
});