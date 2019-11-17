<template>
  <div id="myChart" :style="{width: '300px', height: '300px'}"></div>
</template>

<script>
  export default {
  name: 'hello4',
  data () {return{
    myChart:''
  }},
  mounted () {
    this.drawLine()
  },
  methods: {
    drawLine: function () {
      // 基于准备好的dom，初始化echarts实例
       this.myChart = this.$echarts.init(document.getElementById('myChart'))
// 显示标题，图例和空的坐标轴
      this.myChart.setOption({
        title: {
          text: '当月发车趋势图'
        },
        tooltip: {},
        legend: {
          data: ['发车量']
        },
        xAxis: {
          data: []
        },
        yAxis: {},
        series: [{
          name: '发车量',
          type: 'line',
          data: []
        }]
      });

      var dataX=[];
      var dataY=[];

      this.$axios.get('/api/echart/getTu1Echart')
        .then(function (response) {
          console.log(response);
          for(var i=0;i<response.data.length;i++){
            dataX.push(response.data[i].createdate);
            dataY.push(response.data[i].clicknum);
          }

          console.log("dataX="+dataX);
          console.log("dataY="+dataY);
        })
        .catch(function (error) {
          console.log(error);
        });

      this.myChart.setOption({
        xAxis: {
          data:dataX
        },
        series: [{
          // 根据名字对应到相应的系列
          name: '发车量',
          type: 'line',
          data: dataY
        }]
      });
    }
  }
}
</script>

<style scoped>

</style>
