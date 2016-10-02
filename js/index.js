$(document).ready(function() {
    var getUserList = function() {
        var userList = [];
        for (var i = 0; i < localStorage.length; i++) {
            userList.push(localStorage.key(i));
        }
        return userList;
    };

    var mainVm = new Vue({
        el: '#main',
        data: {
            show: true,
            userList: getUserList()
        },
        methods: {
            showUserContactInfo: function(event) {
                this.show = false;
                userContactInfoVm.show = true;
                userContactInfoVm.userInfo = $.parseJSON(localStorage[$.trim($(event.target).text())]);
            },
            showNewContact: function() {
                this.show = false;
                newContactVm.show = true;
            }
        }

    });
    var newContactVm = new Vue({
        el: '#new-contact',
        data: {
            show: false,
            userName: "",
            dataNum: 0,
            phoneList: [],
            phoneRing: "默认",
            phoneShock: "默认",
            userInfo: {}

        },
        methods: {
            addPhone: function() {
                this.phoneList.push({
                    dataNum: this.dataNum,
                    phoneType: "住宅",
                    phoneNum: ""
                });
                this.dataNum += 1;
            },
            removePhone: function(event) {
                var dataNum = $(event.target).parent().parent().attr('data-num');
                console.log(this.phoneList);
                this.phoneList = this.phoneList.filter(function(item) {
                    return item.dataNum !== parseInt(dataNum);
                });
            },
            cancle: function() {
                mainVm.show = true;
                this.show = false;
                this.userName = "";
                this.dataNum = 0;
                this.phoneList = [];
                this.phoneRing = "默认";
                this.phoneShock = "默认";

            },
            save: function() {
                this.userInfo.userName = this.userName;
                this.userInfo.phoneList = this.phoneList;
                this.userInfo.phoneShock = this.phoneShock;
                this.userInfo.phoneRing = this.phoneRing;
                var userInfoStr = JSON.stringify(this.userInfo);
                localStorage.setItem(this.userName, userInfoStr);
                this.cancle();

                mainVm.userList = getUserList();
            }
        }
    });
    var userContactInfoVm = new Vue({
        el: '#user-contact-info',
        data: {
            show: false,
            userInfo: {}
        },
        methods: {
            goBack: function() {
                this.show = false;
                mainVm.show = true;
            }
        }
    });

    $('body').css('visibility', 'visible'); // 用来解决文档先渲染后再执行脚本的隐藏元素闪烁问题



});
