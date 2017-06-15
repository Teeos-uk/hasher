
var model = {
	init: () => {
		model.reader = new FileReader();
		model.reader.onload = controller.do_stuff_with_file;
		model.file = null;
		model.data = null;
		model.hash = null;
		model.count = null;
	},
};

var view = {
	init: () => {
		view.file_input = document.getElementById('file_input');
		view.file_input.addEventListener("change", () => {
			model.file = view.file_input.files[0];
			if (model.file.size > 1024*10)
				console.log("File is larger than 10 kb");
			else
				model.reader.readAsText(model.file);
		})
	},

	update: () => {
		let count_span = document.getElementById("count");
		count_span.textContent = model.count;
	},
};

var controller = {
	init: () => {
		model.init();
		view.init();
	},

	do_stuff_with_file: () => {
		model.data = model.reader.result;
		model.hash = sha256(model.data);
		let info_span = document.getElementById('info');
		info_span.textContent = model.hash;

		controller.send_post_request();
	},

	send_post_request: () => {
		let http = new XMLHttpRequest();
		let url = '/hash/' + model.hash;
		http.open("GET", url, false);
		http.send(null);
		model.count = http.responseText;
		console.log(model.count);
		
		view.update();
	},
};

window.onload = controller.init;
