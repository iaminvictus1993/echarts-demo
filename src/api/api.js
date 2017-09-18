import moment from 'moment'
export default {
	getLineStackData( nowTime ) {
		const lineStackData = {
			income: [],
			available: [],
			overtop:[]	
		};
		for(var i = 0; i < 10; i++) {
			lineStackData.income.push([moment(nowTime-(9-i)*1000).format('YYYY-MM-DD HH:mm:ss'), Math.floor(Math.random()*200)]);
			lineStackData.available.push([moment(nowTime-(9-i)*1000).format('YYYY-MM-DD HH:mm:ss'), Math.floor(Math.random()*200)]);
			lineStackData.overtop.push([moment(nowTime-(9-i)*1000).format('YYYY-MM-DD HH:mm:ss'), Math.floor(Math.random()*200)]);
		}
		return lineStackData;
	} 
}