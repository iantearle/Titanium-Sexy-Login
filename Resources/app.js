// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

var win = Titanium.UI.currentWindow;
win = Titanium.UI.createWindow({  
    title:'Login'
});

var label = Titanium.UI.createLabel({
	text: 'Type your name',
	textAlign: 'center',
	color: '#fff',
	left: 0,
	right: 0,
	height: 29,
	top: 160,
	font: { fontSize: 18 }
});
label.show();
var firstNameLabel = Titanium.UI.createLabel({
	textAlign: 'right',
	color: '#fff',
	height: 29,
	top: 160,
	width: 'auto',
	opacity: 0
});

var secondNameLabel = Titanium.UI.createLabel({
	textAlign: 'left',
	color: '#fff',
	height: 29,
	top: 160,
	width: 'auto',
	opacity: 0
});

var firstName = Titanium.UI.createTextField({
    keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
    autocorrect:false,
    height:29,
    width:137,
    left:20,
    top: 160,
    clearButtonMode:Titanium.UI.INPUT_BUTTONMODE_NONE,
	selectionStyle:'none',
	backgroundColor: 'rgba(255,255,255,0.5)',
	opacity: 0,
	enabled:true,
	returnKeyType: Titanium.UI.RETURNKEY_NEXT
});
firstName.hide();

var secondName = Titanium.UI.createTextField({
    keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
    autocorrect:false,
    height:29,
    width:137,
    right:20,
    top: 160,
    clearButtonMode:Titanium.UI.INPUT_BUTTONMODE_NONE,
	selectionStyle:'none',
	backgroundColor: 'rgba(255,255,255,0.5)',
	opacity: 0,
	enabled:true,
	returnKeyType: Titanium.UI.RETURNKEY_DONE
});
secondName.hide();

var fadeIn = Titanium.UI.createAnimation({
    curve:Ti.UI.iOS.ANIMATION_CURVE_EASE_IN,
    opacity:1,
    duration:700
});
var fadeOut = Titanium.UI.createAnimation({
    curve:Ti.UI.iOS.ANIMATION_CURVE_EASE_IN,
    opacity:0,
    duration:500
});
firstName.addEventListener('return', function(){
	secondName.focus();
});
secondName.addEventListener('return', function(){
	firstName.blur(); 
    secondName.blur();
    firstName.animate(fadeOut);
	secondName.animate(fadeOut);
	secondName.hide();
	firstName.hide();
	
	if(!firstName.value && !secondName.value) {
		label.show();
		label.animate(fadeIn);
	} else {
		firstNameLabel.text = firstName.value;
		secondNameLabel.text = secondName.value;
		firstNameLabel.animate(fadeIn);
		secondNameLabel.animate(fadeIn);
		
		var total = (firstNameLabel.size.width + 5) + secondNameLabel.size.width;
		var devicewidth = 320;
		
		var calc = (devicewidth - total) / 2;

		firstNameLabel.left = calc;
		secondNameLabel.right = calc;
	}
});
win.addEventListener('touchstart', function (e) {
    Titanium.API.info('touchstart fired x: ' + Math.floor(e.x) + ' y: ' + Math.floor(e.y));
 
    if ((e.x >= 0 && e.x <= 320) && (e.y >= 160 && e.y <= 190)) {
    	if(!firstName.value && !secondName.value) {
			label.animate(fadeOut);
			label.hide();    		
    	} else {
    		firstNameLabel.animate(fadeOut);
			secondNameLabel.animate(fadeOut);
    	}

		firstName.show();
		secondName.show();
		firstName.animate(fadeIn);
		secondName.animate(fadeIn);
		firstName.focus();
    } else {
    	firstName.blur(); 
        secondName.blur();
        firstName.animate(fadeOut);
		secondName.animate(fadeOut);
		secondName.hide();
		firstName.hide();
		
		if(!firstName.value && !secondName.value) {
			label.show();
			label.animate(fadeIn);
		} else {
			firstNameLabel.text = firstName.value;
			secondNameLabel.text = secondName.value;
			firstNameLabel.animate(fadeIn);
			secondNameLabel.animate(fadeIn);
			
			var total = (firstNameLabel.size.width + 5) + secondNameLabel.size.width;
			var devicewidth = 320;
			
			var calc = (devicewidth - total) / 2;
	
			firstNameLabel.left = calc;
			secondNameLabel.right = calc;
		}
    }
});

win.add(secondNameLabel);
win.add(firstNameLabel);
win.add(secondName);
win.add(firstName);
win.add(label);
win.open();

