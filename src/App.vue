<template>
  <div id="app">
    <div class="header">
      <div class="title">资金头寸监控平台</div>
      <div>Capital Position Monitoring Platform</div>
      <div>{{date}}</div>
    </div>

    <el-row :gutter="10">
      <draggable :options="{draggable1:'.draggableItem',group:'col'}">

        <!-- 第一列 -->

        <el-col :span="7" class="draggableItem">
                                      <draggable :options="{group:'chart'}">
          <div>
            <el-button id="commonBgColor" type="info" size="large" :plain="true">指标总览
            </el-button>
            <div :style="{ height: '300px'}" class="container">
              <div v-for="item in items" class="item">
                <div class="innerCon">
                  <div class="num">{{item[0].toFixed(2) + '亿'}}</div>
                  <div>{{item[1]}}</div>                
                </div>
              </div>
            </div>          
          </div>
            <BarStack></BarStack> 
            <LineStack :obj="LineStackData"></LineStack>    
                                      </draggable>     
        </el-col>

        <!-- 第二列 -->

        <el-col :span="10" class="draggableItem">
            <el-row>  
              <el-col :span="24">
                <ChinaMap></ChinaMap>
              </el-col>   
            </el-row> 
            <el-row >  
                                      
              <el-col :span="12">
                <Pie idName='a'></Pie>
              </el-col>              
              <el-col :span="12">
                <Pie idName='b' :obj="pieObj"></Pie>
              </el-col> 
            </el-row>   
        </el-col>

        <!-- 第三列 -->

        <el-col :span="7" class="draggableItem">
          <draggable :options="{group:'chart'}" @end="onEnd">
            <List :type="2"></List> 
            <List :type="1"></List> 
            <Bar></Bar>
          </draggable>
        </el-col>

      </draggable >
    </el-row>

  </div>
</template>

<script>
import Pie from './components/Pie'
import LineStack from './components/Line-stack'
import BarStack from './components/Bar-stack'
import Bar from './components/Bar'
import ChinaMap from './components/ChinaMap'
import List from './components/List'
import moment from 'moment'
import api from './api/api.js'
import draggable from 'vuedraggable'
export default {
  name: 'app',
  data(){
    return {
      date: moment().format('YYYY-MM-DD HH:mm:ss'),
      items: [[4.81,'实时超备'],[4.81,'可用资金'],[14.81,'预测超备'],[10.00,'目标超备'],],
      LineStackData: api.getLineStackData((new Date()).getTime()),
      pieObj:{
          name: '各业务类型交易总额占比分析',
          type: 2,
          data:[
              {value:21, name:this.idName||'同业业务'},
              {value:31, name:'贷款'},
              {value:22, name:'存款'},          
              {value:6, name:'买入返售'},          
              {value:9, name:'卖出回购'},          
              {value:11, name:'其它'}
          ]
      }
    }
  },
  methods:{
    onEnd(e){
      console.log(e);
    }
  },
  created(){
    setInterval(() => {
      var nowTime = new Date();
      this.date = moment(nowTime).format('YYYY-MM-DD HH:mm:ss');
      this.LineStackData = api.getLineStackData(nowTime.getTime());
    }, 1000) 
  },
  components: {
    Pie,
    LineStack,
    Bar,
    BarStack,
    ChinaMap,
    List,
    draggable
  }
}
</script>

<style lang="less">
  #commonBgColor {
    background-color: transparent;
    color: aqua;
    border-color:aqua;
    position: relative;
    font-size: 20px;
    height: 60px;
    // bottom: 20px;
    margin: 20px 0;
    &:hover {
      color: aqua;
      border-color: aqua;
      cursor: auto;
    }
  }
  #app {
    background: radial-gradient(blue, black);
    color: aqua;
    padding: 25px;
    .header {
      width: 100%;
      margin: 0 auto;
      text-align: center;
      .title {
        font-size: 40px;
        font-weight: 600;
      }
    }
    // .commonTitle {
    //   background-color: transparent;
    //   height: 50px;
    //   text-align: center;
    //   font-size: 20px;
    //   border: 2px dotted aqua;
    //   border-radius: 30%;
    //   width: 30%;
    // }
    .commonTitle1 {
      position: absolute;
      background-color: transparent;
      // width: 30%;
      top: -60px;
      height: 50px;
      // line-height: 50px;
      // text-align: center;
      font-size: 20px;
      border: 2px dotted aqua;
      border-radius: 30%;
      width: 10%;
      // .item {
      //   position: absolute;
      //   transform:translate(-30%,40%);
      // }
    }
    .container {
      display: flex;
      flex-wrap: wrap;
      position: relative;
      left: 10%;
      .item {
        width: 45%;
        background-color: transparent;
        border: 1px solid aqua;
        margin-right: 10px;
        margin-bottom: 10px;
        /*margin: auto 0;*/
        text-align: center;
        .innerCon {
          transform:translate(0,70%);
          .num {
            font-size: 25px;
          }
        }
      }
    }
  }
.draggableItem{
  // background-color: black;
  padding-top: 20px;
}
</style>
