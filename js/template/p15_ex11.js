var correctImg = '<div class="showAnswerTickMark showAns"><img  src="assets/images/tikMark.png" /></div>';
var incorrectImg = '<div class="showAnswerCrossMark showAns"><img src="assets/images/crossMark.png" /></div>';
var isMusic1Playing = false;
var isMusic2Playing = false;
var $audio1 = $("#audioPlayer1");
var $audio2 = $("#audioPlayer2");
// * var slider = document.getElementById("myRange");
let flag;
var lastAudio = 0;
var totalItems = $('.item').length;
var currentIndex = $('div.active').index() + 1;
function fnTemplate4_v1(_div) {
	var slide = $(_div);
	var currID;
	$audio1[0].pause();
	$audio1[0].currentTime = 0;
	// $("#slider").slider({"value": 0});
	//* slider.value = 0;     * وقفته علشان بياثر على سليدر التاسك كل اللى عنده دى
	$audio1[0].pause();
	$audio1[0].removeEventListener('timeupdate', fnUpdateTimer);
	// isMusic1Playing = true;
	$('#pButton .playImg').show();
	$('#pButton .pauseImg').hide();
	setAudio($(slide).attr('data-audioSrc'));
	$('.question').css({
		'background-color': '#ffffff',
		'color': '#000000'
	}).removeClass('selected');
	$('.optClick').css('cursor', 'default');

}




function fnReloadAll() {
	
	$('.question').css({'visibility':'visible'})
	$('.optClick').removeClass('disabledMe animate__animated animate__shakeX');
	$('.option').removeClass('disabledMe')
	$('.optClick').html('&nbsp;');
	$('.sora').css({'visibility':'visible','opacity':'1','pointer-events':'auto'});
	$('.caption').css({'visibility':'visible'});
	$('.question').css({
		'border': '2px solid #ffffff',
		'visibility': 'visible','opacity':'1'}).removeClass('selected disabled');
		$('.question').addClass('hovering')
	$('.optClick').removeClass('filled');
	$('.showAnsBtn').removeClass('disabled');
	$('#myCarousel').carousel(0);
	stopAudio();
	Imgsfilled = 0;
	fnTemplate4_v1($('div.active'));
}

function fnReloadScreen() {
	$('.optClick').removeClass('disabledMe animate__animated animate__shakeX');
	$('.option').removeClass('disabledMe')
	$('div.active').find('.option').removeClass('disabled optDisable correctTick incorrectTick showAns').on('click');
	$('div.active').find('.question').removeClass('completed').addClass('notCompleted');
	$('div.active').find('.question').css({
		'border': '2px solid #ffffff',
		'visibility': 'visible'
	}).removeClass('selected disabled');
	$('div.active').find('.optClick').removeClass('filled');
	$('div.active').find('.optClick').html('&nbsp;');
	stopAudio();
	fnTemplate4_v1($('div.active'));
}

function fnAudio(obj) {
	var titleAudioPath = $(obj).attr('data-audioSrc');
	$audio2[0].setAttribute('src', titleAudioPath);
	$audio2[0].load();
	var playPromise = $audio2[0].play();

	if (playPromise !== undefined) {
		playPromise.then(function (value) {
			// Automatic playback started!
			// Show playing UI.
			// $audio1[0].currentTime = 0;        
			//$("#slider").slider({"value": 0});
			$audio1[0].pause();
			//$audio1[0].removeEventListener('timeupdate', fnUpdateTimer);
			$('#pButton .playImg').show();
			$('#pButton .pauseImg').hide();
		})
			.catch(function (error) {
				// Auto-play was prevented
				// Show paused UI.
			});
	}
}

function showAns() {
	if ($('.showAnsBtn').hasClass('disabled')) {
		return false;
	}
	
	stopAudio();
	$audio1[0].pause();
	$audio2[0].pause();
	$('.sora').css({'visibility':'hidden'});
	$('.caption').css({'visibility':'hidden'});
	$('div.active').find('.question').css('visibility', 'hidden');
	$('div.active').find('.optClick').each(function () {
		$(this).html('<img class="ansImage" src=' + $(this).attr('data-Answer') + ' />').addClass('filled').append(correctImg);
	});
	$(this).addClass('disabled');
}

function setAudio(_src) {
	if (_src == "") {
		$('.controlsDiv').addClass('hide');
	} else {
		$('.controlsDiv').removeClass('hide');
	}
	$audio1[0].setAttribute('src', _src);
	$audio1[0].load();
}

/* Title Audio function */
function fnTitleAudioClick(obj) {
	if ($(obj).hasClass('hide')) {
		return false;
	}
	//$audio1[0].currentTime = 0;
	//$("#slider").slider({"value": 0});
	$audio1[0].pause();
	$audio1[0].removeEventListener('timeupdate', fnUpdateTimer);
	$('#pButton .playImg').show();
	$('#pButton .pauseImg').hide();
	var titleAudioPath = $(obj).attr('data-audioSrc');
	$audio2[0].setAttribute('src', titleAudioPath);
	$audio2[0].load();
	$audio2[0].play();
	isMusic1Playing = false;
	isMusic2Playing = true;
}

function fnUpdateTimer() {
	var progressValue = Math.round(($audio1[0].currentTime / $audio1[0].duration) * 100);

	//* slider.value = progressValue;
}

function fnStartAudio(_state) {
	$audio2[0].pause();
	if (_state == 'play') {
		$('#pButton .playImg').hide();
		$('#pButton .pauseImg').show();
		$audio1[0].play();
		isMusic1Playing = true;
	} else {
		$('#pButton .playImg').show();
		$('#pButton .pauseImg').hide();
		$audio1[0].pause();
		lastAudio = 0;
		isMusic1Playing = false;
	}
	$audio1[0].addEventListener('timeupdate', fnUpdateTimer);
}

function stopAudio() {
	$audio1[0].pause();
	$('#pButton .playImg').show();
	$('#pButton .pauseImg').hide();
	$audio1[0].currentTime = 0;
	//* slider.value = 0;
	isMusic1Playing = false;
	$audio2[0].pause();
	isMusic2Playing = false;
	lastAudio = 0;
}


function fnSetPlayer() {
	if (currentIndex == 1) {
		$('.backBtn').addClass('disabled');
	}

	if (totalItems == 1) {
		$('.navigationControls, .nextBtn, .reloadBtnScreen, .backBtn, .pageNumber').addClass('hide');
	}

	if ($('.title').attr('data-audioSrc') == "") {
		$('.title').addClass('hide');
		$('.headingTitle').removeClass('col-xs-10').addClass('col-xs-11');
	}

	$audio1[0].addEventListener('playing', function () {
		lastAudio = 1;
		isMusic1Playing = true;
	});

	$audio2[0].addEventListener('playing', function () {
		lastAudio = 2;
		isMusic2Playing = true;
	});

	$audio1[0].addEventListener('pause', function () {
		isMusic1Playing = false;
	});

	$audio2[0].addEventListener('pause', function () {
		isMusic2Playing = false;
	});

	$audio1[0].addEventListener('ended', function () {
		lastAudio = 0;
		isMusic1Playing = false;
		$audio1[0].currentTime = 0;
		// *slider.value = 0;
		$audio1[0].pause();
		$audio1[0].removeEventListener('timeupdate', fnUpdateTimer);
		$('#pButton .playImg').show();
		$('#pButton .pauseImg').hide();
	});

	$audio2[0].addEventListener('ended', function () {
		lastAudio = 0;
	});

	// ****slider.addEventListener("input", function () {
	// 	// console.log(">> input "+slider.value);
	// 	// $audio1[0].pause();
	// 	$audio1[0].removeEventListener('timeupdate', fnUpdateTimer);
	// 	var setTime = Math.round((slider.value * $audio1[0].duration) / 100);
	// 	$audio1[0].currentTime = setTime;
	// }, false);

	// ***slider.addEventListener("change", function () {
	// 	// console.log("change >> "+isMusic1Playing);
	// 	if (isMusic1Playing) {
	// 		$audio1[0].play();
	// 		$audio1[0].addEventListener('timeupdate', fnUpdateTimer);
	// 	}
	// }, false);

	$('#myCarousel').on('slid.bs.carousel', function () {
		currentIndex = $('div.active').index() + 1;
		$('.pageNumber').html(currentIndex + ' of ' + totalItems);
		if (currentIndex == 1) {
			$('.backBtn').addClass('disabled');
		} else {
			$('.backBtn').removeClass('disabled');
		}

		if (currentIndex == totalItems) {
			$('.nextBtn').addClass('disabled');
		} else {
			$('.nextBtn').removeClass('disabled');
		}
		stopAudio();

		// need to edit template function name here:
		fnTemplate4_v1($('div.active'));
	});
}