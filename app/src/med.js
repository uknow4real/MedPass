import $ from 'jquery'; 

$('pure-form pure-form-stacked input:text')
    .replaceWith('<select id="txtQuantity" name="txtQuantity" class="ProductDetailsQuantityTextBox">' +
          '<option value="1">1</option>' +
          '<option value="2">2</option>' +
          '<option value="3">3</option>' +
          '<option value="4">4</option>' +
          '<option value="5">5</option>' +
        '</select>');


let inputs = document.querySelectorAll('input[type=text]');
console.log(inputs);