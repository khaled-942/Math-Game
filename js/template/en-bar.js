var slider,
  firstval,
  secondval,
  number,
  rangeInput,
  numberInput,
  value,
  val_num,
  input,
  number2,
  clear,
  resultDisplayed;

slider = document.getElementById("myRange");
firstval = document.getElementById("demo1");
secondval = document.getElementById("demo2");
val1 = document.getElementById("demo3");
val2 = document.getElementById("demo4");
equal = document.getElementById("equal");
number = document.getElementById("number");
rangeInput = document.getElementById("myRange");
input = document.getElementById('input'),
  number2 = document.querySelectorAll('.numbers div'),
  clear = document.getElementById('clear'),
  resultDisplayed = false;

numberInput = number.value;
equal.innerHTML = numberInput
rangeInput.setAttribute("min", "0");
rangeInput.setAttribute("max", numberInput);
value = numberInput / 2;
rangeInput.setAttribute("value", value);
firstval.innerHTML = numberInput / 2;
secondval.innerHTML = numberInput / 2;
flag;
val1.innerHTML = firstval.innerHTML;
val2.innerHTML = secondval.innerHTML;
let sureVal = $("#number").val();
function newborn() {
  $('#cont').empty();
  let child = `<input type="range" class="slider" id="myRange1" max='${sureVal}'>`
  $('#cont').append(child);
  slider1 = document.getElementById("myRange1");

}
function ok() {
  if ($('#input').val() === '') {

  } else {
    number.value = input.value;
    sureVal = input.value;
    equal.innerHTML = numberInput
    value = numberInput / 2;
    newborn();
    rangeInput.setAttribute("value", value);
    firstval.innerHTML = Math.floor(value);
    secondval.innerHTML = Math.ceil(value);
    val1.innerHTML = firstval.innerHTML;
    val2.innerHTML = secondval.innerHTML;
    changeTextInput();
    if ($('#b1').hasClass('selected')) {
      nenNumInput();
      slider1.oninput = nenNumInput;
    } else if ($('#b2').hasClass('selected')) {
      nenNumInput2();
      slider1.oninput = nenNumInput2;
    } else if ($('#b3').hasClass('selected')) {
      nenNumInput3();
      slider1.oninput = nenNumInput3;
    } else if ($('#b4').hasClass('selected')) {
      nenNumInput4();
      slider1.oninput = nenNumInput4;
    }
  }
  modal.style.display = "none";

}
function checkFlags(){
  if ($('#b1').hasClass('selected')) {
    nenNumInput();
    slider1.oninput = nenNumInput;
  } else if ($('#b2').hasClass('selected')) {
    nenNumInput2();
    slider1.oninput = nenNumInput2;
  } else if ($('#b3').hasClass('selected')) {
    nenNumInput3();
    slider1.oninput = nenNumInput3;
  } else if ($('#b4').hasClass('selected')) {
    nenNumInput4();
    slider1.oninput = nenNumInput4;
  }
}
function changeTextInput() {

  numberInput = number.value;
  equal.innerHTML = numberInput
  rangeInput.setAttribute("max", numberInput - 1);
  value = numberInput / 2;
  rangeInput.setAttribute("value", value);
  firstval.innerHTML = Math.floor(numberInput / 2);
  secondval.innerHTML = Math.ceil(numberInput / 2);
  checkOp();
  if ($('#b1').hasClass('selected') && flag === 1) {
    nenNumInput();
    slider1.oninput = nenNumInput;
  } else if ($('#b2').hasClass('selected') && flag === 2) {
    nenNumInput2();
    slider1.oninput = nenNumInput2;
  } else if ($('#b3').hasClass('selected') && flag === 3) {
    nenNumInput3();
    slider1.oninput = nenNumInput3;
  } else if ($('#b4').hasClass('selected') && flag === 4) {
    nenNumInput4();
    slider1.oninput = nenNumInput4;
  }
}

function nenNumInput() {
  let x = this.value;
  let op = $('#select').val();
  firstval.innerHTML = Math.floor(x);
  secondval.innerHTML = Math.ceil(sureVal - x);
  checkOp();

};

function nenNumInput2() {
  let x = this.value;
  let op = $('#select').val();
  firstval.innerHTML = Math.floor(x);
  secondval.innerHTML = Math.ceil(sureVal - x);
  checkOp2();
};

function nenNumInput3() {
  let x = this.value;
  let op = $('#select').val();
  firstval.innerHTML = Math.floor(x);
  secondval.innerHTML = "?";
  checkOp();
};

function nenNumInput4() {
  let x = this.value;
  let op = $('#select').val();
  firstval.innerHTML = "?";
  secondval.innerHTML = Math.ceil(sureVal - x);
  checkOp();
};

slider.oninput = nenNumInput;

$('#GroupWho button').on('click', (e) => {
  $('#GroupWho button').removeClass('selected');
  $(e.target).addClass('selected');
})

function checkOp() {

  if ($('#opt').text() === '+') {
    val1.innerHTML = firstval.innerHTML;
    val2.innerHTML = secondval.innerHTML;
    $('#equal').text(numberInput)
  } else if ($('#opt').text() === '-') {
    val1.innerHTML = numberInput;
    val2.innerHTML = firstval.innerHTML;
    $('#equal').text(secondval.innerHTML)
  }
}

function checkOp2() {
  if ($('#opt').text() === '+') {
    val1.innerHTML = firstval.innerHTML;
    val2.innerHTML = secondval.innerHTML;
    $('#equal').text('?')
  } else if ($('#opt').text() === '-') {
    val1.innerHTML = '?';
    val2.innerHTML = firstval.innerHTML;
    $('#equal').text(secondval.innerHTML)
  }
}

$('#checkBoxBtn').on('click', function () {
  if ($(this).is(":checked")) {
    $('.main p').css('display', 'block');
    $('.operators').css('display', 'block');
  } else if ($(this).is(":not(:checked)")) {
    $('.main p').css('display', 'none');
    $('.operators').css('display', 'none');

  }
});

$('#b1').on('click', function () {
  $('#number').attr('type', 'number');
  $('#number').attr('value', numberInput);
  $('#number').removeAttr('disabled');
  nenNumInput();
  newborn();
  slider1.oninput = nenNumInput;
  flag = 1;
})

$('#b2').on('click', function () {
  $('#number').attr('type', 'number');
  $('#number').attr('value', "?");
  $('#number').attr('disabled', 'disabled');
  nenNumInput2();
  newborn();
  slider1.oninput = nenNumInput2;
  flag = 2;
})

$('#b3').on('click', function () {
  $('#number').attr('type', 'number');
  $('#number').attr('value', numberInput);
  $('#number').removeAttr('disabled');
  nenNumInput3();
  newborn();
  slider1.oninput = nenNumInput3;
  flag = 3;
})

$('#b4').on('click', function () {
  $('#number').attr('type', 'number');
  $('#number').attr('value', numberInput);
  $('#number').removeAttr('disabled');
  nenNumInput4();
  newborn();
  slider1.oninput = nenNumInput4;
  flag = 4;
})
var modal = document.getElementById("myModal");

var span = document.getElementsByClassName("close")[0];

span.onclick = function () {
  modal.style.display = "none";
}

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

$('#number').on('click', function () {
  modal.style.display = "block";
})

$('.cancel').on('click', function () {
  modal.style.display = "none";
})
for (var i = 0; i < number2.length; i++) {
  number2[i].addEventListener("click", function (e) {

    if (resultDisplayed === false) {
      input.value += e.target.innerHTML;
    } else {

      resultDisplayed = false;
      input.value = "";
      input.value += e.target.innerHTML;

    }


  });


}



clear.addEventListener("click", function () {
  input.value = "";
})


function myFunction() {
  var popup = document.getElementById("myPopup");
  popup.classList.toggle("show");

}
$(".plus").click(function () {
  $("#opt").text("+");
  checkFlags()
});
$(".minus").click(function () {
  $("#opt").text("-");
  checkFlags()
});