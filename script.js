document.getElementById('weight-form').addEventListener('submit', function (event) {
    event.preventDefault();
  
    const height = document.getElementById('height').value;
    const weight = document.getElementById('weight').value;
  
    // 儲存數據到 localStorage
    let data = JSON.parse(localStorage.getItem('weightData')) || [];
    data.push({ height, weight, date: new Date().toISOString() });
    localStorage.setItem('weightData', JSON.stringify(data));
  
    // 更新圖表
    renderChart(data);
  });
  
  // 渲染圖表
  function renderChart(data) {
    const labels = data.map(item => item.date.split('T')[0]);  // 取日期部分
    const weights = data.map(item => item.weight);
  
    const ctx = document.getElementById('chart-container').getContext('2d');
    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: '體重變化',
          data: weights,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      }
    });
  }
  
  // 初次加載時顯示圖表
  const savedData = JSON.parse(localStorage.getItem('weightData')) || [];
  if (savedData.length > 0) {
    renderChart(savedData);
  }
  
  // 取得 <canvas> 元素
const ctx = document.getElementById("weightChart").getContext("2d");

// 建立體重變化的折線圖
const weightChart = new Chart(ctx, {
    type: "line",  // 折線圖
    data: {
        labels: ["2/1", "2/2", "2/3", "2/4", "2/5"],  // 日期
        datasets: [{
            label: "體重 (kg)", 
            data: [70, 69.5, 69, 68.8, 68.5],  // 體重數據
            borderColor: "blue",
            backgroundColor: "rgba(0, 0, 255, 0.2)",
            borderWidth: 2,
            fill: true
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: false  // 不從 0 開始，讓數據更清楚
            }
        }
    }
});
