$(document).ready(function() {


    var zip = function(arr1, arr2) {
        var length = arr1.length;
        var addArr = [];
        for (var i = 0; i < length; i++) {
            addArr.push([arr1[i], arr2[i]]);
        }
        return addArr;
    };
    var contactList = new Vue({
        el: '.contact-list',
        data: {
            userList: []
        }
    });
    var newContactVm = new Vue({
        el: 'body',
        data: {
            showContact: false,
            showMain: true,
            phoneNum: 0,
            phoneItems: [],
            emailNum: 0,
            emailItems: [],
            userInfo: {}
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

                var contactType = $('#add-phone .type-chose');
                var phoneTypeArr = [];
                $.each(contactType, function(index, el) {
                    phoneTypeArr.push($(el).val());
                });
                var ContactphoneNum = $('#add-phone input');
                var phoneNumArr = [];
                $.each(ContactphoneNum, function(index, el) {
                    phoneNumArr.push($(el).val());
                });
                var name = $('.contact-info input').val();
                var ContactPhoneInfo = zip(phoneTypeArr, phoneNumArr);
                var phoneRing = $('#chose-phone-ring select').val();
                var phoneShock = $('#chose-phone-shock select').val();
                this.userInfo.name = name;
                this.userInfo.ContactPhoneInfo = ContactPhoneInfo;
                this.userInfo.phoneRing = phoneRing;
                this.userInfo.phoneShock = phoneShock;
                var userInfoStr = JSON.stringify(this.userInfo);
                localStorage.setItem(name, userInfoStr);
                var userList = [];
                for (var i = 0; i < localStorage.length; i++) {
                    userList.push(localStorage.key(i));
                }

                contactList.userList = userList;
                this.cancleNewContactFunc();
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

    var userList = [];
    for (var i = 0; i < localStorage.length; i++) {
        userList.push(localStorage.key(i));
    }

    contactList.userList = userList;


});
