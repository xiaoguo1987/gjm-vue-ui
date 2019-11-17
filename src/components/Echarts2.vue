<template>
  <div id="myChart"></div>
</template>

<script>
  export default {
  name: 'hellos',
  data () {return{
    plan:"",
    click:0,
    initdata:[]
  }},
  mounted () {
    this.drawLine()
  },
  methods: {
    drawLine: function () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      //var initdata={};
      this.initdata="";
      this.$axios.get('/api/echart/getEveryday')
        .then(function (response) {
          console.log(response);
          this.initdata = response.data;
          console.log("initdata="+initdata);
          console.log("initdata="+initdata[0].plan);
        })
        .catch(function (error) {
          console.log(error);
        });
      // 绘制图表
      myChart.setOption({
        title: {text: '在Vue中使用echarts'},
        tooltip: {},
        xAxis: {
          data: [this.initdata[0].plan,this.initdata[1].plan,this.initdata[2].plan]
        },
        yAxis: {type: 'value'},
        series: [{
          name: '点击',
          type: 'bar',
          data: [initdata[0].click,initdata[1].click,initdata[2].click,initdata[3].click,initdata[4].click]
        }]
      })

    }
  }
}
</script>

<style scoped>

</style>
