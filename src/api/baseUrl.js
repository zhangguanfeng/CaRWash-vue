//1.定义所有环境服务器地址
const server = {
	pro: "https://n2h-plus.centralus.cloudapp.azure.com",//生产环境
	dev: "https://n2h-plus-dev.centralus.cloudapp.azure.com",//测试环境
	util: "",//其他环境，可以为空，为空则适配到测试环境
}
//2.获取当前访问域名，并根据域名判断当前环境，然后获取指定环境的服务器地址
var DOMIN = "";//服务端接口访问跟路径
const origin = location.hostname//当前访问域名
for (var i in server) {
	var item = server[i]
	if (item.indexOf(origin) > -1) {
		DOMIN = item
	}
}
//3. 特殊情况处理，如果没有在server变量中匹配到具体环境，则依次读取util、dev
if (!DOMIN) DOMIN = "/api"
export default {
	DOMIN
}
