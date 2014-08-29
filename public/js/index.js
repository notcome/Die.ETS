var list = [];
var pos = 0;

function loadList(){
	$.get("getWords", function(data) {
		list = select(data);
		$('#word').html(list);
	});
}

function select(data){
	return data.slice(0, -1).split(',');
}

function next(){
	if(pos < list.length){
		$('#word').html(list[pos]);
		var msg = new SpeechSynthesisUtterance(list[pos]);
		window.speechSynthesis.speak(msg);
		pos++;
	}
	else 
		$('#word').html("No more sir");
}