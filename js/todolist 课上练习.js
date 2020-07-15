//入口函数
$(function () {
    //加载数据渲染到页面
    load();
    //1.输入框添加键盘输入事件
    $('#title').on('keydown', function (event) {
        //当按下回车键
        if (event.keyCode === 13) {
            //判断一下用户是否输入了内容
            if ($(this).val().trim() == '') {
                alert('请输入内容');
            } else {
                ////获取本地保存的数据
                var local = getData();
                //将用户输入的内容添加到local数组中
                local.push({
                    title: $(this).val(),
                    done: false,
                });
                //2.将local保存到本地
                setData(local);
                //渲染页面
                load();
                //数据渲染后将用户输入框清空
                $(this).val('');
            }
        }
    })
    //3.删除模块删除本地数据
    $('ol,ul').on('click', 'a', function () {
        //先读取数据获得本地存储
        var data = getData();
        //获取索引号
        var index = $(this).prop('id');
        //修改data数据,删除当前的索引号,删除一个splice(删除的位置,删除的个数)
        data.splice(index, 1);
        //再保存到本地
        setData(data);
        //渲染页面
        load();

    })
    //4.正在进行和已完成选项操作
    $('ol,ul').on('click', 'input', function () {
        //先读取数据获得本地存储
        var data = getData();
        //获取索引修改数据
        var index = $(this).siblings('a').prop('id');
        //将数据中的done值由checked改变
        data[index].done = $(this).prop('checked');
        //先保存这个数据
        var newData = data[index];
        //将当前这个数据删除
        data.splice(index, 1);
        //将保存的数据添加到数组中
        data.push(newData);
        //再保存到本地
        setData(data);
        //渲染页面
        load();

    })

    //读取本地存储的数据  getData()
    function getData() {
        var data = localStorage.getItem('todolist');
        //没取到数据 返回一个数组
        if (data == null) {
            return [];
        } else {
            // 本地存储的数据是字符串的形式,需要转换成对象格式的
            return JSON.parse(data);
        }
    }
    //保存数据到本地  setData(data)
    function setData(data) {
        localStorage.setItem('todolist', JSON.stringify(data));
    }
    //渲染加载数据到页面  load()
    function load() {
        //加载前先删除ol避免数据重复
        $('ol,ul').empty();
        //读取本地存储数据
        var data = getData();
        //循环遍历数据(数组)
        $(data).each(function (index, item) {
            if (item.done) {
                //选中的话将数据渲染到ul中
                $('ul').prepend(`<li>
                                    <input type="checkbox" checked>
                                    <p>${item.title}</p>
                                    <a href="javascript:;" id='${index}'></a>
                                </li>`);
            } else {
                //未选中将数据添加到ol中渲染页面
                $('ol').prepend(`<li>
                                    <input type="checkbox">
                                    <p>${item.title}</p>
                                    <a href="javascript:;" id='${index}'></a>
                                </li>`);
            }

        })
        //正在进行的数量
        $('#todocount').text($('ol li').length);
        //已经完成的数量
        $('#donecount').text($('ul li').length);
    }




    //用户输入内容模块 ==>  先读取本地存储的数据 ==>  修改数据(将后输入的内容添加到数组后面) ==> 存储数据  ==>  通过存储的数据渲染到页面中



})