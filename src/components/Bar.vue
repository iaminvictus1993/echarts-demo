<template>
    <div>
        <!-- <div class="commonTitle">各分行机构交易总额占比分析</div> -->
          <el-button id="commonBgColor" type="info" size="large" :plain="true">各分行机构<br/>交易总额占比分析</el-button>
        <div id="bar" :style="{ height: '300px'}">
        </div>
    </div>
</template>

<script>
import echarts from 'echarts'

export default {
  name: 'Bar',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
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
    const bar = echarts.init(document.getElementById('bar'));
    const option = {
        // title: {
        //     text: '世界人口总量',
        //     subtext: '数据来自网络'
        // },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            formatter: '{b}<br/>{a}:{c}%'
        },
        // legend: {
        //     data: ['2011年', '2012年']
        // },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true,
            show: true,
            borderWidth:0,
            backgroundColor: 'transparent'
        },
        xAxis: {
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
            boundaryGap: [0, 0.05],
            axisLabel: {
                formatter(value) {
                        return value + '%'
                }
            }
        },

        yAxis: {
            type: 'category',
            axisLine: {
                lineStyle: {
                    type: 'dashed',
                    color: 'aqua'
                }
            },            
            data: ['天津分行','武汉分行','上海分行','成都分行','无锡分行','北京分行']
        },
        series: [
            {
                name: '交易总额占比',
                type: 'bar',
                data: [10, 25, 25, 13, 17, 10],
                label: {
                    normal: {
                        show: true,
                        position: 'right',
                        formatter: '{c}%'
                    }
                }
            }
        ],
        color: ['aqua']
    };

    bar.setOption( option );
  }
}
</script>

<style scoped>
</style>
