<template>
<div id="list">
    <!-- <div class="commonTitle">当日截至当前时点来款TOP10</div>    -->
          <el-button id="commonBgColor" type="info" size="large" :plain="true">当日截至当前<br/>时点来款TOP10</el-button>    
    <div class="content">
        <div class="unit">单位 ：万元</div>
        <table >
            <tr>
                <th v-for="item in titles">{{item}}</th>
            </tr>
            <tr v-for="data in datas">
                <td v-for="item in data">{{isNaN(item)?item:item.toFixed(3)}}</td>
            </tr>
        </table>
    </div>
</div>
</template>

<script>

export default {
    name: 'List',
    data () {
        return {
            titles: [
                '交易时间',
                '金额',
                '金额占比',
                '业务类别',
                '交易对手'
            ],
            datas: [
                ['09:01', 330.000, '3.3%', '债券投资', '招商银行1'],
                ['09:02', 330.000, '3.3%', '债券投资', '招商银行2'],
                ['09:11', 330.000, '3.3%', '债券投资', '招商银行3'],
                ['09:21', 330.000, '3.3%', '企业转账', '招商银行4'],
                ['09:31', 330.000, '3.3%', '债券投资', '招商银行5'],
                ['09:41', 330.000, '3.3%', '债券投资', '招商银行6'],
                ['09:51', 330.000, '3.3%', '个人转账', '招商银行7'],
                ['09:52', 330.000, '3.3%', '债券投资', '招商银行8'],
                ['09:53', 330.000, '3.3%', '债券投资', '招商银行9'],
                ['09:91', 330.000, '3.3%', '债券投资', '招商银行10'],
            ]
        }
    }
}
</script>

<style lang="less" scoped>
    .content {
        height: 300px;
        .unit {
            text-align: right;
            position: relative;
            right: 5.5%;
        }   
        table {
            width: 100%;
            text-align: center;
        }
    }

</style>
