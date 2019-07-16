$(document).ready(function() {
	var div = $('.container');
	var width = (div.width())*2/3;
	div.css('width',div.width());
	div.css('height',width);
		$('#snow').css('top',(-div.width())*2/3);
		$('#sun').css('top',(-div.width())*2/3*0.275);
		
	$( window ).resize(function() {
		div.css('width','100%');
		div.css('height',(div.width())*2/3-1);
		$('#snow').css('top',(-div.width())*0.67);
		$('#sun').css('top',(-div.width())*2/3*0.275);
	});
	$( window ).scroll(function() {
		$('#snow').css('top',(-(div.width())*0.67+(1*$(window).scrollTop())));
		if($('#snow').offset().top>div.width()*2/3){
			$('#snow').css('visibility','hidden');
		}
		if(($('#city').offset().top-$(window).scrollTop())<=0 && ($('#city').offset().top-$(window).scrollTop())>-div.width()*2/3 ){
			$('#sun').css('top',2*($(window).scrollTop()-$('#city').offset().top)-div.width()*2/3*0.275);
		}	
		else{
			$('#sun').css('top',(-div.width())*0.666666666666*0.275);
		}
	});
	
	
	
	
	//set animation timing
	var animationDelay = 500,
		//loading bar effect
		barAnimationDelay = 3800,
		barWaiting = barAnimationDelay - 3000, //3000 is the duration of the transition on the loading bar - set in the scss/css file
		//letters effect
		lettersDelay = 50,
		//type effect
		typeLettersDelay = 150,
		selectionDuration = 500,
		typeAnimationDelay = selectionDuration + 800,
		//clip effect 
		revealDuration = 600,
		revealAnimationDelay = 1500;
	
	initHeadline();
	

	function initHeadline() {
		//insert <i> element for each letter of a changing word
		singleLetters($('.cd-headline.letters').find('b'));
		//initialise headline animation
		animateHeadline($('.cd-headline'));
	}

	function singleLetters($words) {
		$words.each(function(){
			var word = $(this),
				letters = word.text().split(''),
				selected = word.hasClass('is-visible');
			for (i in letters) {
				if(word.parents('.rotate-2').length > 0) letters[i] = '<em>' + letters[i] + '</em>';
				letters[i] = (selected) ? '<i class="in">' + letters[i] + '</i>': '<i>' + letters[i] + '</i>';
			}
		    var newLetters = letters.join('');
		    word.html(newLetters).css('opacity', 1);
		});
	}

	function animateHeadline($headlines) {
		var duration = animationDelay;
		$headlines.each(function(){
			var headline = $(this);
			
			var spanWrapper = headline.find('.cd-words-wrapper'),
			newWidth = spanWrapper.width() + 10
			spanWrapper.css('width', newWidth);
			//trigger animation
			setTimeout(function(){ hideWord( headline.find('.is-visible').eq(0) ) }, duration);
		});
	}

	function hideWord($word) {
		var nextWord = takeNext($word);
		
		if($word.parents('.cd-headline').hasClass('clip')) {
			$word.parents('.cd-words-wrapper').animate({ width : '2px' }, revealDuration, function(){
				switchWord($word, nextWord);
				showWord(nextWord);
			});

		} 
	}

	function showWord($word, $duration) {
	if($word.parents('.cd-headline').hasClass('clip')) {
			$word.parents('.cd-words-wrapper').animate({ 'width' : "2.4em" }, revealDuration, function(){ 
				var nextWord = takeNext($word);
				nextWord.removeClass('is-hidden').addClass('is-visible');
				nextWord.animate({'width':"4em"},revealDuration);
				nextWord = takeNext(nextWord);
				nextWord.removeClass('is-hidden').addClass('is-visible');
				nextWord.animate({'width':"2.9em"},revealDuration);
			});
		}
	}

	function takeNext($word) {
		return (!$word.is(':last-child')) ? $word.next() : $word.parent().children().eq(0);
	}

	function switchWord($oldWord, $newWord) {
		$oldWord.removeClass('is-visible').addClass('is-hidden');
		$newWord.removeClass('is-hidden').addClass('is-visible');
	}
	
	
	
	
});
