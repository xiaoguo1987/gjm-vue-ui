<template>
  <div id="myChart" :style="{width: '1000px', height: '1000px'}"></div>
</template>

<script>
  export default {
    name: 'evdyDialogue',
    data () {return{
    }},
    mounted () {
      this.drawLine()
    },
    methods: {
      drawLine() {
        // 基于准备好的dom，初始化echarts实例color: ['#003366', '#006699']
        let myChart = this.$echarts.init(document.getElementById('myChart'));

        var option={
          legend: {},
          tooltip: {
            trigger: 'axis',
            showContent: false
          },
          dataset: {
            source: [
              ['pro', '2012', '2013', '2014', '2015', '2016', '2017'],
              ['Matcha Latte', 41.1, 30.4, 65.1, 53.3, 83.8, 98.7],
              ['Milk Tea', 86.5, 92.1, 85.7, 83.1, 73.4, 55.1],
              ['Cheese Cocoa', 24.1, 67.2, 79.5, 86.4, 65.2, 82.5],
              ['Walnut Brownie', 55.2, 67.1, 69.2, 72.4, 53.9, 39.1]
            ]
          },
          xAxis: {type: 'category'},
          yAxis: {gridIndex: 0},
          grid: {top: '55%'},
          series: [
            {type: 'line', smooth: true, seriesLayoutBy: 'row'},
            {type: 'line', smooth: true, seriesLayoutBy: 'row'},
            {type: 'line', smooth: true, seriesLayoutBy: 'row'},
            {type: 'line', smooth: true, seriesLayoutBy: 'row'},
            {
              type: 'pie',
              id: 'pie',
              radius: '30%',
              center: ['50%', '25%'],
              label: {
                formatter: '{b}: {@2012} ({d}%)'
              },
              encode: {
                itemName: 'pro',
                value: '2012',
                tooltip: '2012'
              }
            }
          ]
        };
        myChart.on('updateAxisPointer', function (event) {
          var xAxisInfo = event.axesInfo[0];
          if (xAxisInfo) {
            var dimension = xAxisInfo.value + 1;
            myChart.setOption({
              series: {
                id: 'pie',
                label: {
                  formatter: '{b}: {@[' + dimension + ']} ({d}%)'
                },
                encode: {
                  value: dimension,
                  tooltip: dimension
                }
              }
            });
          }
        });

        myChart.setOption(option);
        myChart.hideLoading();
        var options = myChart.getOption();
        this.$axios.get('/api/echart/getEveydFour')
          .then(function (response) {
            console.log(response);
            options.dataset[0].source[0].data =['everyday',response.data.xlist];
            options.dataset[0].source[1].data =['baidu',response.data.baidu];
            options.dataset[0].source[2].data =['toutiao',response.data.toutiao];
            options.dataset[0].source[3].data =['360',response.data.three];
            options.dataset[0].source[4].data =['other',response.data.other];
/*            options.xAxis[0].data=response.data.createdate;
            options.series[0].data =response.data.basou1;
            options.series[1].data =response.data.basou2;*/
            console.log(options);
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
  #myChart {
    font-family: 'myChart', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
