<template>
  <div>
<!--     <div class="commonTitle" id="setHeight">当日来款TOP10(交易对手)</div> -->
          <el-button id="commonBgColor" type="info" :size="large" :plain="true">当日来款<br/>TOP10(交易对手)</el-button>
    <div id="map" :style="{height: '700px'}">
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import chinaJson from '../assets/map/china.json'

export default {
  name: 'ChinaMap',
  data () {
    return {
    }
  },
  mounted() {
    const map = echarts.init(document.getElementById('map'));
    echarts.registerMap('china', chinaJson);
    // const mapObj = echarts.getMap('china');
    //TODO 生成坐标数据
    const geoCoordMap = {
        '重庆': [107.7539,30.1904],
        '拉萨': [91.1865,30.1465],
        '南宁': [108.479,23.1152],
        '广州': [113.5107,23.2196],
        '南昌': [116.0046,28.6633],
        '上海': [121.4648,31.2891],   
        '包头': [110.3467,41.4899],
        '天津': [117.4219,39.4189],
        '大连': [122.2229,39.4409],
        '北京': [116.4551,40.2539],
        '长春': [125.8154,44.2584],

        '重庆银行': [107.7539,30.1904],
        '拉萨银行': [91.1865,30.1465],
        '南宁银行': [108.479,23.1152],
        '广州银行': [113.5107,23.2196],
        '南昌银行': [116.0046,28.6633],
        '上海银行': [121.4648,31.2891],   
        '包头银行': [110.3467,41.4899],
        '天津银行': [117.4219,39.4189],
        '大连银行': [122.2229,39.4409],
        '总行': [116.4551,40.2539],
        '长春银行': [125.8154,44.2584]
    };

    const BJData = [
        [{name:'总行'}, {name:'总行',value:100}],
        [{name:'总行'}, {name:'重庆银行',value:95}],
        [{name:'总行'}, {name:'拉萨银行',value:90}],
        [{name:'总行'}, {name:'南宁银行',value:80}],
        [{name:'总行'}, {name:'广州银行',value:70}],
        [{name:'总行'}, {name:'南昌银行',value:60}],
        [{name:'总行'}, {name:'上海银行',value:50}],
        [{name:'总行'}, {name:'包头银行',value:40}],
        [{name:'总行'}, {name:'天津银行',value:30}],
        [{name:'总行'}, {name:'大连银行',value:20}],
        [{name:'总行'}, {name:'长春银行',value:10}]
    ];

    // const planePath = '';

    var convertData = function (data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
            var dataItem = data[i];
            var fromCoord = geoCoordMap[dataItem[0].name];
            var toCoord = geoCoordMap[dataItem[1].name];
            if (fromCoord && toCoord) {
                res.push({
                    fromName: dataItem[0].name,
                    toName: dataItem[1].name,
                    coords: [fromCoord, toCoord]
                });
            }
        }
        return res;
    };

    var color = ['aqua', '#ffa022', '#46bee9'];
    var series = [];
    [['北京', BJData]].forEach(function (item, i) {
        series.push({
            name: item[0] + ' Top10',
            type: 'lines',
            zlevel: 1,
            // effect: {
            //     show: true,
            //     period: 6,
            //     trailLength: 0.7,
            //     color: '#fff',
            //     symbolSize: 3
            // },
            lineStyle: {
                normal: {
                    color: color[i],
                    width: 0,
                    curveness: 0.2
                }
            },
            data: convertData(item[1])
        },
        {
            name: item[0] + ' Top10',
            type: 'lines',
            zlevel: 2,
            // symbol: ['none', 'arrow'],
            symbolSize: 10,
            // effect: {
            //     show: true,
            //     period: 6,
            //     trailLength: 0,
            //     symbol: planePath,
            //     symbolSize: 15
            // },
            lineStyle: {
                normal: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0, color: 'yellow' // 0% 处的颜色
                        }, {
                            offset: 1, color: 'aqua' // 100% 处的颜色
                        }],
                        globalCoord: false // 缺省为 false
                    },
                    width: 1,
                    opacity: 0.6,
                    curveness: 0.2
                }
            },           
            data: convertData(item[1])
        },
        {
            name: item[0] + ' Top10',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            zlevel: 2,
            rippleEffect: {
                brushType: 'stroke'
            },
            label: {
                normal: {
                    show: true,
                    position: 'right',
                    // fontSize: 8,
                    // rotate:-45,
                    formatter: '{b}'
                }
            },
            symbolSize: function (val) {
                return val[2] === 100 ? 4 : 2;
            },
            itemStyle: {
                normal: {
                    // color: color[i]
                    color: (params) => {
                        return params.name == '总行' ? 'yellow' : color[i];
                    }
                }
            },
            data: item[1].map(function (dataItem) {
                return {
                    name: dataItem[1].name,
                    value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
                };
            })
        });
    });
    const option = {
        // backgroundColor: 'red',
        // title : {
        //     text: '模拟迁徙',
        //     subtext: '数据纯属虚构',
        //     left: 'center',
        //     textStyle : {
        //         color: '#fff'
        //     }
        // },
        // tooltip : {
        //     trigger: 'item'
        // },
        // legend: {
        //     orient: 'vertical',
        //     top: 'bottom',
        //     left: 'right',
        //     data:['北京 Top10', '上海 Top10', '广州 Top10'],
        //     textStyle: {
        //         color: '#fff'
        //     },
        //     selectedMode: 'single'
        // },
        geo: {
            map: 'china',
            label: {
                emphasis: {
                    show: false
                }
            },
            // 南海诸岛没数据，暂时不显示
            regions: [{name: '南海诸岛', value: 0, itemStyle: {normal: {opacity: 0, label: {show: false}}}}],
            // 禁止鼠标缩放
            roam: false,
            itemStyle: {
                normal: {
                    areaColor: '#073c77',
                    borderColor: 'aqua'
                },
                emphasis: {
                    areaColor: '#2a333d'
                }
            }
        },
        series: series
    };

    map.setOption( option );
  }
}
</script>

<style lang="less" scoped>
    #setHeight {
        height: 100px;
    }
    #map{
        font-size: 12px;
    }
</style>
