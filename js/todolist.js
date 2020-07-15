//入口函数
$(function () {
    load();
    //1.文本输入框添加键盘回车输入事件
    $('#title').on('keydown', function (event) {
        if (event.keyCode == 13) {
            //判断用户是否输入了内容
            if ($(this).val().trim() == '') {
                alert('请输入内容');
            } else {
                //先获取数据
                var data = getData();
                //将用户输入的内容以对象的形式添加到数组中
                data.push({
                    title: $(this).val(),
                    done: false,
                });
                //存储数据到本地
                saveData(data);
                //加载数据渲染页面
                load();
                //加载完后清空用户输入框
                $(this).val('');
            }
        }
    })
    //2.删除部分功能
    //事件委托
    $('ol, ul').on('click', 'a', function () {
        //获取数据
        var data = getData();
        //获取当前的索引 根据动态创建的a标签的属性id
        var index = $(this).prop('id');
        //数组删除数据.splice(index, 1)当前位置开始,删除一个
        data.splice(index, 1);
        //存储数据
        saveData(data);
        //加载数据渲染页面
        load();
    })
    //3.正在进行和已完成选项操作
    $('ol, ul').on('click', 'input', function () {
        //获取数据
        var data = getData();
        //获取当前的索引 根据动态创建的a标签的属性id
        //.siblings('a')括号里a不能少,否则获取不到索引号
        var index = $(this).siblings('a').prop('id');
        //根据当前点击复选框的状态更改数据
        data[index].done = $(this).prop('checked');
        //将当前数据添加到新的变量
        var newData = data[index];
        //删除当前的数据
        data.splice(index, 1);
        //将保存的数据添加到数组的最后
        data.push(newData);
        //存储数据
        saveData(data);
        //加载数据渲染页面
        load();
    })

    

    //获取数据功能块
    function getData() {
        var data = localStorage.getItem('todolist')
        //本地存储为空时返回一个数组,以数组的形式存数据数组的每一项以对象的形式
        if (data == null) {
            return [];
        } else {
            // 本地存储的数据是字符串的形式,需要转换成json对象格式
            return JSON.parse(data);
        }
    }

    //存储数据功能块
    function saveData(data) {
        //设置一个名为todolist,将数据转换为json的字符串
        localStorage.setItem('todolist', JSON.stringify(data));
    }

    //加载渲染页面功能块
    function load() {
        //加载前先清空ol ul,避免数据的重复加载
        $('ol,ul').empty();
        // 获取数据
        var data = getData();
        //遍历数据
        $(data).each(function (index, item) {
            if (item.done) {
                $('ul').prepend(`<li>
                                 <input type="checkbox" checked>
                                <p>${item.title}</p>
                                <a href="javascript:;" id='${index}'></a>
                                 </li>`);
            } else {
                $('ol').prepend(`<li>
                                 <input type="checkbox">
                                <p>${item.title}</p>
                                <a href="javascript:;" id='${index}'></a>
                                 </li>`);
            }
        })
        //正在进行
        $('#todocount').text($('ol li').length);
        //已经完成
        $('#donecount').text($('ul li').length);
    }









})