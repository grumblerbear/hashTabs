(function( $ ){

	var methods;
	methods = {
		init: function (options) {
			//noinspection JSValidateTypes
			options = $.extend({
				selectorTriggers: '.trigger',
				selectorTabs: '.tab',
				hashPostfix: '_box',
				clickCallback: function () {},
				openCallback: function () {}
			}, options);

			return this.each(function () {
				var self = $(this);
				var elements;
				elements = {
					self: self,
					triggers: self.find(options.selectorTriggers),
					tabs: self.find(options.selectorTabs)
				};

				if (window.location.hash) {
					var hash = window.location.hash;
					var href = "[href='" + hash + "']";
					elements.triggers.filter(href).hashTabs('switch', elements, options);
				} else {
					elements.triggers.filter(":first-child").hashTabs('switch', elements, options);
				}

				elements.triggers.on('click', function () {
					options.clickCallback.call(this);
					$(this).hashTabs('switch', elements, options);
				});
			});
		},
		switch: function (elements, options) {
			return this.each(function () {
				var hash = $(this).attr('href');
				var href = "[href='" + hash + "']";
				if (hash) {
					elements.triggers.removeClass("active");
					elements.tabs.removeClass("active");


					elements.triggers.filter(href).addClass("active");
					hash = hash.replace(options.hashPostfix, "");

					elements.tabs.filter(hash).addClass("active");

					$(this).parents('.tab').attr('id')

					options.openCallback.call(this);
				}
			});
		}
	};

	$.fn.hashTabs = function ( method ) {
		if ( methods[method] ) {
			return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Метод ' +  method + ' в jQuery.hashTabs не существует' );
		}
	};
})( jQuery );