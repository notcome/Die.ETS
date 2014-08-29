function addWord(){
	var word = $('#inputWord').val();
	document.getElementById('data').value += word + ';';
	$('#list').append("<li>" + word + "</li>");
}