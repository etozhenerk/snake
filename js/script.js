let field = document.createElement("div"); // создаю блок с полем
document.body.appendChild(field); // добавляю в body
field.classList.add("field"); // присваиваю класс полю

for (let i = 1; i < 101; i++) {
  let excel = document.createElement("div");
  field.appendChild(excel);
  excel.classList.add("excel");
} // заполняю поле клетками, по которым будет двигаться змея, их должно быть 100 штук

let excel = document.getElementsByClassName("excel");
let x = 1;
let y = 10;
for (let i = 0; i < excel.length; i++) {
  if (x > 10) {
    x = 1;
    y--;
  }
  excel[i].setAttribute("posX", x);
  excel[i].setAttribute("posY", y);
  x++;
} // присваиваю ячейкам атрибуты со значениями координат х и y, они нам необходимы для перемещения змеи

function generateSnake() {
  let posX = Math.round(Math.random() * (10 - 3) + 3);
  let posY = Math.round(Math.random() * (10 - 1) + 1);
  return [posX, posY];
} // функция создает случайные координаты х и у, -3\+3 необходимо, что бы змея не выпадала за пределы координатной сетки по оси х

let coordinates = generateSnake();
let snakeBody = [
  // массив, который является телом змеи, оно должно появляться на случайной позиции в таблице, находим элементы по атрибутам х и у
  document.querySelector(
    '[posX = "' + coordinates[0] + '"][posY = "' + coordinates[1] + '"]' // голова змеи
  ),
  document.querySelector(
    '[posX = "' + (coordinates[0] - 1) + '"][posY = "' + coordinates[1] + '"]' // середина тела змеи
  ),
  document.querySelector(
    '[posX = "' + (coordinates[0] - 2) + '"][posY = "' + coordinates[1] + '"]' // хвост змеи, на момент появления
  )
];

for (let i = 0; i < snakeBody.length; i++) {
  snakeBody[i].classList.add("snakeBody"); // добавляем всему массиву класс
}
snakeBody[0].classList.add("head"); // голова

let mouse;

function crateMouse() {
  function generateMouse() {
    let posX = Math.round(Math.random() * (10 - 3) + 3);
    let posY = Math.round(Math.random() * (10 - 1) + 1);
    return [posX, posY];
  }

  let mouseCoordinates = generateMouse();
  mouse = document.querySelector(
    '[posX = "' +
      mouseCoordinates[0] +
      '"][posY = "' +
      mouseCoordinates[1] +
      '"]' // ячейка мышки
  );

  while (mouse.classList.contains("snakeBody")) {
    let mouseCoordinates = generateMouse();
    mouse = document.querySelector(
      '[posX = "' +
        mouseCoordinates[0] +
        '"][posY = "' +
        mouseCoordinates[1] +
        '"]'
    ); // исключаю возможность попадания мыши в ячейки змеи
  }
  mouse.classList.add("mouse");
}

crateMouse();

let direction = "right"; // направление движения
let steps = false;

let input = document.createElement('input'); // результат игры
document.body.appendChild(input);
input.classList.add('input');


let score = 0;
input.value = `Ваши очки: ${score}`;
input.setAttribute('readonly','');
function move() {
  // оживдяю змею, функция для движения змеи
  let snakeCoordinates = [
    snakeBody[0].getAttribute("posX"),
    snakeBody[0].getAttribute("posY")
  ]; // массив с координатами головы
  snakeBody[0].classList.remove("head"); // удаляю голову
  snakeBody[snakeBody.length - 1].classList.remove("snakeBody"); // удаляю у хвоста класс со стилизацией
  snakeBody.pop(); // удаляю хвост
  if(direction == 'right'){
    if (snakeCoordinates[0] < 10) {
      snakeBody.unshift( document.querySelector('[posX = "' +   (+snakeCoordinates[0] + 1) + '"][posY = "' + snakeCoordinates[1] +'"]')); // на первое место массива помещаю второй элемент
      snakeBody[0].classList.add("head"); // и добавляю ему голову
    } else {
      snakeBody.unshift(document.querySelector( '[posX = "1"][posY = "' + snakeCoordinates[1] + '"]')); // в случае, если змея дошла до границы поля
    }
  }else if(direction == 'left'){
    if (snakeCoordinates[0] > 1) {
      snakeBody.unshift( document.querySelector('[posX = "' +   (+snakeCoordinates[0] - 1) + '"][posY = "' + snakeCoordinates[1] +'"]')); // на первое место массива помещаю второй элемент
      snakeBody[0].classList.add("head"); // и добавляю ему голову
    } else {
      snakeBody.unshift(document.querySelector( '[posX = "10"][posY = "' + snakeCoordinates[1] + '"]')); // в случае, если змея дошла до границы поля
    }
  } else if(direction == 'up'){
    if (snakeCoordinates[1] < 10) {
      snakeBody.unshift( document.querySelector('[posX = "' +snakeCoordinates[0] + '"][posY = "' +( + snakeCoordinates[1] + 1) +'"]')); // на первое место массива помещаю второй элемент
      snakeBody[0].classList.add("head"); // и добавляю ему голову
    } else {
      snakeBody.unshift(document.querySelector( '[posX = "' +snakeCoordinates[0] + '"][posY = "1"]')); // в случае, если змея дошла до границы поля
    }
  } else if(direction == 'down'){
    if (snakeCoordinates[1] > 1) {
      snakeBody.unshift( document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "' +( + snakeCoordinates[1] -1 ) +'"]')); // на первое место массива помещаю второй элемент
      snakeBody[0].classList.add("head"); // и добавляю ему голову
    } else {
      snakeBody.unshift(document.querySelector( '[posX = "' +snakeCoordinates[0] + '"][posY = "10"]')); // в случае, если змея дошла до границы поля
    }
  }

  if(snakeBody[0].getAttribute('posX') == mouse.getAttribute('posX') && snakeBody[0].getAttribute('posY') == mouse.getAttribute('posY') ){ //проверка на совпадение координат головы змеи и мыши
      mouse.classList.remove('mouse');
      let a = snakeBody[snakeBody.length-1].getAttribute('posX');
      let b = snakeBody[snakeBody.length-1].getAttribute('posY'); 
      snakeBody.push(document.querySelector('[posX ="'+ a +'" ][posY ="'+ b +'" ]'));
      crateMouse();
      score++;
      input.value = `Ваши очки: ${score}`;
  }
  if(snakeBody[0].classList.contains('snakeBody')){
    clearInterval(interval);
    snakeBody[0].style.background = 'url(img/dead-head.jpg) center no-repeat';
    snakeBody[0].style.backgroundSize = 'cover';
    if(alert(`Игра окончена. Ваши очки: ${score}`)){

    }else{
      location.reload();
    }
  }


  snakeBody[0].classList.add("head");
  for (let i = 0; i < snakeBody.length; i++) {
    snakeBody[i].classList.add("snakeBody");
  }

  steps = true;
}

let interval = setInterval(move, 275);

window.addEventListener("keydown", function(evt) {
  if(steps == true){
    if (evt.keyCode == 37 && direction !== 'right') {
      direction = 'left';
      steps = false;
    }
    else if (evt.keyCode == 38 && direction !== 'down') {
      direction = 'up';
      steps = false;
    }
    else if (evt.keyCode == 39 && direction !== 'left') {
      direction = 'right';
      steps = false;
    }
    else if (evt.keyCode == 40 && direction !== 'up') {
      direction = 'down';
      steps = false;
    }
  }
  
});
