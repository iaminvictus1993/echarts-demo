<template>
    <div>
        <!-- <div class="commonTitle">实时交易流量控制</div> -->
                <el-button id="commonBgColor" type="info" size="large" :plain="true">各渠道<br/>总额占比分析</el-button>
        <div id="barStack" :style="{ height: '300px'}">
        </div>        
    </div>

</template>

<script>
import echarts from 'echarts'

export default {
  name: 'Bar-stack',
  data () {
    return {
      msg: 'Welcome to You`r Vue.js App'
    }
  },
  props: {
    obj: {
        type: Object,
        default() {
            return {
                name: '各渠道总额占比分析',
                data:[
                    {value:7, name:'超级网银'},
                    {value:12, name:'同城票系统'},
                    {value:19, name:'小额支付系统'},          
                    {value:62, name:'大额支付系统'}
                ]
            }
        }
    }
  },
  mounted() {
    const barStack = echarts.init(document.getElementById('barStack'));
    const option = {
        tooltip : {
            trigger: 'axis'
        },
        legend: {
            show:true,
            orient:'horizontal',
            right: 0,
            top: 30,
            icon: 'pie',
            textStyle: {
                color:'aqua',
            },
            itemHeight: 6,  //icon高度
            data:['流入','流出']
        },
        // toolbox: {
        //     show : true,
        //     feature : {
        //         dataView : {show: true, readOnly: false},
        //         magicType : {show: true, type: ['line', 'bar']},
        //         restore : {show: true},
        //         saveAsImage : {show: true}
        //     }
        // },
        calculable : true,
        xAxis : [
            {
                type : 'category',
                axisLine: {
                    lineStyle: {
                        type: 'dashed',
                        color: 'aqua'
                    }
                },
                splitLine: {
                    show: false
                },
                data:function() {
                    let arr = [];
                    for(let i = 0; i <= 30; i++ ) {
                        arr.push('9:'+(i<10?'0'+i:i));
                    }
                    return arr;
                }()
            }
        ],
        yAxis : [
            {
                type : 'value',
                splitLine: {
                    show: true,
                    lineStyle: {
                        type: 'dashed',
                        color: 'aqua'
                    }
                },
                axisLine: {
                    lineStyle: {
                        type: 'dashed',
                        color: 'aqua'
                    }
                },
                axisLabel: {                   
                    formatter(value, index) {           
                        return value !== 0 ? value.toFixed(3) : value;
                    }                
                }
            }
        ],
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true,
            show: true,
            //网格的边框颜色,前提是show: true
            backgroundColor: 'transparent' 
        },
        series : [
            {
                name:'流入',
                type:'bar',
                stack: '交易流量监控',
                data:(()=> {
                    let arr = [];
                    for(let i = 0; i <= 30; i++ ) {
                        arr.push(Math.floor(Math.random()*200));
                    }
                    return arr;                               
                })()
            },
            {
                name:'流出',
                type:'bar',
                stack: '交易流量监控',
                data:(()=> {
                    let arr = [];
                    for(let i = 0; i <= 30; i++ ) {
                        arr.push(Math.floor(Math.random()*-200));
                    }
                    return arr;                               
                })()
            }
        ],
        color:['aqua','#295984']
    };


    barStack.setOption( option );
  }
}
</script>

<style scoped>
</style>
