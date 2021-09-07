var list = [
	'Please enter contract name.(合约名称)',
	'Please enter GeHua trend.(格华趋势)',
	'Please enter time to level.(时机级别)',
	'Please enter action time.(行动时机)',
	'Please enter GeHua priority.(格华优选)',
	'Positions in management.(仓位管理)',
	'Please enter risk management.(风险控制)',
	'Please enter profit target.(盈利目标)'
]
var contract = {
	'name': '合约名称',
	'trend': '格华趋势',
	'level': '时机级别',
	'action': '行动时机',
	'priority': '优先级',
	'Positions': '仓位管理',
	'risk': '风险控制',
	'profit': '盈利目标'
}

const productList = (ele) => {
	let div, input, eleObj, small, mini, span, key, add, del, kdiv
	div = document.createElement('div')
	div.className = 'row'
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
		input.id = Object.keys(contract)[index]
		mini.appendChild(input)
		small.appendChild(mini)
		div.appendChild(small)
	}
	key = document.createElement('div')
	key.className = 'key'
	add = document.createElement('div')
	add.className = 'add'
	key.appendChild(add)
	kdiv = document.createElement('div')
	key.appendChild(kdiv)
	del = document.createElement('div')
	del.className = 'del'
	key.appendChild(del)
	div.appendChild(key)
	if (ele = '.list') {
		eleObj = document.querySelector(ele)
		eleObj.appendChild(div)
	} else {
		ele.after(div)
	}
}

//生成商品信息列表
const createProductList = (divele = 'list') => {
	let div, input, eleObj, small, mini, span, key, add, del, kdiv
	eleObj = document.getElementById(divele)
	div = document.createElement('div')
	div.className = 'row'
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
		input.id = Object.keys(contract)[index]
		mini.appendChild(input)
		small.appendChild(mini)
		div.appendChild(small)
	}
	key = document.createElement('div')
	key.className = 'key'
	add = document.createElement('div')
	add.className = 'add'
	key.appendChild(add)
	kdiv = document.createElement('div')
	key.appendChild(kdiv)
	del = document.createElement('div')
	del.className = 'del'
	key.appendChild(del)
	div.appendChild(key)
	eleObj.appendChild(div)
}

//增加商品信息列表
const addProductList = (ele) => {
	let div, input, small, mini, span, key, add, del, kdiv
	div = document.createElement('div')
	div.className = 'row'
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
		input.id = Object.keys(contract)[index]
		mini.appendChild(input)
		small.appendChild(mini)
		div.appendChild(small)
	}
	key = document.createElement('div')
	key.className = 'key'
	add = document.createElement('div')
	add.className = 'add'
	key.appendChild(add)
	kdiv = document.createElement('div')
	key.appendChild(kdiv)
	del = document.createElement('div')
	del.className = 'del'
	key.appendChild(del)
	div.appendChild(key)
	ele.after(div)
}

//删除商品信息列表
const delProductList = (ele) => {
	if (document.querySelectorAll('.row').length != 1) {
		ele.remove()
	} else {
		console.log('至少要保留一个商品，不可以删除完。')
	}
}

// 非空校验
const notEmptyCheck = () => {
	var ele, flag = true,
		i = 1,
		arr = Object.keys(contract)
	do {
		for (let index = 0; index < arr.length; index++) {
			ele = document.querySelector('.row:nth-child(' + i + ') #' + arr[index]).value
			if (ele == null || ele == "") {
				document.querySelector('.row:nth-child(' + i + ') #' + arr[index]).style.border = '1px solid red'
				flag = false
			} else {
				document.querySelector('.row:nth-child(' + i + ') #' + arr[index]).style.border = 'none'
				document.querySelector('.row:nth-child(' + i + ') #' + arr[index]).style['border-bottom'] =
					'1px solid grey'
			}
		}
		i++
	} while (i <= document.querySelectorAll('.list .row').length);
	return flag
}

//获取商品信息列表的值，返回一个json对象
const getData = () => {
	var val, obj = {},
		i = 1,
		arr = Object.keys(contract)
	do {
		var objrow = {}
		for (let index = 0; index < arr.length; index++) {
			val = document.querySelector('.row:nth-child(' + i + ') #' + arr[index]).value
			if (index >= 5) {
				val = val + '%'
			}
			objrow[arr[index]] = val
		}
		var name = document.querySelector('.row:nth-child(' + i + ') #name').value
		obj[name] = objrow
		i++
	} while (i <= document.querySelectorAll('.list .row').length);
	return obj
}

//创建产品列表
const createPorductTable = (obj, ele = '.productTable') => {
	var eleObj, table, thead, tbody, tr, th, td, arr = Object.keys(contract),
		array = Object.keys(obj)
	eleObj = document.querySelector(ele)
	table = document.createElement('table')
	thead = table.createTHead()
	tbody = table.createTBody()
	tr = document.createElement("tr");
	for (let index = 0; index < 5; index++) {
		th = document.createElement("th")
		th.innerHTML = contract[arr[index]]
		tr.appendChild(th)
	}
	thead.appendChild(tr)
	for (let index = 0; index < array.length; index++) {
		var tr = document.createElement("tr")
		for (var j = 0; j < 5; j++) {
			td = document.createElement("td")
			td.innerHTML = obj[array[index]][arr[j]]
			tr.appendChild(td)
		}
		tbody.appendChild(tr)
	}
	eleObj.appendChild(table)
}

//创建详情列表
const createDetailTable = (obj) => {
	document.querySelector('.detailTable #name').innerHTML = obj['name']
	document.querySelector('.detailTable #Positions').innerHTML = obj['Positions']
	document.querySelector('.detailTable #risk').innerHTML = obj['risk']
	document.querySelector('.detailTable #profit').innerHTML = obj['profit']
}
