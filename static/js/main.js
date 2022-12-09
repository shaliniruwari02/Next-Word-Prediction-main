var x = 'x';
let theTextBox = document.getElementById('enteredText'); 
let allTheKeys = document.getElementById('keyboard'); 
let changeKeys = document.getElementsByClassName('shifter'); 
let capsLockKey = document.getElementById('20');
let shiftKey = document.getElementById('16');
var pred1=document.getElementById("pred1");
var pred2=document.getElementById("pred2");
var pred3=document.getElementById("pred3");


var originalShifterArray = []; 
for (i = 0; i<changeKeys.length; i++){
	originalShifterArray.push(changeKeys[i].innerHTML);
}


var shifterArray = ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '{', '}', '|', ':', '"', '<', '>', '?'];


function clearText(){
	theTextBox.innerHTML = '<br>';
}




//Function that detects keypresses and does the appropriate things
function highlightAndType(e){
	var keyPressed = e.keyCode;
	var charPressed = e.key;
	const keys = document.getElementById(keyPressed);
	
	keys.classList.add('pressed');
	
	if(!charPressed){
		theTextBox.innerHTML = "Sorry, this pen doesn't work in your browser. :( <br> Try Chrome, Firefox or Opera.";
		return;
	}
	
	if (charPressed == 'CapsLock' || charPressed == 'Shift') {
		allTheKeys.classList.add('uppercase');
	} 


	if (charPressed == 'Shift') {
		for(i = 0; i<changeKeys.length; i++){
			changeKeys[i].innerHTML = shifterArray[i];
		}
	}
	
	
	if (e.key.length <= 1){
		console.log(theTextBox.innerHTML);
		if(theTextBox.innerHTML.endsWith('<br>')){
			var newText = theTextBox.innerHTML.slice(0, -4);
			theTextBox.innerHTML = newText;
		}
		theTextBox.innerHTML += e.key;
	} 
	else if (e.key == 'Backspace'){
		if(shiftKey.classList.contains('pressed')){
			clearText();
		} else {
			var newText = theTextBox.innerHTML.slice(0, -1);
			theTextBox.innerHTML = newText;
		}
	}
	 else if (e.key == 'Enter'){
		theTextBox.innerHTML += '<br><br>';
	}

	if(keyPressed == 9){
		e.preventDefault();
		theTextBox.innerHTML += '&emsp;&emsp;';
	}
	if(keyPressed == 32){
		doWork(theTextBox.innerHTML.slice(0, -1), 'pred');
	}
	else doWork(theTextBox.innerHTML,'med');
}


function doWork(str, work) {

	
	$.ajax({
		url:"http://127.0.0.1:5000/output", 
		type:'GET',
		data:{'string':str,
			  'work': work},
		//dataType:'json',
		
		//contentType: 'application/json;charset=UTF-8',
		success:function(response){
			console.log(response);
			var obj=JSON.parse(response);
			pred1.innerHTML=obj[0][0];
			pred2.innerHTML=obj[1][0];
			pred3.innerHTML=obj[2][0];

		},
		error:function(error){
			console.log(error);
		}

	});
	
}


function removeKeypress(e){
	var keyDepressed = e.keyCode;	
	console.log(keyDepressed);
	const keys = document.getElementById(keyDepressed);
	console.log(keys);
	
	keys.classList.remove('pressed');
	if(keyDepressed == 20 && !shiftKey.classList.contains('pressed') || keyDepressed == 16 && !capsLockKey.classList.contains('pressed')) {
		allTheKeys.classList.remove('uppercase');
	}
	if(keyDepressed == 16 ) {
		for(i = 0; i<changeKeys.length; i++){
			changeKeys[i].innerHTML = originalShifterArray[i];
		}
	}
}

window.addEventListener('keydown', highlightAndType );

window.addEventListener('keyup', removeKeypress );

window.addEventListener('click', clearText );