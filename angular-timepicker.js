angular.module("schemaForm").run(["$templateCache", function ($templateCache) { $templateCache.put("directives/decorators/bootstrap/datepicker/timepicker.html", "<div class=\"form-group {{form.htmlClass}}\" ng-class=\"{\'has-error\': hasError()}\">\n  <label class=\"control-label\" ng-show=\"showTitle()\">{{form.title}}</label>\n  <div ng-class=\"{\'input-group\': (form.fieldAddonLeft || form.fieldAddonRight)}\">\n    <span ng-if=\"form.fieldAddonLeft\"\n          class=\"input-group-addon\"\n          ng-bind-html=\"form.fieldAddonLeft\"></span>\n    <input ng-show=\"form.key\"\n           style=\"background-color: white\"\n           type=\"text\"\n           class=\"form-control {{form.fieldHtmlClass}}\"\n           schema-validate=\"form\"\n           ng-model=\"$$value$$\"\n           ng-disabled=\"form.readonly\"\n           pick-a-time=\"form.pickatime\"\n           form=\"form\"\n           name=\"{{form.key.slice(-1)[0]}}\"\n     />\n    <span ng-if=\"form.fieldAddonRight\"\n          class=\"input-group-addon\"\n          ng-bind-html=\"form.fieldAddonRight\"></span>\n  </div>\n  <span class=\"help-block\">{{ (hasError() && errorMessage(schemaError())) || form.description}}</span>\n</div>\n"); }]);
angular.module('schemaForm').directive('pickATime', function () {
        
    return {
        restrict: 'A',
        require: 'ngModel',
        scope: {
            ngModel: '=',
            pickATime: '=',
            form: '='
        },
        link: function (scope, element, attrs, ngModel) {
            //Bail out gracefully if pickadate is not loaded.
            if (!element.pickatime) {
                return;
            }
            
            var opts = {
                onClose: function () {
                    element.blur();
                },
                formatSubmit: null
            };
            if (scope.pickATime) {
                angular.extend(opts, scope.pickATime);
            }
            if (scope.form.interval) {
                angular.extend(opts, { interval: scope.form.interval });
            }
            if (scope.form.minTime) {
                angular.extend(opts, { min: scope.form.minTime });
            }
            if (scope.form.maxTime) {
                angular.extend(opts, { max: scope.form.maxTime });
            }
            if (scope.form.format) {
                angular.extend(opts, { format: scope.form.format });
            }
            if (scope.form.formatLabel) {
                angular.extend(opts, { formatLabel: scope.form.formatLabel });
            }
            if (scope.form.formatSubmit) {
                angular.extend(opts, { formatSubmit: scope.form.formatSubmit });
            }
            //element.pickadate(opts);
            element.pickatime(angular.extend(opts, {
                onStart: function () {
                    this.$root.attr('data-tap-disabled', true);
                },
                container: document.body
            }));
            
            var defaultFormat = 'HH:i A';                                    
            var picker = element.pickatime('picker');

            //The view value
            ngModel.$formatters.push(function (value) {
                if (angular.isUndefined(value) || value === null) {
                    return value;
                }
                
                picker.set('view', value);
                picker.set('highlight', value);

                return picker.get('highlight', scope.form.format || defaultFormat);
            });

            ngModel.$parsers.push(function () {                
                return picker.get('select', scope.form.formatSubmit || defaultFormat);                
            });
        }
    };
});

angular.module('schemaForm').config(
['schemaFormProvider', 'schemaFormDecoratorsProvider', 'sfPathProvider',
  function (schemaFormProvider, schemaFormDecoratorsProvider, sfPathProvider) {

      var timepicker = function (name, schema, options) {
          if (schema.type === 'string' && (schema.format === 'time')) {
              var f = schemaFormProvider.stdFormObj(name, schema, options);
              f.key = options.path;
              f.type = 'timepicker';
              options.lookup[sfPathProvider.stringify(options.path)] = f;
              return f;
          }
      };

      schemaFormProvider.defaults.string.unshift(timepicker);

      //Add to the bootstrap directive
      schemaFormDecoratorsProvider.addMapping(
        'bootstrapDecorator',
        'timepicker',
        'directives/decorators/bootstrap/datepicker/timepicker.html'
      );
      schemaFormDecoratorsProvider.createDirective(
        'timepicker',
        'directives/decorators/bootstrap/datepicker/timepicker.html'
      );
  }
]);
