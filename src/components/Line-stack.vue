<template>
    <div>
        <!-- <div class="commonTitle">实时头寸余额及账户余额监控</div> -->
          <el-button id="commonBgColor" type="info" :size="large" :plain="true">实时头寸余额<br/>及账户余额监控</el-button>
        <div id="line" :style="{height: '300px'}">
        </div>
    </div>
</template>

<script>
import echarts from 'echarts'

export default {

  name: 'Line-stack',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      instance: ''
    }
  },
  props: {
    obj: {
        type: Object
    }
  },
  // computed: {
  //   obj1:{
  //       get() {
  //         return this.obj
  //       },
  //       set(newValue) {
  //         this.obj1 = newValue
  //       }
  //   }
  // },
  watch: {
    obj(){
        let option = this.instance.getOption();
        option.series[0].data = this.obj.income;
        option.series[1].data = this.obj.available;
        option.series[2].data = this.obj.overtop;
        this.instance.setOption(option);
    }
  },
  created() {
    this.obj1 = this.obj;

  },
  mounted() {
    const self = this;
    console.log(this.obj.income)
    const line = echarts.init(document.getElementById('line'));
    this.instance = line;
    const option = {
        // title: {
        //     text: '折线图堆叠'
        // },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            show:true,
            orient:'horizontal',
            // borderColor:'#df3434',
            // borderWidth:2,
            textStyle: {
                color:'aqua',
            },
            right: 20,
            top: 30,
            icon: 'pie',
            itemHeight: 6,  //icon高度
            data:['净收入','可用资金','实时超备账户余额']
        },
        grid: {
            left: '3%',
            right: '7%',
            bottom: '3%',
            containLabel: true,
            show: true,
            borderWidth: 0,
            //网格的边框颜色,前提是show: true
            backgroundColor: 'transparent' 
        },
        // toolbox: {
        //     feature: {
        //         saveAsImage: {}
        //     }
        // },
        xAxis: {
            splitLine: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    type: 'dashed',
                    color: 'aqua'
                }
            },
            type: 'time',
            boundaryGap: ['50%', '100%']
            // data: ['周一','周二','周三','周四','周五','周六','周日']
        },
        yAxis: {
            type: 'value',
            splitLine: {
                show: false
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
        },
        series: [
            {
                name:'净收入',
                type:'line',
                // stack: '总量',
                data:self.obj.income
            },
            {
                name:'可用资金',
                type:'line',
                // stack: '总量',
                data:self.obj.available
            },
            {
                name:'实时超备账户余额',
                type:'line',
                // stack: '总量',
                data:self.obj.overtop
            }
        ],
         color:['green','yellow','blue']
    };
    line.setOption(option);
  }
}
</script>

<style scoped>
</style>
