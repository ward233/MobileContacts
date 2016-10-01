$(document).ready(function() {
    var newContactVm = new Vue({
        el: 'body',
        data: {
            showContact: false,
            showMain: true
        }
    });
    $('body').css('visibility', 'visible'); // 用来解决文档先渲染后再执行脚本的隐藏元素闪烁问题

    $('main .icon-add').click(function() {
        newContactVm.showContact = true;
        newContactVm.showMain = false;
    });
    $('.new-contact .cancle').click(function() {
        newContactVm.showContact = false;
        newContactVm.showMain = true;
    });
});
