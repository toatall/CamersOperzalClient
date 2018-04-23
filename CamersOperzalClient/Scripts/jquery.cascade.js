(function ($)
{

	// Инициализация namespace-ов
	$.ui = $.ui || {}; $.ui.cascade = $.ui.cascade || {};

	// конструктор
	$.fn.cascade = function (parent, opt)
	{
		// Инициализация каждого выбранного элемента
		return this.each(function ()
		{
			// Родительский селект верхнего уровня, от выбора которого будет зависеть содержимое дочернего (текущего) селекта
			var source = $(parent);
			// Текущий селект
			var self = $(this);

			// показать "песочные часики" пока идет загрузка с сервера
			self.bind("loading.cascade", [source], function (e, source)
			{
				//$(this).empty();
				//var position = {
				//	'z-index': '6000',
				//	'position': 'absolute',
				//	'width': '16px'
				//};
				//$.extend(position, $(this).offset());
				//position.top = position.top + 3;
				//position.left = position.left + 3;
				//$("<div class='cascade-loading'>&nbsp;</div>").appendTo("body").css(position);
				//$(this)[0].disabled = true;
			});

			// убрать "песочные часики" после окончания загрузки с сервера
			self.bind("loaded.cascade", [source], function (e, source)
			{
				//$(this)[0].disabled = false;
				//$(".cascade-loading").remove();
			});

			// главное событие на родительском селекте, которое должно срабатывать для обновления текущего селекта
			$(source).bind("change.cascade", function ()
			{
				// показать "песочные часики" пока идет загрузка с сервера
				self.trigger("loading.cascade", [source[0]]);

				// Запускаем отдельный поток с запросом на сервер
				window.setTimeout(function () { self.trigger("cascade.cascade"); }, 10);
			});

			// Событие, которое должно срабатывать в отдельном потоке (window.setTimeout) и которое должно обновить элементы дочернего селекта
			self.bind("cascade.cascade", function ()
			{
				// Делаем AJAX запрос на сервер для получения данных для дочернего слекта
				$.ajax(
				{
					type: "POST",
					dataType: "json",
					url: opt.ajax.url,
					success: function (json)
					{
						self.trigger("updateList.cascade", [json]);
					},
					error: function (jqXHR, textStatus, errorThrown)
					{
						alert(errorThrown);
					},
					// получаем значение родительского селекта
					data: $.extend({}, { val: source.val() }, opt.ajax.data)
				});
			});

			// Обновление списка значений дочернего селекта
			self.bind("updateList.cascade", function (e, list)
			{
				// Полученные значения для дочернего селекта заворачиваем в шаблон
				list = $(list).map(function () { return "<option value='" + this.Value + "'>" + this.Text + "</option>"; });

				// очищаем дочерний селект
				self.empty();

				// Заполняем дочерний селект
				if (list.length) self.html(list.get().join());

				// Пересоздаем обертки для селекта
				try
				{
					self.select.method.destroy(self);
					self.select();
				}
				catch (e) { }

				// убрать "песочные часики" после окончания загрузки с сервера
				self.trigger("loaded.cascade", [source[0]]); //be sure to fire even if there is no data

				// Сообщить всем, что дочерний селект изменился (это же событие должно дергать вложенные каскады, когда дочерний селект для кого-то является родительским)
				self.trigger("change");
			});
		});
	};

})(jQuery);