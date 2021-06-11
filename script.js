$(document).ready(function(){

	const taskNameEl = $('.js-task__name'),
		  taskDiscriptionEl = $('.js-task__textarea'),
		  todoTextEmptyEl = $('.js-list-empty'),
		  todoList = $('.js-list'),
		  taskBtnSubmitEl = $('.js-task__form');

	// -------------- Добавляем задачу --------------

	function formSubmitHandler(event) {
		event.preventDefault();

		todoTextEmptyEl.hide();

		todoList.append(`
			<li class="item js-item">
				<article>
					<header class="flex">
						<h3 class="item__name">${taskNameEl.val()}</h3>
						<button class="btn-delete js-btn-delete" type="button" aria-label="Удалить дело"></button>							
						<button class="btn-collapse js-btn-collapse" type="button" aria-label="Скрыть описание дела"></button>
					</header>
					
					<div class="wrap-item__text js-wrap-item__text">
						<p class="item__text">${taskDiscriptionEl.val()}</p>
					</div>
				</article>
			</li>
		`);

		this.reset();
	}

	taskBtnSubmitEl.on('submit',formSubmitHandler); // по клику на форму вызываем функцию добавления задачи


	// -------------- Удаляем задачу --------------

	todoList.on('click', '.js-btn-delete', function () { // делегируем body быть родителем, ищем todoBtnDelEL

		const findItem = this.closest('.js-item'); // в переменную сохраняем именно ту задачу на кнопку которой клик

		findItem.remove(); // вызываем функцию удаления item

		const itemsAll = $(todoList).children().length; // считаем количество дел

		if (itemsAll === 0) { // условие для текста Списко пуст...
			todoTextEmptyEl.show();
		}

	});


	// -------------- Скрываем описание --------------

	todoList.on('click', '.js-btn-collapse', function () { // делегируем body быть родителем, ищем .btn-collapse

		const findItemText = $(this).parents('.js-item').find('.js-wrap-item__text'); // переменная по клику на this btn-collapse ищет через родителя item а потом обращается к wrap

		findItemText.slideToggle(); // вызываем функцию сворачивания

		$(this).toggleClass('rotate');// анимация разворота стрелки

		if ($(this).attr('aria-label') === 'Скрыть описание дела') {
			$(this).attr('aria-label', 'Показать описание дела');

		} else {
			$(this).attr('aria-label', 'Скрыть описание дела');
		}
	});
});