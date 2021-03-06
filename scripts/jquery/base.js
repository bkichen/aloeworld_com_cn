/* 
*作者：一些事情
*时间：2012-6-28
*需要结合jquery和jquery.form和liger ui一起使用
----------------------------------------------------------*/
/*返回顶部*/
var lastScrollY = 0;
$(function () {
    $("body").prepend("<a id=\"gotop\" class=\"gotop\" href=\"#\" title=\"返回顶部\" onfocus=\"this.blur()\" onclick=\"window.scrollTo(0,0);\"></a>");
    window.setInterval("gotop()", 1);
});
function gotop() {
    var diffY;
    if (document.documentElement && document.documentElement.scrollTop)
        diffY = document.documentElement.scrollTop;
    else if (document.body)
        diffY = document.body.scrollTop
    else
    { /*Netscape stuff*/ }
    percent = .1 * (diffY - lastScrollY);
    if (percent > 0) percent = Math.ceil(percent);
    else percent = Math.floor(percent);
    lastScrollY = lastScrollY + percent;
    if (lastScrollY < 100) {
        document.getElementById("gotop").style.display = "none";
    } else {
        document.getElementById("gotop").style.display = "block";
    }
}
/*搜索查询*/
function SiteSearch(send_url, divTgs) {
    var str = $.trim($(divTgs).val());
    if (str.length > 0 && str != "输入关健字") {
        window.location.href = send_url + "?keyword=" + encodeURI($(divTgs).val());
    }
    return false;
}
/*搜索查询*/
function SiteSearch2(send_url, keywords1, keywords2) {
    //var str = $.trim($(divTgs).val());
    window.location.href = send_url + "?keyword=" + encodeURI($(keywords1).val()) + "&keyword2=" + encodeURI($(keywords2).val());

    return false;
}
/*搜索查询*/
function SiteSearch3(send_url, divTgs) {
    var str = $.trim($(divTgs).val());
    if (str.length > 0 && str != "输入关健字") {
        window.location.href = send_url + "?keyword=" + encodeURI($(divTgs).val());
    }
    return false;
}

/*切换验证码*/
function ToggleCode(obj, codeurl) {
    $(obj).children("img").eq(0).attr("src", codeurl + "?time=" + Math.random());
    return false;
}
/*切换验证码*/
function ToggleCode2(obj, codeurl) {
    $("#code_img").attr("src", codeurl + "?time=" + Math.random());
    return false;
}
//复制文本
function copyText(txt) {
    window.clipboardData.setData("Text", txt);
    $.ligerDialog.success("复制成功，现在您可以通过粘贴来发送啦！");
}
//全选取消按钮函数，调用样式如：
function checkAll(chkobj) {
    if ($(chkobj).text() == "全选") {
        $(chkobj).text("取消");
        $(".checkall").attr("checked", true);
    } else {
        $(chkobj).text("全选");
        $(".checkall").attr("checked", false);
    }
}
//积分兑换
function NumConvert(obj) {
    var maxAmount = parseFloat($("#hideAmount").val()); //总金额
    var pointCashrate = parseFloat($("#hideCashrate").val()); //兑换比例
    var currAmount = parseFloat($(obj).val()); //需要转换的金额
    if (currAmount > maxAmount) {
        currAmount = maxAmount;
        $(obj).val(maxAmount);
    }
    var convertPoint = currAmount * pointCashrate;
    $("#convertPoint").text(convertPoint);
}
/*PROPS选择卡特效*/
function ToggleProps(obj, cssname) {
    $(obj).parent().children("li").removeClass(cssname);
    $(obj).addClass(cssname);
}
//Tab控制选项卡
function tabs(tabId, event) {
    //绑定事件
    var tabItem = $(tabId + " #tab_head ul li a");
    tabItem.bind(event, function () {
        //设置点击后的切换样式
        tabItem.removeClass("current");
        $(this).addClass("current");
        //设置点击后的切换内容
        var tabNum = tabItem.parent().index($(this).parent());
        $(tabId + " .tab_inner").hide();
        $(tabId + " .tab_inner").eq(tabNum).show();
    });
}
//显示浮动窗口
function showWindow(objId) {
    var box = '<div>' + $('#' + objId).html() + '</div>';
    var tit = $('#' + objId).attr("title");
    var m = $.ligerDialog.open({
        type: "",
        title: tit,
        content: $(box),
        width: 480,
        buttons: [
		{ text: '确认', onclick: function () {
		    m.close();
		}
		}],
        isResize: true
    });
}

//执行删除操作
function ExecDelete(sendUrl, checkValue, urlId) {
    var urlObj = $('#' + urlId);
    //检查传输的值
    if (!checkValue) {
        $.ligerDialog.warn("对不起，请选中您要操作的记录！");
        return false;
    }
    $.ligerDialog.confirm("删除记录后不可恢复，您确定吗？", "提示信息", function (result) {
        if (result) {
            $.ajax({
                type: "POST",
                url: sendUrl,
                dataType: "json",
                data: {
                    checkId: function () {
                        return checkValue;
                    }
                },
                timeout: 20000,
                success: function (data, textStatus) {
                    if (data.msg == 1) {
                        $.ligerDialog.success(data.msgbox, function () {
                            if (urlObj) {
                                location.href = urlObj.val();
                            } else {
                                location.reload();
                            }
                        });
                    } else {
                        $.ligerDialog.warn(data.msgbox);
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    $.ligerDialog.error("状态：" + textStatus + "；出错提示：" + errorThrown);
                }
            });
        }
    });
}

//单击执行AJAX请求操作
function clickSubmit(sendUrl) {
    $.ajax({
        type: "POST",
        url: sendUrl,
        dataType: "json",
        timeout: 20000,
        success: function (data, textStatus) {
            if (data.msg == 1) {
                $.ligerDialog.success(data.msgbox, function () {
                    location.reload();
                });
            } else {
                $.ligerDialog.warn(data.msgbox);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $.ligerDialog.error("状态：" + textStatus + "；出错提示：" + errorThrown);
        }
    });
}

//链接下载
function downLink(point, linkurl) {
    if (point > 0) {
        $.ligerDialog.confirm("下载需扣除" + point + "个积分，有效时间内重复下载不扣积分，继续吗？", "提示信息", function (result) {
            if (result) {
                window.location.href = linkurl;
            }
        });
    } else {
        window.location.href = linkurl;
    }
    return false;
}

//智能浮动层函数
$.fn.smartFloat = function () {
    var position = function (element) {
        var top = element.position().top, pos = element.css("position");
        var w = element.innerWidth();
        $(window).scroll(function () {
            var scrolls = $(this).scrollTop();
            if (scrolls > top) {
                if (window.XMLHttpRequest) {
                    element.css({
                        width: w,
                        position: "fixed",
                        top: 0
                    });
                } else {
                    element.css({
                        top: scrolls
                    });
                }
            } else {
                element.css({
                    position: pos,
                    top: top
                });
            }
        });
    };
    return $(this).each(function () {
        position($(this));
    });
};

//=====================发送验证邮件=====================
function SendEmail(username, sendurl) {
    if (username == "") {
        $.ligerDialog.warn('对不起，用户名不允许为空！');
        return false;
    }
    //提交
    $.ajax({
        url: sendurl,
        type: "POST",
        timeout: 60000,
        data: {
            username: function () {
                return username;
            }
        },
        dataType: "json",
        success: function (data, type) {
            if (data.msg == 1) {
                $.ligerDialog.success(data.msgbox);
            } else {
                $.ligerDialog.warn(data.msgbox);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $.ligerDialog.error("状态：" + textStatus + "；出错提示：" + errorThrown);
        }
    });
}

/*表单AJAX提交封装(包含验证)*/
function AjaxInitForm(formId, btnId, isDialog, urlId) {
 
    var formObj = $('#' + formId);
    var btnObj = $("#" + btnId);
    var urlObj = $("#" + urlId);
    formObj.validate({
        //errorElement: "span",
        success: function (label) {
            //label.text(" ").addClass("success");
        },
        submitHandler: function (form) {
            //AJAX提交表单
            $(form).ajaxSubmit({
                beforeSubmit: formRequest,
                success: formResponse,
                error: formError,
                url: formObj.attr("url"),
                type: "post",
                dataType: "json",
                timeout: 60000
            });
            return false;
        }
    });

    //表单提交前
    function formRequest(formData, jqForm, options) {
        btnObj.attr("disabled", "disabled");
        btnObj.val("提交中...");
    }

    //表单提交后
    function formResponse(data, textStatus) {
        if (data.msg == 1) {
            btnObj.val("提交成功");
            btnObj.removeAttr("disabled");
            //是否提示，默认不提示
            //if (isDialog == 1) {
            $.ligerDialog.success(data.msgbox, function () {
                if (data.url) {

                    location.href = data.url;
                } else if (urlObj.length > 0 && urlObj.val() != "") {
                    location.href = urlObj.val();
                } else {
                    location.reload();
                }
            });
            //            } else {
            //                if (data.url) {
            //                    location.href = data.url;
            //                } else if (urlObj.val()) {
            //                    location.href = urlObj.val();
            //                } else {
            //                    location.reload();
            //                }
            //            }
        } else {
            $.ligerDialog.warn(data.msgbox);
            btnObj.removeAttr("disabled");
            btnObj.val("再次提交");
        }
    }
    //表单提交出错
    function formError(XMLHttpRequest, textStatus, errorThrown) {
        $.ligerDialog.error("状态：" + textStatus + "；出错提示：" + errorThrown);
        btnObj.removeAttr("disabled");
        btnObj.val("再次提交");
    }
}

/*显示AJAX分页列表*/
function AjaxPageList(listDiv, pageDiv, pageSize, pageCount, sendUrl, defaultAvatar) {
    //pageIndex -页面索引初始值
    //pageSize -每页显示条数初始化
    //pageCount -取得总页数
    InitComment(0); //初始化评论数据
    $(pageDiv).pagination(pageCount, {
        callback: pageselectCallback,
        prev_text: "« 上一页",
        next_text: "下一页 »",
        items_per_page: pageSize,
        num_display_entries: 3,
        current_page: 0,
        num_edge_entries: 5,
        link_to: "javascript:;"
    });

    //分页点击事件
    function pageselectCallback(page_id, jq) {
        InitComment(page_id);
    }
    //请求评论数据
    function InitComment(page_id) {
        page_id++;
        $.ajax({
            type: "POST",
            dataType: "json",
            url: sendUrl + "&page_size=" + pageSize + "&page_index=" + page_id,
            beforeSend: function (XMLHttpRequest) {
                $(listDiv).html('<p style="line-height:35px;">正在很努力加载，请稍候...</p>');
            },
            success: function (data) {
                //$(listDiv).html(data);
                var strHtml = '';
                for (var i in data) {
                    strHtml += '<li>' +
					'<div class="floor">#' + (parseInt(parseInt(i) + 1) + parseInt(pageSize) * parseInt(page_id - 1)) + '</div>' +
					'<div class="avatar">';
                    if (typeof (data[i].avatar) != "undefined") {
                        strHtml += '<img src="' + data[i].avatar + '" width="36" height="36" />';
                    } else {
                        strHtml += '<img src="' + defaultAvatar + '" width="36" height="36" />';
                    }
                    strHtml += '</div>' +
					'<div class="inner">' +
					'<p>' + unescape(data[i].content) + '</p>' +
					'<div class="meta">' +
					'<span class="blue">' + data[i].user_name + '</span>\n' +
					'<span class="time">' + data[i].add_time + '</span>' +
					'</div>' +
					'</div>';
                    if (data[i].is_reply == 1) {
                        strHtml += '<div class="answer">' +
						'<div class="meta">' +
						'<span class="right time">' + data[i].reply_time + '</span>' +
						'<span class="blue">管理员回复：</span>' +
						'</div>' +
						'<p>' + unescape(data[i].reply_content) + '</p>' +
						'</div>';
                    }
                    strHtml += '</li>';
                }
                $(listDiv).html(strHtml);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                $(listDiv).html('<p style="line-height:35px;">暂无评论，快来抢沙发吧！</p>');
            }
        });
    }
}



//=====================发送验证邮件=====================
function SendEmail2(username, sendurl) {
    if (username == "") {
        $.ligerDialog.warn('对不起，用户名不允许为空！');
        return false;
    }
    //提交
    $.ajax({
        url: sendurl,
        type: "POST",
        timeout: 60000,
        data: {
            username: function () {
                return username;
            }
        },
        dataType: "json",
        success: function (data, type) {
            if (data.msg == 1) {
                $.ligerDialog.success(data.msgbox);
            } else {
                $.ligerDialog.warn(data.msgbox);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $.ligerDialog.error("状态：" + textStatus + "；出错提示：" + errorThrown);
        }
    });
}

/*表单AJAX提交封装(包含验证)*/
function AjaxInitForm2(formId, btnId, isDialog, urlId) {
    var formObj = $('#' + formId);
    var btnObj = $("#" + btnId);
    var urlObj = $("#" + urlId);
    formObj.validate({
        //errorElement: "span",
        success: function (label) {
            //label.text(" ").addClass("success");
        },
        submitHandler: function (form) {
            //AJAX提交表单
            $(form).ajaxSubmit({
                beforeSubmit: formRequest,
                success: formResponse,
                error: formError,
                url: formObj.attr("url"),
                type: "post",
                dataType: "json",
                timeout: 60000
            });
            return false;
        }
    });

    //表单提交前
    function formRequest(formData, jqForm, options) {
        btnObj.val("提交中...");
    }

    //表单提交后
    function formResponse(data, textStatus) {
        if (data.msg == 1) {
            btnObj.val("提交成功");
            //是否提示，默认不提示
            //if (isDialog == 1) {
            $.ligerDialog.success(data.msgbox, function () {
                if (data.msgusername != null && data.msgusername != "") {
                    location.href = "/repassword/confirmyz/" + data.msgusername + ".aspx";
                    return;
                }
                if (data.url) {
                    location.href = "/repassword/confirmyz.aspx";
                } else if (urlObj.length > 0 && urlObj.val() != "") {
                    location.href = urlObj.val();
                } else {                     location.reload();
                    location.href = "/repassword/confirmyz/" + data.msgusername + ".aspx";
                }
            });
        } else {
            $.ligerDialog.warn(data.msgbox);
            btnObj.val("再次提交");
        }
    }
    //表单提交出错
    function formError(XMLHttpRequest, textStatus, errorThrown) {
        $.ligerDialog.error("状态：" + textStatus + "；出错提示：" + errorThrown);
        btnObj.val("再次提交");
    }
}




function ShouCang(id, webpath) { 
    if (id > 0) {
        $.ajax({
            type: "post",
            url:"/tools/submit_ajax.ashx?action=click_add",
            data: {
                id: id
            },
            dataType: "json",
            beforeSend: function (XMLHttpRequest) {
                //发送前动作
            },
            success: function (data, textStatus) {
                if (data.msg == 1) {
                    $.ligerDialog.success(data.msgbox);
                    //alert(data.msgbox);
                    // location.reload();
                } else {
                    //alert(data.msgbox);
                    $.ligerDialog.warn(data.msgbox);
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
              //  alert("状态：" + textStatus + "；出错提示：" + errorThrown);
            },
            timeout: 20000
        });
    }
}

//购物车数量加减
function CartComputNum(obj, webpath, goods_id, num) {
    if (num > 0) {
        var goods_quantity = $(obj).prev("input[name='goods_quantity']");
        $(goods_quantity).val(parseInt($(goods_quantity).val()) + 1);
        //alert($(goods_quantity).val());
        //return;
        //计算购物车金额
        CartAmountTotal($(goods_quantity), webpath, goods_id);
    } else {
        var goods_quantity = $(obj).next("input[name='goods_quantity']");
        if (parseInt($(goods_quantity).val()) > 1) {
            $(goods_quantity).val(parseInt($(goods_quantity).val()) - 1);
            //计算购物车金额
            CartAmountTotal($(goods_quantity), webpath, goods_id);
        }
    }
}

function addNum(id, num) {
    if (num > 0) {
        var goods_quantity = $("#" + id);

        $("#" + id).val(parseInt($(goods_quantity).val()) + 1);
        $("#" + id + "_1").html(parseInt($(goods_quantity).val()));
        var person2 = $("#person2");
        $("#personAll").val(parseInt($(goods_quantity).val()) + parseInt($(person2).val()));
        $("#otherPrice").html(parseInt($(goods_quantity).val()) + parseInt($(person2).val()));
        //获得成人单价
        var person1_price = $("#person1_price").val();
        //获得儿童单价
        var person2_price = $("#person2_price").val();
        //总价 儿童*单价+成人*单价
        var allPrice = parseInt($(goods_quantity).val()) * parseInt(person1_price) + parseInt($(person2).val()) * parseInt(person2_price);
          var oldallPrice = parseInt($(goods_quantity).val()) * parseInt($("#person1_oldprice").val()) + parseInt($(person2).val()) * parseInt($("#person2_oldprice").val());
        $("#allPrice").val(allPrice);
        $("#allPrice2").html(allPrice);
        $("#allPrice3").html(allPrice);
        $("#allPrice4").html(allPrice);
        $("#person1_allprice").html(parseInt($(goods_quantity).val()) * parseInt(person1_price));
        $("#person2_allprice").html(parseInt($(person2).val()) * parseInt(person2_price)); 
        $("#youhuiPrice").html(oldallPrice - allPrice);
        $("#youhuiPrice2").html(oldallPrice - allPrice);
    } else {
        var goods_quantity = $("#" + id);
        if (parseInt($(goods_quantity).val()) > 1) {
            $("#" + id).val(parseInt($(goods_quantity).val()) - 1);
            $("#" + id + "_1").html(parseInt($(goods_quantity).val()));
            var person2 = $("#person2");
            //获得成人单价
            var person1_price = $("#person1_price").val();
            //获得儿童单价
            var person2_price = $("#person2_price").val();
            //总价 儿童*单价+成人*单价
            var allPrice = parseInt($(goods_quantity).val()) * parseInt(person1_price) + parseInt($(person2).val()) * parseInt(person2_price);
            var oldallPrice = parseInt($(goods_quantity).val()) * parseInt($("#person1_oldprice").val()) + parseInt($(person2).val()) * parseInt($("#person2_oldprice").val());
            $("#person1_allprice").html(parseInt($(goods_quantity).val()) * parseInt(person1_price));
            $("#person2_allprice").html(parseInt($(person2).val()) * parseInt(person2_price));
            $("#allPrice").val(allPrice);
            $("#allPrice2").html(allPrice);
            $("#allPrice3").html(allPrice);
            $("#allPrice4").html(allPrice);
            $("#youhuiPrice").html(oldallPrice - allPrice);
            $("#youhuiPrice2").html(oldallPrice - allPrice);
        }
    }
}

function addNum2(id, num) {
    if (num > 0) {
        var goods_quantity = $("#" + id);

        $("#" + id).val(parseInt($(goods_quantity).val()) + 1);
        $("#" + id + "_1").html(parseInt($(goods_quantity).val()));
        var person2 = $("#person1");
        $("#personAll").val(parseInt($(goods_quantity).val()) + parseInt($(person2).val()));
        $("#otherPrice").html(parseInt($(goods_quantity).val()) + parseInt($(person2).val()));
        //获得成人单价
        var person1_price = $("#person1_price").val();
        //获得儿童单价
        var person2_price = $("#person2_price").val();
        //总价 儿童*单价+成人*单价 
        var allPrice = parseInt($(goods_quantity).val()) * parseInt(person2_price) + parseInt($(person2).val()) * parseInt(person1_price);
        var oldallPrice = parseInt($(goods_quantity).val()) * parseInt($("#person2_oldprice").val()) + parseInt($(person2).val()) * parseInt($("#person1_oldprice").val());
        $("#allPrice").val(allPrice);
        $("#allPrice2").html(allPrice);
        $("#allPrice3").html(allPrice);
        $("#allPrice4").html(allPrice);
        $("#person1_allprice").html(parseInt($(person2).val()) * parseInt(person1_price));
        $("#person2_allprice").html(parseInt($(goods_quantity).val()) * parseInt(person2_price));  
        $("#youhuiPrice").html(oldallPrice - allPrice);
        $("#youhuiPrice2").html(oldallPrice - allPrice);
    } else {
        var goods_quantity = $("#" + id);
        if (parseInt($(goods_quantity).val()) > 0) {
            $("#" + id).val(parseInt($(goods_quantity).val()) - 1);
            $("#" + id + "_1").html(parseInt($(goods_quantity).val()));
            var person2 = $("#person1");
            //获得成人单价
            var person1_price = $("#person1_price").val();
            //获得儿童单价
            var person2_price = $("#person2_price").val();
            //总价 儿童*单价+成人*单价
            var allPrice = parseInt($(goods_quantity).val()) * parseInt(person2_price) + parseInt($(person2).val()) * parseInt(person1_price);
            var oldallPrice = parseInt($(goods_quantity).val()) * parseInt($("#person2_oldprice").val()) + parseInt($(person2).val()) * parseInt($("#person1_oldprice").val());
            $("#allPrice").val(allPrice);
            $("#allPrice2").html(allPrice);
            $("#allPrice3").html(allPrice);
            $("#allPrice4").html(allPrice);
        $("#person1_allprice").html(parseInt($(person2).val()) * parseInt(person1_price));
        $("#person2_allprice").html(parseInt($(goods_quantity).val()) * parseInt(person2_price));
        $("#youhuiPrice").html(oldallPrice - allPrice);
        $("#youhuiPrice2").html(oldallPrice - allPrice);
        }
    }
}


function changeNum(id) {
    if (id == 1) {

        var person1 = $("#person1").val();
        if (person1 == 0) {
            alert("成人至少一位！");
            $("#person1").val(1);
            return false;
        }
    } 
    var person1 = $("#person1").val();

       
        var person2 = $("#person2").val();
        $("#personAll").val(parseInt(person1) + parseInt(person2));
        $("#otherPrice").html(parseInt(person1) + parseInt(person2));
        //获得成人单价
        var person1_price = $("#person1_price").val();
        //获得儿童单价
        var person2_price = $("#person2_price").val();
        //总价 儿童*单价+成人*单价
        var allPrice = parseInt(person1) * parseInt(person1_price) + parseInt(person2) * parseInt(person2_price);
        var oldallPrice = parseInt(person1) * parseInt($("#person1_oldprice").val()) + parseInt(person2) * parseInt($("#person2_oldprice").val());
        $("#allPrice").val(allPrice);
        $("#allPrice2").html(allPrice);
        $("#allPrice3").html(allPrice);
        $("#allPrice4").html(allPrice);
        $("#person1_allprice").html(parseInt(person1) * parseInt(person1_price));
        $("#person2_allprice").html(parseInt(person2) * parseInt(person2_price));
   
        $("#youhuiPrice").html(oldallPrice - allPrice);
        $("#youhuiPrice2").html(oldallPrice - allPrice);
    
}
 
/*表单AJAX提交封装(包含验证)*/
function AjaxInitForm3(formId, btnId, isDialog, urlId) {
    var formObj = $('#' + formId);
    var btnObj = $("#" + btnId);
    var urlObj = $("#" + urlId);
    formObj.validate({
        //errorElement: "span",
        success: function (label) {
            //label.text(" ").addClass("success");
        },
        submitHandler: function (form) {
            //AJAX提交表单
            $(form).ajaxSubmit({
                beforeSubmit: formRequest,
                success: formResponse,
                error: formError,
                url: formObj.attr("url"),
                type: "post",
                dataType: "json",
                timeout: 60000
            });
            return false;
        }
    });

    //表单提交前
    function formRequest(formData, jqForm, options) {
        btnObj.attr("disabled", "disabled");
        btnObj.val("提交中...");
    }

    //表单提交后
    function formResponse(data, textStatus) {
        if (data.msg == 1) {
            btnObj.val("提交成功");
            btnObj.removeAttr("disabled");
            //是否提示，默认不提示
            //if (isDialog == 1) {
            $.ligerDialog.success(data.msgbox, function () {
                if (data.url) { 
                    location.href = data.url;
                } else if (urlObj.length > 0 && urlObj.val() != "") {
                    location.href = urlObj.val();
                } else {
                     location.reload();
                }
            });
            //            } else {
            //                if (data.url) {
            //                    location.href = data.url;
            //                } else if (urlObj.val()) {
            //                    location.href = urlObj.val();
            //                } else {
            //                    location.reload();
            //                }
            //            }
        } else {
            $.ligerDialog.warn(data.msgbox);
            btnObj.removeAttr("disabled");
            btnObj.val("再次提交");
        }
    }
    //表单提交出错
    function formError(XMLHttpRequest, textStatus, errorThrown) {
        $.ligerDialog.error("状态：" + textStatus + "；出错提示：" + errorThrown);
        btnObj.removeAttr("disabled");
        btnObj.val("再次提交");
    }
}



