(function ($) {
	$.widget("ui.combobox", {
		options: {
			water: null
		},
		_create: function () {
			var self = this;
			var select = this.element.hide();
			var selected = select.children(":selected");
			var value = selected.val() ? selected.text() : "";

			var md = false;
			var input = this.input = $("<input>")
					.insertAfter(select)
					.val(value)
					.autocomplete({
						delay: 0,
						minLength: 0,
						source: function (request, response)
						{
							var matcher = new RegExp($.ui.autocomplete.escapeRegex(request.term), "i");
							response(select.children("option").map(function ()
							{
								var text = $(this).text();
								if (this.value && (!request.term || matcher.test(text)))
									return {
										label: text.replace(
											new RegExp(
												"(?![^&;]+;)(?!<[^<>]*)(" +
												$.ui.autocomplete.escapeRegex(request.term) +
												")(?![^<>]*>)(?![^&;]+;)", "gi"
											), "<strong>$1</strong>"),
										value: text,
										option: this
									};
							}));
						},
						select: function (event, ui)
						{
							ui.item.option.selected = true;
							self._trigger("selected", event, {
								item: ui.item.option
							});
							if (ui.item.option.parentNode)
							{
								$(ui.item.option.parentNode).trigger("change");
							}
						},
						change: function (event, ui)
						{
							if (!ui.item)
							{
								var matcher = new RegExp("^" + $.ui.autocomplete.escapeRegex($(this).val()) + "$", "i"),
									valid = false;
								select.children("option").each(function ()
								{
									if ($(this).text().match(matcher))
									{
										this.selected = valid = true;
										return false;
									}
								});
								if (!valid)
								{
									// remove invalid value, as it didn't match anything
									$(this).val("");
									select.val("");
									input.data("ui-autocomplete").term = "";
									return false;
								}
							}
						},
						open: function (event, ui) { md = false },
						close: function (event, ui) { md = false }
					})
					.addClass("ui-widget ui-widget-content ui-corner-left ui-corner-right");

			//if (this.options.water && value == "") this.input.watermark(this.options.water);

			select.bind("change", function () {
				var valid = false;
				for (var i = 0; i < select[0].length; i++) {
					if (select[0][i].text.indexOf(input.val()) >= 0) { valid = true; break; }
				}
				if (!valid) input.val("");
			});

			select.bind("reverse", function () {
				input.val(select.find("option:selected").text());
			});

			input.data("ui-autocomplete")._renderItem = function (ul, item)
			{
				return $("<li></li>")
						.data("ui-autocomplete-item", item)
						.append("<a>" + item.label + "</a>")
						.appendTo(ul);
			};

			this.button = $("<span></span>")
					.insertBefore(input)
					.addClass("ui-button ui-autocomplete-button")
					.click(function ()
					{
						// close if already visible
						if (!md) return;

						// pass empty string as value to search for, displaying all results
						input.autocomplete("search", "");
						input.focus();
					})
					.mousedown(function (event, ui)
					{
						md = true;
					});

			input.wrap("<span style='float:left; width:100%'></span>");
		},

		destroy: function () {
			this.input.remove();
			this.button.remove();
			this.element.show();
			$.Widget.prototype.destroy.call(this);
		}
	});
})(jQuery);