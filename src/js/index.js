require(["./js/config.js"], function() {
    require(["ajax", "bscroll"], function(ajax, bscroll) {
        var sectionBox = document.querySelector(".section-box");
        var ulist = document.querySelector("#ulist");
        var li = ulist.querySelectorAll("li");

        var type = 1, //默认为我的爱豆页面
            page = 1, //从第一页开始
            page_size = 6, //一页显示6条数据
            totle = 0; //初始页数为1页

        var iscroll = null;

        function init() {
            //渲染初始页面
            loadData();
            //上拉加载
            iScroll();

            //点击每个li
            addEvent()
        }

        function loadData() {
            ajax({
                url: "/api/page",
                data: {
                    type: type,
                    page: page,
                    page_size: page_size
                },
                dataType: "json",
                success: function(data) {
                    console.log(data)
                    var str = "";
                    if (data.code === 1) {
                        totle = data.totle;

                        data.msg.forEach(function(file) {
                            str += `
                            <li>${file.title}</li>
                            `
                        });

                        sectionBox.innerHTML += str;
                        iscroll.refresh(); //从新计算高度
                    }
                }
            })
        }

        function iScroll() {
            iscroll = new bscroll("#section", {
                click: true,
                probeType: 2,
            });

            iscroll.on("scroll", function() {
                //maxScrollY 最大高度
                if (this.y < this.maxScrollY - 40) {
                    if (page < totle) {
                        sectionBox.setAttribute("up", "释放加载更多")
                    } else {
                        sectionBox.setAttribute("up", "没有更多数据")
                    }


                } else if (this.y < this.maxScrollY - 20) {
                    if (page < totle) {
                        sectionBox.setAttribute("up", "释放加载更多")
                    } else {
                        sectionBox.setAttribute("up", "没有更多数据")
                    }

                }
            });

            iscroll.on("touchEnd", function() {
                if (sectionBox.getAttribute("up") === "释放加载更多") {
                    if (page < totle) {
                        page++;
                        loadData();
                        sectionBox.setAttribute("up", "上拉加载")
                    } else {
                        sectionBox.setAttribute("up", "没有更多数据")
                    }
                }
            })

        }

        function addEvent() {
            li.forEach(function(file) {
                file.onclick = function() {
                    sectionBox.innerHTML = ""; //清空当前数据
                    for (var i = 0; i < li.length; i++) {
                        li[i].classList.remove("active")
                    }
                    file.classList.add("active");

                    type = this.getAttribute("data-type");
                    page = 1;
                    sectionBox.setAttribute("up", "上拉加载")
                    loadData();
                }
            })
        }
        init();
    })
})