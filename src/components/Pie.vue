<template>
    <div>
        <!-- <div class="commonTitle setMargin">各渠道总额占比分析</div> -->
        <el-button id="commonBgColor" class="setMargin" type="info" size="large" :plain="true">各渠道<br/>总额占比分析</el-button>
        <div :id="idName" :style="{height: '270px'}">
        </div>
    </div>
</template>

<script>
import echarts from 'echarts'

export default {
  name: 'Pie',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  props: {
    idName: String,
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
    const pie = echarts.init(document.getElementById(this.idName));
    const option = {
        // title : {
        //     text: '某站点用户访问来源',
        //     subtext: '纯属虚构',
        //     x:'center'
        // },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c}%"
        },
        // legend: {
        //     orient: 'vertical',
        //     left: 'left',
        //     data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
        // },
        series : [
            {
                name: this.obj.name,
                type: 'pie',
                radius : '55%',
                // center: ['50%', '60%'],
                data: this.obj.data,
                itemStyle: {
                    normal:{
                        label:{
                            show:true,
                            align: 'center',
                            formatter: '     {d}%      \n{b}'
                            // formatter(params) {
                            //     console.log(params);

                            // }
                        },
                        labelLine:{
                            show:true
                        }
                    },
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ],
        //配置饼状图颜色
        color:['#3893e2','#87c2f5','aqua','#266296'],
    };

    pie.setOption( option );
  }
}
</script>

<style scoped>
    .setMargin {
        margin-bottom: 10%;
    }
</style>
