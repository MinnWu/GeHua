var list = ['名称', '价值结构', '合约', '起始日期', '初始价格', '结束日期', '末期价格', '波动幅度', '波动率', '完成进度', '发现价值交易机会结构', '单位溢价金额', '溢价率', '隐含波动率']
var _product = {
    'pName': '',     //商品名称
    'VC': '',   //价值结构
    'contract': '',      //合约
    'startDate': '',     //起始日期
    'startPrice': '',     //初始价格
    'endDate': '',       //结束日期
    'endPrice': '',  //末期价格
    'FR': '',  //波动幅度
    'volatility': '',    //波动率
    'schedule': '',      //进度
    'DVTOS': '',     //发现价值交易机会结构
    'UPA': '',   //单位溢价金额
    'PR': '',    //溢价率
    'IV': ''     //隐含波动率
}

//初始化生成10行商品信息列表
const initProduct = (num = 10) => {
    for (let index = 0; index < num; index++) {
        productList(_product)
    }
}

//生成商品信息列表
const productList = (obj, divele = 'list') => {
    let div, input, arr, add, del, eleObj

    eleObj = document.getElementById(divele)
    div = document.createElement('div')
    div.className = 'row'
    arr = Object.keys(obj)
    for (let index = 0; index < list.length; index++) {
        input = document.createElement('input')
        input.type = 'text'
        input.placeholder = list[index]
        input.id = arr[index]
        div.appendChild(input)
    }
    add = document.createElement('input')
    add.className = 'button'
    add.type = 'button'
    add.id = 'add'
    add.value = '增加'
    div.appendChild(add)
    del = document.createElement('input')
    del.className = 'button'
    del.type = 'button'
    del.id = 'del'
    del.value = '删除'
    div.appendChild(del)
    eleObj.appendChild(div)
}

//增加商品信息列表
const addElement = (obj, ele) => {
    let div, input, arr, add, del, targetElement, parent
    targetElement = document.getElementById('add').parentNode
    parent = targetElement.parentNode
    div = document.createElement('div')
    div.className = 'row'
    arr = Object.keys(obj)
    for (let index = 0; index < list.length; index++) {
        input = document.createElement('input')
        input.type = 'text'
        input.placeholder = list[index]
        input.id = arr[index]
        div.appendChild(input)
    }
    add = document.createElement('input')
    add.className = 'button'
    add.type = 'button'
    add.id = 'add'
    add.value = '增加'
    div.appendChild(add)
    del = document.createElement('input')
    del.className = 'button'
    del.type = 'button'
    del.id = 'del'
    del.value = '删除'
    div.appendChild(del)
    ele.after(div)
}

//删除商品信息列表
const delProduct = (ele) => {
    if (document.querySelectorAll('#del').length != 1) {
        ele.remove()
    } else {
        console.log('至少要保留一个商品，不可以删除完。')
    }
}

//获取单行商品信息列表的值，返回一个json对象
const getValue = (index) => {
    var product = JSON.parse(JSON.stringify(_product));
    var array = document.querySelectorAll('#list div');
    product.pName = array[index].querySelector('#pName').value;
    product.VC = array[index].querySelector('#VC').value;
    product.contract = array[index].querySelector('#contract').value;
    product.startDate = array[index].querySelector('#startDate').value;
    product.startPrice = array[index].querySelector('#startPrice').value;
    product.endDate = array[index].querySelector('#endDate').value;
    product.endPrice = array[index].querySelector('#endPrice').value;
    product.FR = array[index].querySelector('#FR').value;
    product.volatility = array[index].querySelector('#volatility').value;
    product.schedule = array[index].querySelector('#schedule').value;
    product.DVTOS = array[index].querySelector('#DVTOS').value;
    product.UPA = array[index].querySelector('#UPA').value;
    product.PR = array[index].querySelector('#PR').value;
    product.IV = array[index].querySelector('#IV').value;
    return product;
}

//获取所有商品列表信息行的值，返回一个json对象
const getData = () => {
    var obj = {}
    var array = document.querySelectorAll('#list div')
    for (let index = 0; index < array.length; index++) {
        if (array[index].querySelector('#pName').value != "") {
            var pName = array[index].querySelector('#pName').value
            obj[pName] = getValue(index)
        } else { return obj }
    }
    return obj;
}

const createSpan = (text, ele = 'prompt') => {
    eleObj = document.getElementById(ele)
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
/**接口数据格式
{
    "吴明雄": {
        "pName": "吴明雄",
        "VC": "10",
        "contract": "合约1",
        "startDate": "20100202",
        "startPrice": "30",
        "endDate": "20100203",
        "endPrice": "33",
        "FR": "15",
        "volatility": "10",
        "schedule": "20",
        "DVTOS": "10",
        "UPA": "10",
        "PR": "5",
        "IV": "10"
    },
    "吴明雄2": {
        "pName": "吴明雄2",
        "VC": "10",
        "contract": "合约2",
        "startDate": "20120203",
        "startPrice": "5",
        "endDate": "20120204",
        "endPrice": "4",
        "FR": "15",
        "volatility": "10",
        "schedule": "11",
        "DVTOS": "11",
        "UPA": "11",
        "PR": "11",
        "IV": "11"
    }
}
 */
$(function () {
    $('#Action').on('click', function () {
        if ($('.row').length == 0) {
            initProduct();
        }
        $('.product').show()
        $('.welcome').hide()
    });
    $('div #add').on('click', function () {
        if ($('.row').length == 0) {
            initProduct();
        }
        $('.product').show()
    });
    $('#list').delegate('#add', 'click', function () {
        // $(this).parent() 此#add元素的父级元素
        addElement(_product, $(this).parent())
    });
    $('#list').delegate('#del', 'click', function () {
        delProduct($(this).parent())
    });
    $('#submit').on('click', function () {
        var db = getData()
        if (JSON.stringify(db) == "{}") {
            console.log('空数据不能提交')
        } else {
            //接口请求模式
            $.post("/gehuaservice", { data: JSON.stringify(db) }, function (result) {
                $('#prompt').empty()
                $('#prompt').show()
                newLine(result)
            });
            //本地模式 
            //计算规则
            // const calculate = (obj) => {
            //     return Number(obj.startPrice) + Number(obj.endPrice)
            // }
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
            // $('#prompt').empty()
            // $('#prompt').show()
            // newLine(val)
        }
    });
});