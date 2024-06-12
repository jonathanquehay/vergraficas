const intervals = ['1M', '1W', '1D', '4H', '1H', '30', '15', '5', '1'];
const chartsContainer = document.getElementById('charts-container');
const currencyPairSelect = document.getElementById('currency-pair');

// Función para crear un contenedor de gráfico
function createChartContainer(pair, interval) {
  const chartContainer = document.createElement('div');
  chartContainer.classList.add('chart-item');

  const chartTitle = document.createElement('h1');
  chartTitle.textContent = `Gráfico ${pair} - ${interval}`;

  const chartDiv = document.createElement('div');
  chartDiv.id = `tradingview_${pair}_${interval}`;

  chartContainer.appendChild(chartTitle);
  chartContainer.appendChild(chartDiv);
  return chartContainer;
}

// Función para inicializar el widget de TradingView
function initializeTradingViewWidget(pair, interval) {
  try {
    new TradingView.widget({
      "symbol": `OANDA:${pair}`,
      "height": "534",
      "width": "100%",
      "interval": interval,
      "timezone": "Etc/UTC",
      "timezone": "America/New_York",
      "theme": "dark",
      "style": "1",
      "locale": "es",
      "hide_top_toolbar": true,
      "hide_legend": true,
      "backgroundColor": "rgba(0, 0, 0, 1)",
      "gridColor": "rgba(240, 243, 250, 0)",
      "hide_volume": true,
      "hide_side_toolbar": true,
      "container_id": `tradingview_${pair}_${interval}`
    });
  } catch (error) {
    console.error(`Error initializing TradingView widget for ${pair} - ${interval}:`, error);
  }
}

// Función para limpiar los gráficos existentes
function clearCharts() {
  while (chartsContainer.firstChild) {
    chartsContainer.removeChild(chartsContainer.firstChild);
  }
}

// Función para actualizar los gráficos según la divisa seleccionada
function updateCharts(pair) {
  clearCharts();
  intervals.forEach(interval => {
    const chartContainer = createChartContainer(pair, interval);
    chartsContainer.appendChild(chartContainer);
    initializeTradingViewWidget(pair, interval);
  });
}

// Evento para actualizar los gráficos cuando se seleccione una nueva divisa
currencyPairSelect.addEventListener('change', (event) => {
  const selectedPair = event.target.value;
  updateCharts(selectedPair);
});

// Inicializa los gráficos con la primera opción seleccionada
updateCharts(currencyPairSelect.value);
// Función para ocultar/mostrar el select cuando se presiona una tecla
document.addEventListener('keydown', (event) => {
  if (event.key === 'h') { // Puedes cambiar 'h' por cualquier tecla que prefieras
    const controls = document.querySelector('.controls');
    if (controls.style.display === 'none') {
      controls.style.display = 'block';
    } else {
      controls.style.display = 'none';
    }
  }
});

document.addEventListener('dblclick', () => {
  const controls = document.querySelector('.controls');
  if (controls.style.display === 'none') {
    controls.style.display = 'block';
  } else {
    controls.style.display = 'none';
  }
});