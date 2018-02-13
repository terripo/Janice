const axios = require('axios')
const qs = require('qs')
// 获取token，修改密码后token需要重新获取
// request('http://api.51ym.me/UserInterface.aspx?action=login&username=janice_123&password=Qwer1234',(err, res, body)=>{
// 	if(!err && res.statusCode == 200){
// 		console.log(body);
// 	}
// })


let token = '00380927da455e6d6a9432acc80c24f08e4562b6'
let itemid = 14375  //官方‘熊猫’项目 短信0.1元/条
let country = 1  //1为中国 下面的0为不限制
let province = 0 //省份
let city = 0   //城市
let isp = 0   //运营商代码
let mobile = ''  //指定要获取的手机号
let excludeno = '170_171'  //排除手机字段
let getPhoneURL = `http://api.51ym.me/appapi.aspx?actionid=getmobile&token=${token}&itemid=${itemid}&province=${province}&city=${city}&isp=${isp}&mobile=${mobile}&excludeno=${excludeno}&`

let ok_num = ''
axios.get(getPhoneURL,{responseType:'json'})
	.then((res)=>{
		if(res.data.error.errcode == 0){
			return Promise.resolve(res.data.data.model)
		}
	})
	.then((num)=>{
		let checkMeiTuanURL = 'https://activity.waimai.meituan.com/coupon/user/isNewUser'
		let data = {userPhone: num}
		ok_num = num
		return axios({
		    method: 'post',
		    url: checkMeiTuanURL,
		    data: qs.stringify(data),
		    headers:{
        		'Content-type': 'application/x-www-form-urlencoded'
    		}
		})
	})
	.then((res)=>{
		if(res.data.data == false){
			console.log(ok_num);
		}else{
			console.log(ok_num,222);
		}
	})
	


