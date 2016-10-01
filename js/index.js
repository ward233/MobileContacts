$(document).ready(function() {
    var newContactVm = new Vue({
        el: '.new-contact',
        data: {
            newContact: false,
        }
    });
    $('body').css('visibility', 'visible'); // 用来解决文档先渲染后再执行脚本的隐藏元素闪烁问题
    newContactVm.newContact = true;

    $('.icon-add').click(function() {
        newContactVm.newContact = true;
    });
});
