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
  