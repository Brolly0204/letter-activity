'use strict';

var u = navigator.userAgent;
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; // android终端
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端
function getQueryVariable(variable) {
    console.log('当前URL', window.location.search);
    //获取url中的参数
    var rs = decodeURI(window.location.search);
    var query = rs.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    return null;
}
// function getLocalTime(nS) {
//     return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ');
// }
function getLocalTime(nS) {
    return new Date(parseInt(nS) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
}
/* loading弹窗 */
function openloading(text) {
    var div = document.createElement('div');
    div.setAttribute('id', 'loadingshow');
    div.innerHTML = text || '';
    document.getElementsByTagName('body')[0].appendChild(div);
}

function closeloading() {
    var load = document.getElementById('loadingshow');
    document.getElementsByTagName('body')[0].removeChild(load);
}
//   toast 弹窗
function openToast(text) {
    var load = document.getElementById('toast');
    if (load) {
        return;
    }
    var div = document.createElement('div');
    div.setAttribute('id', 'toast');
    div.innerHTML = text || '';
    document.getElementsByTagName('body')[0].appendChild(div);
    setTimeout(function () {
        closeToast();
    }, 1500);
}

function closeToast() {
    var load = document.getElementById('toast');
    document.getElementsByTagName('body')[0].removeChild(load);
}

function datetimeTounix(datetime) {
    //时间格式转时间戳
    var tmp_datetime = datetime.replace(/:/g, '-');
    tmp_datetime = tmp_datetime.replace(/ /g, '-');
    var arr = tmp_datetime.split("-");
    var now = new Date(Date.UTC(arr[0], arr[1] - 1, arr[2], arr[3] - 8, arr[4], arr[5]));
    return parseInt(now.getTime() / 1000);
}

function formatDate(nS) {
    //时间戳转时间格式
    var now = new Date(parseInt(nS) * 1000);
    var year = now.getFullYear();
    var month = now.getMonth() + 1 < 10 ? '0' + (now.getMonth() + 1) : now.getMonth() + 1;
    var date = now.getDate() < 10 ? '0' + now.getDate() : now.getDate();
    var hour = now.getHours() < 10 ? '0' + now.getHours() : now.getHours();
    var minute = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes();
    var second = now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds();
    return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
}

function formatDateD(nS) {
    if (!nS) return null;
    //时间戳转时间格式
    var now = new Date(parseInt(nS) * 1000);
    var year = now.getFullYear();
    var month = now.getMonth() + 1 < 10 ? '0' + (now.getMonth() + 1) : now.getMonth() + 1;
    var date = now.getDate() < 10 ? '0' + now.getDate() : now.getDate();
    var hour = now.getHours() < 10 ? '0' + now.getHours() : now.getHours();
    var minute = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes();
    var second = now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds();
    return year + "年" + month + "月" + date + "日";
}

function getSimpleText(html) {
    //富文本提取纯文字
    var re1 = new RegExp("<.+?>", "g"); //匹配html标签的正则表达式，"g"是搜索匹配多个符合的内容
    var msg = html.replace(re1, ''); //执行替换成空字符
    return msg;
}

function isDouble(str) {
    if (str < 10) {
        return "0" + str;
    } else {
        return str;
    }
}

function getSystemIos() {
    var u = navigator.userAgent,
        app = navigator.appVersion;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if (isAndroid) {
        return false;
    }
    if (isiOS) {
        return true;
    }
}
// 手机号校验
function isPhone(phone) {
    return !/^1[3|4|5|6|7|8|9][0-9]{9}$/.test(phone);
}
// 判空校验
function isEmpty(text) {
    if (text == '' || text == null || text == 'null' || text == undefined || text == 'undefined') {
        return true;
    } else {
        return false;
    }
}

function isPositiveInteger(s) {
    //是否为正整数
    var re = /^[0-9]+$/;
    return re.test(s);
}

function isIphonex() {
    if (typeof window !== 'undefined' && window) {
        return (/iphone/gi.test(window.navigator.userAgent) && window.screen.height >= 812
        );
    }
    return false;
}
//判断是否是微信浏览器的函数
function isWeiXin() {
    //window.navigator.userAgent属性包含了浏览器类型、版本、操作系统类型、浏览器引擎类型等信息，这个属性可以用来判断浏览器类型
    var ua = window.navigator.userAgent.toLowerCase();
    //通过正则表达式匹配ua中是否含有MicroMessenger字符串
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
    } else {
        return false;
    }
}
// 获取微信配置
var getWxConfig = function getWxConfig(params) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: basePath + 'topic/queryScan',
            method: 'POST',
            data: {
                url: params.url
            },
            success: function success(res) {
                resolve(res);
            }
        });
    });
};
// 微信分享
var wxShare = function wxShare(parmas) {
    parmas = parmas || {};
    // console.log(parmas,'%%%%%')
    var _this = this;
    getWxConfig({
        url: window.location.href
    }).then(function (response) {
        console.log('微信配置', response);
        if (response) {
            console.log('appid', response.appId);
            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端openAlert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: response.appId, // 必填，公众号的唯一标识
                timestamp: response.timestamp, // 必填，生成签名的时间戳
                nonceStr: response.nonceStr, // 必填，生成签名的随机串
                signature: response.signature, // 必填，签名，见附录1
                jsApiList: ['onMenuShareTimeline', // 分享到朋友圈
                'onMenuShareAppMessage', // 分享到微信朋友
                'updateAppMessageShareData', // 分享到微信朋友
                'updateTimelineShareData', // 分享到朋友圈
                'hideMenuItems', // 隐藏右上角菜单
                'hideOptionMenu'
                ]
                // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });

            wx.ready(function () {
                console.log('ready');
                typeof parmas.ready === 'function' && parmas.ready()
                // 微信分享的数据
                var shareData = {
                    imgUrl: parmas.img || 'https://file-oss.syrjia.com/uploadFiles/picConfig/20220818151656861290.png', // 分享显示的缩略图地址
                    link: parmas.link || window.location.href, // 分享地址
                    desc: parmas.desc || '特别回馈活动等您参加', // 分享描述
                    title: parmas.title || '2022中国医师节', // 分享标题
                    success: function success() {
                        parmas.success && parmas.success();
                        // 分享成功后的回调，此接口用于记录分享次数
                        // _this
                        //   .$post("/topic/share", {
                        //     topicId: _this.$route.query.id
                        //   })
                        //   .then(response => {
                        //     console.log(response, "分享次数接口调用");
                        //     // alert("分享次数接口调用")
                        //   });
                    }
                };
                // wx.updateAppMessageShareData(shareData) //自定义“分享给朋友”及“分享到QQ”按钮的分享内容
                // wx.updateTimelineShareData(shareData) //自定义“分享给朋友”及“分享到QQ”按钮的分享内容
                wx.onMenuShareTimeline(shareData);
                wx.onMenuShareAppMessage(shareData);
                wx.onMenuShareQQ(shareData);
                wx.onMenuShareWeibo(shareData);
                wx.onMenuShareQZone(shareData);
            });
            wx.error(function (res) {
                console.log('err', res);
            });
        }
    });
};
var keyStr = "syrjiacmsinterfa";
//加密
function encrypt(word) {
    keyStr = keyStr ? keyStr : 'abcdefgabcdefg12';
    var key = CryptoJS.enc.Utf8.parse(keyStr); //Latin1 w8m31+Yy/Nw6thPsMpO5fg==
    var srcs = CryptoJS.enc.Utf8.parse(word);
    var encrypted = CryptoJS.AES.encrypt(srcs, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
    return encrypted.toString();
}
// aes加密
function ajax(param) {
    var data = param.data;
    var params = param;
    params.data = {
        dataJson: encrypt(JSON.stringify(data))
    };
    $.ajax(params);
}
// 查看本地缓存是否存在医生ID
function checkDoctorId(id){
    if (!localStorage.getItem('doctorId') || localStorage.getItem('doctorId') == ''){
        var url = ''
        if(getQueryVariable('paperId')){
            url = 'register.html?paperId=' + getQueryVariable('paperId');
        }else{
            url = 'register.html?activitieId=' + getQueryVariable('activitieId');
        }
        window.location.replace(url)
    } else{
        id = localStorage.getItem('doctorId')
    }
}

var activitieTitle = "";
var basePath = document.location.protocol + "//" + window.location.host + '/cmsPro/index/';
// var basePath = 'https://test-syrjia.syrjia.cn/cmsPro/index/'
// 上医接口
if (window.location.host == 'store-mall.syrjia.com') {
    var syrjiaPath = 'https://mobile.syrjia.com/syrjiaDoctorApi/';
} else if (window.location.host == 'pre-syrjia.syrjia.cn') {
    var syrjiaPath = 'https://pre-syrjia.syrjia.cn/syrjiaDoctorApi/';
} else {
    var syrjiaPath = 'https://test-syrjia.syrjia.cn/syrjiaDoctorApi/';
}