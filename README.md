# ActiveAdmin + AlpineJS

Since ActiveAdmin uses jQuery and Select2 for its interactive elements, there may be problems when using Alpine. This package tries to collect fixes for the different issues that may arise.

## x-model + Select2

Alpine has no idea what Select2 is doing and Select2 has no idea what Alpine is doing. This fix checks for the existence of a custom data attribute to subscribe to the element's Select2 event to update the data variable in Alpine, and then it watches the Alpine variable to update the value of the Select2 element.

```javascript
import { select2 } from 'active-admin-alpinejs-fixes';

window.alpineFixes = select2;

```

```ruby
form do |f|
  f.inputs 'x-init': 'alpineFixes.select2.init',
            'x-data': CGI.escapeHTML("{...#{f.resource.attributes.to_json}}") do

    f.input :choices,
      input_html: {
        'x-model': 'choices'
      }
  end
end
```

## Alpine + has_many

The nested has_many form creates new items by duplicating the last item of the form using jQuery. Alpine doesn't like this. This fix subscribes to the `has_many_add:after` event, iterates through all the elements of the form and fixes the `x-model` attributes to use the index of the array. In addition, the method (`getAttributeIdx`) can be used when adding an inline function where it's important to know which element is being used.

```javascript
import { hasMany } from 'active-admin-alpinejs-fixes';

window.alpineFixes = { hasMany: { init: hasMany.init, getAttributeIdx: hasMany.getAttributeIdx }};
// or
window.alpineFixes = { ...hasMany };

```

```ruby
form do |f|
  f.inputs 'x-init': "alpineFixes.hasMany.init",
            'x-data':
              CGI.escapeHTML("{
                choices: #{f.resource.choices.to_json},
              }") do

    f.has_many :choices, allow_destroy: true do |co, i|

      # has_many index starts with 1
      co.input :name, input_html: {
        'x-model': "choices[#{i - 1}].name"
      }

      # Uncheck all checkboxes except the one being clicked.
      co.input :main_choice, as: :boolean, input_html: {
        'x-model': "choices[#{i - 1}].main_choice",
        'x-on:change': "(e) => {
          if (e.target.checked) {
            choices = choices.map((c, i) => ({
              ...c, main_choice: (i === alpineFixes.hasMany.getAttributeIdx($el))
            }))
          } }"
      }
    end
  end
end
```
