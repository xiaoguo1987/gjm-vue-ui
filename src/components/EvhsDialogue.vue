<template>
  <div id="myChart" :style="{width: '300px', height: '300px'}"></div>
</template>

<script>
  export default {
  name: 'hello',
  data () {return{}},
  mounted () {
    this.drawLine()
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('myChart'));
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

      // 绘制图表
      myChart.setOption({
        title: {
          text: '折线图堆叠'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'time',
          boundaryGap: false,
          data: dataX
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name:'邮件营销',
            type:'line',
            stack: '总量',
            data:[120, 132, 101, 134, 90, 230, 210]
          },
          {
            name:'联盟广告',
            type:'line',
            stack: '总量',
            data:[220, 182, 191, 234, 290, 330, 310]
          },
          {
            name:'视频广告',
            type:'line',
            stack: '总量',
            data:[150, 232, 201, 154, 190, 330, 410]
          },
          {
            name:'直接访问',
            type:'line',
            stack: '总量',
            data:[320, 332, 301, 334, 390, 330, 320]
          },
          {
            name:'搜索引擎',
            type:'line',
            stack: '总量',
            data:[820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      })

    }
  }
}
</script>

<style scoped>

</style>
