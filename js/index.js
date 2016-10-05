$(document).ready(function() {
    /**
     * 该类用于封装增强了的localStorage对象方法
     */
    function LocalStorage() {

        /**
         * 从本地存储中得到联系人列表
         * @return {Array} 由联系人名构成的数组
         */
        this.getUserList = function() {
            var userList = [];
            for (var i = 0; i < localStorage.length; i++) {
                userList.push(localStorage.key(i));
            }
            return userList;
        };


        /**
         * 将json对象存储为json字面量
         * @param {String} itemName       json对象的标示名 这里为联系人的名字
         * @param {Object} itemObjContent 要存放的json对象
         */
        this.setParseItem = function(itemName, itemObjContent) {
            localStorage.setItem(itemName, JSON.stringify(itemObjContent));
        };


        /**
         * 得到由json字面量转化而来的json对象
         * @param  {String} itemName 联系人的名字
         * @return {Object}          要取出的json对象
         */
        this.getParseItem = function(itemName) {
            return $.parseJSON(localStorage[itemName]);
        };


        /**
         * 删除某个联系人的信息
         * @param  {String} itemName 联系人名
         */
        this.removeItem = function(itemName) {
            localStorage.removeItem(itemName);
        };
    }


    var userLocalInfo = new LocalStorage();


   //主页的Vue实例
    var mainVm = new Vue({
        el: '#main',
        data: {
            show: true,
            userList: userLocalInfo.getUserList()
        },
        methods: {

            //显示联系人详细信息
            showUserContactInfo: function(event) {
                this.show = false;
                userContactInfoVm.show = true;

                //将本地数据载入到详细信息里的userInfo对象中
                userContactInfoVm.userInfo = userLocalInfo.getParseItem($.trim($(event.target).text()));
            },
            //显示新建联系人页面
            showNewContact: function() {
                this.show = false;
                newContactVm.show = true;
            }
        },
        //在Vue实例创建完毕后 再显示该实例 防止在加载中出现画面抖动
        ready: function() {
            $(this.$el).css('visibility', 'visible');
        }

    });

    //新联系人页的Vue实例
    var newContactVm = new Vue({
        el: '#new-contact',
        data: {
            show: false,
            dataNum: 0, //用于添加号码时的计数, 标识不同的号码
            userInfo: {
                userName: "",
                phoneList: [], // 该数组是对象数组 每个对象有三个属性 dataNum中存放 号码的标识 phoneType中存放 号码的类型 phoneNum中存放号码的值
                phoneRing: "默认",
                phoneShock: "默认"
            }

        },
        methods: {
            //初始化用户信息
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
                // 获取到事件发生时的那个li 的dataNum
                var dataNum = $(event.target).parent().parent().attr('data-num');
                // 将有这个dataNum的对象从phoneList中筛出
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
                //名字为空或者名字中有空格
                if (this.userInfo.userName.length === 0 || this.userInfo.userName.indexOf(" ") !== -1) {
                    alert("名字不可为空！");
                } else {
                    //将usefInfo 中存放的用户数据放到本地存储中
                    userLocalInfo.setParseItem(this.userInfo.userName, this.userInfo);
                    this.initInfo();
                    this.show = false;
                    mainVm.show = true;
                    //更新首页列表
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
