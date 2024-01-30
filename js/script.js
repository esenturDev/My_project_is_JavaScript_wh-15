const textInput = document.getElementById("text");
const dateInput = document.getElementById("date");
const addButton = document.getElementById("add");
const deleteButton = document.getElementById("delete");

const url = "https://crudcrud.com/api/e4935bf1cca14e3994b9cf58b68020c2/todos";

const postTodos = async () => {
	const user = {
		text: textInput.value,
		date: dateInput.value,
		isLogin: false,
	};
	try {
		await fetch(url, {
			method: "POST",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify(user),
		});
		getTodos();
	} catch (e) {
		console.error(e);
	}
};

const getTodos = async () => {
	try {
		const res = await fetch(url);
		const data = await res.json();
		renderTodos(data);
	} catch (e) {
		console.error(e);
	}
};

getTodos();

const renderTodos = (users) => {
	const result = users.map((item) => {
		return `
			<div class="resultList">
				<p>${item.text}</p>
				<p>${item.date}</p>
				<button
					onclick="completedsTodos('${item._id}', '${item.text}', '${item.date}', ${item.isLogin})">
					COMPLETED
				</button>
				<button onclick="deleteTodosResult('${item._id}')">DELETE</button>
			</div>
		`;
	});
	const getHtml = document.getElementById("list");
	getHtml.innerHTML = result.join("");
};

addButton.addEventListener("click", () => postTodos());

const deleteTodosResult = async (id) => {
	try {
		await fetch(`${url}/${id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		});
		getTodos();
	} catch (e) {
		console.error(e);
	}
};

const completedsTodos = async (id, text, date, isLogin) => {
	try {
		await fetch(`${url}/${id}`, {
			method: "PUT",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify({
				text: text,
				date: date,
				isLogin: !isLogin,
			}),
		});
		getTodos();
		console.log("Data updated successfully");
	} catch (e) {
		console.error(e);
	}
};
