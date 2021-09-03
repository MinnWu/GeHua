// var list = ['产品名称', '起始日期', '初始价格', '结束日期', '末期价格', '波动率', '溢价率',]
var list = ['Enter product name.', 'Start date', 'Enter start price.', 'End date', 'Enter end price', 'Enter volatility index.', 'Enter premium rate.',]
var _product = {
    'pName': '',     //商品名称
    'startDate': '',     //起始日期
    'startPrice': '',     //初始价格
    'endDate': '',       //结束日期
    'endPrice': '',  //末期价格
    'volatility': '',    //波动率
    'PR': '',    //溢价率
}

//生成商品信息列表
const productList = (obj, divele = 'list') => {
    let div, input, arr, eleObj, small, mini, span, fnkey, keyadd, keydel, a, kdiv
    eleObj = document.getElementById(divele)
    div = document.createElement('div')
    div.className = 'row'
    arr = Object.keys(obj)
    for (let index = 0; index < list.length; index++) {
        small = document.createElement('div')
        small.className = 'small'
        mini = document.createElement('div')
        span = document.createElement('span')
        span.innerHTML = list[index]
        mini.appendChild(span)
        small.appendChild(mini)
        mini = document.createElement('div')
        input = document.createElement('input')
        input.type = 'text'
        input.id = arr[index]
        mini.appendChild(input)
        small.appendChild(mini)
        div.appendChild(small)
    }
    fnkey = document.createElement('div')
    fnkey.className = 'fnkey'
    keyadd = document.createElement('div')
    keyadd.className = 'key add'
    a = document.createElement('a')
    a.innerHTML = '✚'
    keyadd.appendChild(a)
    fnkey.appendChild(keyadd)
    kdiv = document.createElement('div')
    fnkey.appendChild(kdiv)
    keydel = document.createElement('div')
    keydel.className = 'key del'
    a = document.createElement('a')
    a.innerHTML = '━'
    keydel.appendChild(a)
    fnkey.appendChild(keydel)
    div.appendChild(fnkey)
    eleObj.appendChild(div)
}

//增加商品信息列表
const addElement = (obj, ele) => {
    let div, input, arr, small, mini, span, fnkey, keyadd, keydel, a, kdiv
    div = document.createElement('div')
    div.className = 'row'
    arr = Object.keys(obj)
    for (let index = 0; index < list.length; index++) {
        small = document.createElement('div')
        small.className = 'small'
        mini = document.createElement('div')
        span = document.createElement('span')
        span.innerHTML = list[index] + ':'
        mini.appendChild(span)
        small.appendChild(mini)
        mini = document.createElement('div')
        input = document.createElement('input')
        input.type = 'text'
        input.id = arr[index]
        mini.appendChild(input)
        small.appendChild(mini)
        div.appendChild(small)
    }
    fnkey = document.createElement('div')
    fnkey.className = 'fnkey'
    keyadd = document.createElement('div')
    keyadd.className = 'key add'
    a = document.createElement('a')
    a.innerHTML = '✚'
    keyadd.appendChild(a)
    fnkey.appendChild(keyadd)
    kdiv = document.createElement('div')
    fnkey.appendChild(kdiv)
    keydel = document.createElement('div')
    keydel.className = 'key del'
    a = document.createElement('a')
    a.innerHTML = '━'
    keydel.appendChild(a)
    fnkey.appendChild(keydel)
    div.appendChild(fnkey)
    ele.after(div)
}

//删除商品信息列表
const delProduct = (ele) => {
    if (document.querySelectorAll('.row').length != 1) {
        ele.remove()
    } else {
        console.log('至少要保留一个商品，不可以删除完。')
    }
}

// 非空校验
const notEmptyCheck = () => {
    var ele, flag = true, i = 1
    var arr = Object.keys(_product)
    do {
        for (let index = 0; index < arr.length; index++) {
            ele = document.querySelector('.row:nth-child(' + i + ') #' + arr[index]).value
            if (ele == null || ele == "") {
                document.querySelector('.row:nth-child(' + i + ') #' + arr[index]).style.border = '1px solid red'
                flag = false
            } else {
                document.querySelector('.row:nth-child(' + i + ') #' + arr[index]).style.border = 'none'
                document.querySelector('.row:nth-child(' + i + ') #' + arr[index]).style['border-bottom'] = '1px solid grey'
            }
        }
        i++
    } while (i <= document.querySelectorAll('#list .row').length);
    return flag
}

//获取单行商品信息列表的值，返回一个json对象
const getValue = (index) => {
    var product = JSON.parse(JSON.stringify(_product));
    var array = document.querySelectorAll('#list .row');
    product.pName = array[index].querySelector('#pName').value;
    product.startDate = array[index].querySelector('#startDate').value;
    product.startPrice = array[index].querySelector('#startPrice').value;
    product.endDate = array[index].querySelector('#endDate').value;
    product.endPrice = array[index].querySelector('#endPrice').value;
    product.volatility = array[index].querySelector('#volatility').value;
    product.PR = array[index].querySelector('#PR').value;
    return product;
}

//获取所有商品列表信息行的值，返回一个json对象
const getData = () => {
    var obj = {}
    var array = document.querySelectorAll('#list .row')
    for (let index = 0; index < array.length; index++) {
        if (array[index].querySelector('#pName').value != "") {
            var pName = array[index].querySelector('#pName').value
            obj[pName] = getValue(index)
        } else { return obj }
    }
    return obj;
}

const createSpan = (text, ele = '#content') => {
    eleObj = document.querySelector(ele)
    var div = document.createElement('div')
    var p = document.createElement('p')
    p.innerHTML = text
    div.appendChild(p)
    eleObj.appendChild(div)
}

const newLine = (array) => {
    for (let index = 0; index < array.length; index++) {
        createSpan(array[index])
    }
}
$(function () {
    $('#Action').on('click', function () {
        if ($('.row').length == 0) {
            productList(_product);
        }
        $('.product').show()
        $('.welcome').hide()
    });
    $('#list').delegate('.add', 'click', function () {
        // $(this).parent() 此#add元素的父级元素
        // console.log($(this).parent().parent())
        addElement(_product, $(this).parent().parent())
    });
    $('#list').delegate('.del', 'click', function () {
        delProduct($(this).parent().parent())
    });
    $('.submit').on('click', function () {
        if (notEmptyCheck()) {
            var db = getData()
            //接口请求模式
            $.post("/gehuaservice", { data: JSON.stringify(db) }, function (result) {
                $('#content').empty()
                $('.prompt').show()
                newLine(result)
                document.querySelector('.prompt').style.display = 'block'
                document.querySelector('#fade').style.display = 'block'
            });

            //本地模式
            // var arr = Object.keys(db)
            // var val = []
            // //遍历每条记录，调用calculate函数的规则对其进行判断买还是卖
            // for (let index = 0; index < arr.length; index++) {
            //     if (calculate(db[arr[index]]) > 10) {
            //         val.push(arr[index] + ': 买')
            //     } else {
            //         val.push(arr[index] + ': 卖')
            //     }
            // }
            // $('#content').empty()
            // $('.prompt').show()
            // newLine(val)
            // document.querySelector('.prompt').style.display = 'block'
            // document.querySelector('#fade').style.display = 'block'
        }
    });
    $('.close').on('click', function () {
        $('.prompt').hide()
        $('#fade').hide()
        $('#content').empty()
    })
});