$(document).ready(function() {
    var newContactVm = new Vue({
        el: 'body',
        data: {
            showContact: false,
            showMain: true,
            phoneNum: 0,
            phoneItems: [],
            emailNum: 0,
            emailItems: [],
        },
        methods: {
            showContactFunc: function() {
                this.showContact = true;
                this.showMain = false;
                $('#chose-phone-ring option').first().removeAttr('selected');
                $('#chose-phone-shock option').first().removeAttr('selected');
            },
            cancleNewContactFunc: function() {
                this.showContact = false;
                this.showMain = true;
                this.phoneItems = [];
                this.emailItems = [];
                this.phoneNum = 0;
                this.emailNum = 0;
                $('.contact-info input').val('');

                $('#chose-phone-ring option').first().attr('selected', 'true');
                $('#chose-phone-shock option').first().attr('selected', 'true');
            },
            saveContactFunc: function() {
                console.log('hello');

                console.log($('.contact-info input').serialize());
            },
            addPhoneFunc: function() {
                this.phoneItems.push(this.phoneNum);
                this.phoneNum += 1;
            },
            addEmailFunc: function() {
                this.emailItems.push(this.emailNum);
                this.emailNum += 1;
            }
        }
    });
    $('body').css('visibility', 'visible'); // 用来解决文档先渲染后再执行脚本的隐藏元素闪烁问题
    $('.new-contact').click(function(event) {
        var $node = $(event.target);
        if ($node.hasClass('icon-remove-phone')) {
            var removeName = $node.parent().next('input').attr('name');
            var removeNameArr = removeName.split('');
            var removeType = removeNameArr.splice(0, 5).join('');
            var removeNum = parseInt(removeNameArr.join(''));
            if (removeType === 'phone') {
                newContactVm.phoneItems.$remove(removeNum);
            } else {
                newContactVm.emailItems.$remove(removeNum);

            }

        }
    });

});
