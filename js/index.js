$(document).ready(function() {

    function LocalStorage() {}
    LocalStorage.prototype.getUserList = function() {
        var userList = [];
        for (var i = 0; i < localStorage.length; i++) {
            userList.push(localStorage.key(i));
        }
        return userList;
    };

    LocalStorage.prototype.setParseItem = function(itemName, itemObjContent) {
        localStorage.setItem(itemName, JSON.stringify(itemObjContent));
    };

    LocalStorage.prototype.getParseItem = function(itemName) {
        return $.parseJSON(localStorage[itemName]);
    };
    LocalStorage.prototype.removeItem = function(itemName) {
        localStorage.removeItem(itemName);
    };

    var userLocalInfo = new LocalStorage();


    var mainVm = new Vue({
        el: '#main',
        data: {
            show: true,
            userList: userLocalInfo.getUserList()
        },
        methods: {
            showUserContactInfo: function(event) {
                this.show = false;
                userContactInfoVm.show = true;
                // userContactInfoVm.userInfo = $.parseJSON(localStorage[$.trim($(event.target).text())]);
                userContactInfoVm.userInfo = userLocalInfo.getParseItem($.trim($(event.target).text()));
            },
            showNewContact: function() {
                this.show = false;
                newContactVm.show = true;
            }
        },
        ready: function() {
            $(this.$el).css('visibility', 'visible');
        }

    });

    var newContactVm = new Vue({
        el: '#new-contact',
        data: {
            show: false,
            dataNum: 0,
            userInfo: {
                userName: "",
                phoneList: [],
                phoneRing: "默认",
                phoneShock: "默认"
            }

        },
        methods: {
            initInfo: function() {
                this.userInfo.userName = "";
                this.dataNum = 0;
                this.userInfo.phoneList = [];
                this.userInfo.phoneRing = "默认";
                this.userInfo.phoneShock = "默认";
            },
            addPhone: function() {
                this.userInfo.phoneList.push({
                    dataNum: this.dataNum,
                    phoneType: "住宅",
                    phoneNum: ""
                });
                this.dataNum += 1;
            },
            removePhone: function(event) {
                var dataNum = $(event.target).parent().parent().attr('data-num');
                this.userInfo.phoneList = this.userInfo.phoneList.filter(function(item) {
                    return item.dataNum !== parseInt(dataNum);
                });
            },
            cancle: function() {
                if (confirm('确定不要保存吗？')) {
                    this.show = false;
                    mainVm.show = true;
                    this.initInfo();
                }

            },
            save: function() {
                if (this.userInfo.userName.length === 0 || this.userInfo.userName.indexOf(" ") !== -1) {
                    alert("名字不可为空！");
                } else {
                    userLocalInfo.setParseItem(this.userInfo.userName, this.userInfo);
                    this.initInfo();
                    this.show = false;
                    mainVm.show = true;
                    mainVm.userList = userLocalInfo.getUserList();
                }
            }
        },
        ready: function() {
            $(this.$el).css('visibility', 'visible');
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
            },
            edit: function() {
                this.show = false;
                newContactVm.show = true;
                $('#new-contact h1').remove();
                newContactVm.userInfo.userName = userContactInfoVm.userInfo.userName;
                newContactVm.userInfo.phoneList = userContactInfoVm.userInfo.phoneList;
                newContactVm.userInfo.phoneRing = userContactInfoVm.userInfo.phoneRing;
                newContactVm.userInfo.phoneShock = userContactInfoVm.userInfo.phoneShock;

            },
            deleteCall: function() {

                if (confirm("确定要删除联系人吗?")) {
                    userLocalInfo.removeItem(userContactInfoVm.userInfo.userName);
                    this.show = false;
                    mainVm.show = true;
                    mainVm.userList = userLocalInfo.getUserList();
                }
            }
        },
        ready: function() {
            $(this.$el).css('visibility', 'visible');
        }
    });


});
