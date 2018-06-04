'use strict';

var getMaxElement = function (array) { // Получаем максимальнsq элемента - для времени
  var maxElement = array[0];
  for (var i = 0; i < array.length; i++) {
    if (array[i] > maxElement) {
      maxElement = array[i];
    }
  }
  return maxElement;
};

var getColor = function (name) { // Получаем цвет для чела с именем name
  return name === 'Вы' ? 'rgba(255, 0, 0, 1.0)' : 'rgba(0, 0, 255, ' + Math.random().toFixed(2) + ')';
};

// Данные облаков
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
}; // Данные облаков

// Данные текстов
var TEXT_WIN = 'Ура, вы победили!';
var TEXT_RESULTS = 'Список результатов: ';
var TEXT_COORDINAT_X = 120;
var TEXT_COORDINAT_Y = 30;
var TEXT_GAP = 20;
var TEXT_COLOR = '#000';
var TEXT_FONT = '16px PT Mono';
var TEXT_BASELINE = 'hanging';

var renderText = function (ctx, color, font, baseline, textName, x, y) {
  ctx.fillStyle = color;
  ctx.font = font;
  ctx.textBaseline = baseline;
  ctx.fillText(textName, x, y);
}; // Данные текстов

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)'); // Отображаем облако с тенью
  renderCloud(ctx, CLOUD_X, CLOUD_Y, 'white'); // Отображаем белое облако
  renderText(ctx, TEXT_COLOR, TEXT_FONT, TEXT_BASELINE, TEXT_WIN, TEXT_COORDINAT_X, TEXT_COORDINAT_Y); // Отображаем лозунг о победе

  var BAR_HEIGHT = 150;
  var INDENT = 50;
  var BAR_WIDTH = 40;
  var INITIAL_X = 140;
  var INITIAL_Y = 250;

  var drawResult = function (name, time, position, step) { // получаем результат одного чела
    var SPACE_BETWEEN_TEXT_TABLE = 5;
    var RESULTS_BETWEEN_TABLE = 20;
    ctx.fillStyle = getColor(name);
    ctx.fillRect(INITIAL_X + (INDENT + BAR_WIDTH) * position, INITIAL_Y, BAR_WIDTH, -time * step);
    ctx.fillText(name, INITIAL_X + (INDENT + BAR_WIDTH) * position, INITIAL_Y + SPACE_BETWEEN_TEXT_TABLE);
    ctx.fillText(time.toFixed(0), INITIAL_X + (INDENT + BAR_WIDTH) * position, INITIAL_Y - time * step - RESULTS_BETWEEN_TABLE);
  };

  var maxTime = getMaxElement(times);
  var step = BAR_HEIGHT / maxTime;
  renderText(ctx, TEXT_COLOR, TEXT_FONT, TEXT_BASELINE, TEXT_RESULTS, TEXT_COORDINAT_X, TEXT_COORDINAT_Y + TEXT_GAP); // Отображаем текст результатов
  for (var i = 0; i < times.length; i++) {
    drawResult(names[i], times[i], i, step);
  }
};
