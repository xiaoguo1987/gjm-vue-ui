<template>
  <div id="myChart" :style="{width: '500px', height: '500px'}"></div>
</template>

<script>
  export default {
  name: 'hello',
  data () {return{
    data1:[],
    data2:[]
  }},
  mounted () {
    this.drawLine()
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例color: ['#003366', '#006699']
      let myChart = this.$echarts.init(document.getElementById('myChart'));
      var option={
        color: ['#316613', '#e5323e'],
        title: {text: '测试'},
        tooltip: {},
        xAxis: {
          type: 'category',
          name: '日期',
          axisLabel:{
            interval: 3,  //控制坐标轴刻度标签的显示间隔.设置成 0 强制显示所有标签。设置为 1，隔一个标签显示一个标签。设置为2，间隔2个标签。以此类推
            rotate:45,//倾斜度 -90 至 90 默认为0
            textStyle:{
              fontWeight:"bold",  //加粗
              color:"#000000"   //黑色
            },
          },
          data: []
        },
        yAxis: {type: 'value'},
        series: [
          {
            name: '百搜1',
            type: 'line',
            data: []
          },
          {
            name: '百搜2',
            type: 'line',
            data:[]
          }
        ]
      };
      myChart.setOption(option);   //参数设置方法
      myChart.hideLoading();
      var options = myChart.getOption();
      this.$axios.post('/api/echart/getTu1Echart')
        .then(function (response) {
          console.log(response);
          options.xAxis[0].data=response.data.createdate;
          options.series[0].data =response.data.basou1;
          options.series[1].data =response.data.basou2;
          myChart.hideLoading();
          myChart.setOption(options);
        })
        .catch(function (error) {
          alert("不好意思，大爷，图表请求数据失败啦!");
          myChart.hideLoading();
          console.log(error);
        });
    }
  }
}
</script>

<style scoped>

</style>
