

<h1>Timepicker add-on for Angular Schema Form using pickadate</h1>

<p>This is an add-on for <a href="https://github.com/Textalk/angular-schema-form/">Angular Schema Form</a>.</p>

<p>Now you can have time picker in Schema Form! The time picker add-on uses the excellent jQuery-based time picker,
<a href="http://amsul.ca/pickadate.js/">pickadate.js</a>.</p>

<h2>Installation</h2>
<p>The time picker is an add-on to the Bootstrap decorator. To use it, just include
<code>angular-timepicker.js</code> <em>after</em> <code>bootstrap-decorator.min.js</code>.</p>

<p>You'll need to load a few additional files to use pickadate <strong>in this order</strong>:</p>

<ol>
<li>jQuery (pickatime depends on it)</li>
<li>The pickatime source files (see time picker <a href="http://amsul.ca/pickadate.js/time/">time picker</li>
<li>The pickatime CSS (you'll have to choose theme)</li>
<li>Translation files for whatever language you want to use</li>
</ol>



    $scope.schema = {
        "type": "object",
        "properties": {
            "EventTime": {
                "title": "Bday",
                "type": "string",
                "format": "time"                
            }
        }
    };

    $scope.form = [
      {
          "key": "EventTime",
          "type": "timepicker",
          "interval": 20,
          "minTime": [8, 20],
          "maxTime": [15, 20],
          "format": "T!ime selected: h:i a",
          "formatLabel": "<b>h</b>:i <!i>a</!i>",
          "formatSubmit": "HH:i",
      },
        {
            "type": "submit",
            "style": "btn-info",
            "title": "OK"
        }
    ];  
    $scope.model = {
        "EventTime": "12:20 PM"
    };
