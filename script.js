
// main variables
var url = 'https://restcountries.eu/rest/v2/name/';
var countriesList = $('#countries');

// click search - running main function
$('#search').click(searchCountries)

// running main function on Enter click
$('#country-name').keypress(function(){
    if (event.which == 13) searchCountries()
});

// hiding div with country flag, section, h2

var cInfo = $('section');
var cFlag = $('#c-flag');
var h2CountriesList = $('h2');
cFlag.hide();
cInfo.hide();
h2CountriesList.hide();

// main function
function searchCountries() {
    var countryName = $('#country-name').val();
    if (!countryName.length) {
        cInfo.hide();
        countriesList.empty();
        h2CountriesList.hide();
    };
   
    $.ajax({
        url: url + countryName,
        method: 'GET',
        success: showCountriesList
    })

    function showCountriesList(resp){
        countriesList.empty();
        countries = resp;
        h2CountriesList.show();
        
        countries.forEach(function(item, index) {
            if(item.name.toLowerCase().includes(countryName.toLowerCase())) {
                $('<li>').text(item.name).attr('key', index).appendTo(countriesList);   
            }           
        })    
    } 
}

// filling in country data after click
$('#countries').on('click', 'li', function(){
    var clickedItem = $(this).attr('key');
    cFlag.show();
    cInfo.show();

    var cname = $('#c-name');
    var capital = $('#cap');
    var population = $('#pop');
    var area = $('#are');
    var language = $('#lan');
    var currency = $('#cur');
    var dialing = $('#dia');

    cname.empty();
    cname.text(countries[clickedItem].name);

    capital.children().text(countries[clickedItem].capital);
    population.children().text(countries[clickedItem].population.toLocaleString("pl-PL"));
    area.children().first().text(countries[clickedItem].area.toLocaleString("pl-PL"));
    language.children().text(countries[clickedItem].languages.map(l => ' ' + l.name));
    currency.children().text(countries[clickedItem].currencies.map(c => c.name + ' - ' + c.code));
    dialing.children().text('+' + countries[clickedItem].callingCodes);

    document.querySelector('img').src = countries[clickedItem].flag;
 });




