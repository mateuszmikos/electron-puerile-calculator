var result = 0;
var last_char = '+';
var first_char = '';

function clear_input_output() {
    $('#input-output').val('');
}

function clear_add_output() {
    $('#add-output').text('');
}

function clear_all() {
    clear_input_output();
    clear_add_output();
    result = 0;
    last_char = '+';
    first_char = '';
}

function filterOutput(input) {
    return input.replace(/[^0-9.]+/g, '');
}

function calc_it(o)
{
    if (o.includes('.')) o = parseFloat(o);
    else o = parseInt(o, 10);
    
    switch(last_char) {
        case '+':
            result += o;
            break;
        case '-':
            result -= o;
            break;
        case '/':
            result /= o;
            break;
        case '*':
            result *= o;
            break;
    }
}

function input_output(e = null) {
    if (e !== null) {
        if (e.which == 13) {
            $('#input-output').val($('#input-output').val() + '=');
        } else if (e.which == 127 || e.which == 27) {
            clear_all();
        }
    }
    
    let input = $('#input-output').val();
    input = input.replace(',', '.');
    let output = filterOutput(input);
    let length = input.length;
    let last = input.charAt(length-1);
    let first = input.charAt(0);
    let add_output = $('#add-output').text();

    $('#input-output').val(output);


    if (length == 1) {
        if (first == '+' || first == '/' || first == '*') {
            clear_input_output();
        } else if (first == '-') {
            clear_input_output();
            last_char = '-';
            $('#add-output').text('-');
        } else if (first == '.') {
            $('#input-output').val('0.');
        } else if (first == ',') {
            $('#input-output').val('0.');
        }
    } else {
        if (last == '+' || last == '-' || last == '/' || last == '*' || last == '=') {
            calc_it(output);
            clear_input_output();
            if (last == '=') {
                $('#add-output').text(add_output + input + result + '; ');
                $('#input-output').val(result);
                result = 0;
            } else {
                last_char = last;
                $('#add-output').text(add_output + output + last_char);
            }
        }
    }
}


$('.key').on('click', function() {
    var key = $(this).text();
    $('#input-output').val($('#input-output').val() + key);
    input_output();
});

$('#clear').on('click', function() {
    clear_all();
});

$('#input-output').on('keyup', function(e) {
    input_output(e);
});