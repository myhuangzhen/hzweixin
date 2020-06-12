"use strict";
function resize() {
    var t = document.documentElement.clientWidth,
    e = document.documentElement.clientHeight,
    n = 1920 / 1080,
    s = t / e,
    i = 1,
    a = 0,
    c = 0;
    s < n ? (i = t / 1920, c = t, a = t / n) : (i = e / 1080, a = e, c = n * e)
    // $("body").css("height", a + "px"),
    // $("body").css("width", c + "px")
    // $(".main-container").attr("data-scale", i),
    // $(".main-container").css("transform", "scale(" + i + ")"),
    // $(".main-container").css("-webkit-transform", "scale(" + i + ")"),
    // $(".main-container").css("-moz-transform", "scale(" + i + ")"),
    // $(".main-container").css("-ms-transform", "scale(" + i + ")"),
    // $(".main-container").css("-o-transform", "scale(" + i + ")")
}
function formatterTime(t) {
    var e = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"),
    n = new Date,
    s = n.getFullYear(),
    i = n.getMonth() + 1,
    a = n.getDay(),
    c = n.getDate(),
    o = n.getHours(),
    l = n.getMinutes(),
    r = n.getSeconds();
    r = r < 10 ? "0" + r: r;
    var m = s + "年" + i + "月" + c + "日&nbsp;&nbsp" + e[a] + "&nbsp;&nbsp" + o + ":" + l + ":" + r;
    $(t).html(m)
}
$(function() {
    resize(),
    window.onresize = function() {
        resize()
    },
    $(".select").length && ($(".select").on("click",
    function(t) {
        t.stopPropagation(),
        $(this).find(".select-menu").slideDown(300);
        var e = $(this).parents(".form-group");
        e.siblings(".form-group").css("z-index", 1),
        e.length && e.css("z-index", 10)
    }), $("body").on("click",
    function() {
        $(".select").find(".select-menu").slideUp(300),
        window.setTimeout(function() {
            var t = $(".select").parents(".form-group");
            t.length && t.css("z-index", 1)
        },
        300)
    }), $(".select-menu").on("click", "li",
    function(t) {
        t.stopPropagation();
        var e = $(this).parent(),
        n = e.attr("data-type");
        if ("static" != n) {
            $(this).addClass("active").siblings("li").removeClass("active");
            var s = $(this).html();
            $(this).parent().siblings("input").val(s),
            $(this).parent().slideUp(300)
        }
    })),
    $(".left-menu").length && $(".left-menu").on("click", "li",
    function() {
        $(this).addClass("active").siblings("li").removeClass("active")
    }),
    $(".modal").on("click", "[data-closeModal=true]",
    function() {
        $(this).parents(".modal").hide()
    }),
    $(".tab-list").length && $(".tab-list").on("click", "li",
    function() {
        var t = $(this).attr("tab-href");
        $(this).addClass("active").siblings("li").removeClass("active");
        var e = $(this).parents(".tab-list").attr("tab-name");
        t && ($(".tab-container[tab-name=" + e + "]").hide(), $(".tab-container[tab-panel=" + t + "]").show())
    })
});