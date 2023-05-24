/*----Изначальный код из тестового задания----*/

class UserService {
	// Неиспользуемые свойства
	// Принято объявлять переменные через const/let, но в классе это объявление не требуется
	var username;
	var password;
	
	constructor(username, password) {
		this.username = username;
		this.password = password;
}
		// Геттеры неверно записаны, их использование здесь не обязательно
		// Верная запись
		/*get name() {
			return this.username;
		}
		get pass() {
			return this.password;
		}*/
		get username() {
			return UserService.username;
		}
		get password() {
			throw "You are not allowed to get password";
	}
		//именуется в стиле lowerCamelCase (authenticateUser)
		// Отсутствуют параметры в методе
		static authenticate_user() {
			//Предпочтительнее использовать Promise, fetch, async
			let xhr = new XMLHttpRequest();
			xhr.open('GET', 'https://examples.com/api/user/authenticate?username=' +
				UserService.username + '&password=' + UserService.password, true);
			xhr.responseType = 'json';
			
			//Отсутствует метод send()
			//const не уместно, используем let, иначе result всегда будет false
			const result = false; 

			xhr.onload = function () {
				//Номер ответа пишется без кавычек, т.к. код ответа - число
				if (xhr.status !== 200) {
					result = xhr.response;
				} else {
					result = true;
				}
			};
			//Переместить return в функцию xhr.onload
			return result;
		}
}

// Правильнее использовать submit и добавить event.prevantDefault()
$('form #login').click(function () {
	// var более не используется! здесь и далее по коду
	// Необходимо получить value поэтому дописываем $('username').val()
	var username = $('username');
	var password = $('password');

	// Используя promise перепишем условие с then и catch
	var res = UserService(username, password).authenticate_user();

	if (res == true) {
		document.location.href = '/home';
	} else {
		alert(res.error);
	}
})
