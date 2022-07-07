var DataArray = []
let fetchRest = fetch('https://restcountries.com/v3.1/all')
fetchRest
  .then((res) => res.json())
  .then((data) => {
    DataArray = data
    randerTable(data)
  })

function randerTable(data) {
  if (data.length > 0) {
    document.getElementById('preloader').style.display = 'none'
    var html =
      ' <table class="table table-bordered border-dark text-center" id="myTable" >'
    html += '<thead>'
    html += '<tr>'
    html += '<th scope="col">' + `Name` + '</th>'
    html += '<th scope="col">' + `Official Name` + '</th>'
    html += '<th scope="col">' + `Capital` + '</th>'
    html += '<th scope="col">' + `Region` + '</th>'
    html += '<th scope="col">' + `Area` + '</th>'
    html += '<th scope="col">' + `Population` + '</th>'
    html += '<th scope="col">' + `Flag` + '</th>'
    html += '</tr>'
    html += '</thead>'
    html += '<tbody>'
    for (let index = 0; index < data.length; index++) {
      var rowColor = ''
      if (data[index].area >= 0 && data[index].area <= 1000) {
        rowColor = 'grey'
      }
      if (data[index].area >= 1001 && data[index].area <= 5000) {
        rowColor = 'yellow'
      }
      if (data[index].area >= 5001 && data[index].area <= 10000) {
        rowColor = 'green'
      }
      if (data[index].area > 100000) {
        rowColor = 'red'
      }
      html += '<tr style="background-color:' + rowColor + '">'
      html += '<td>' + data[index].name.common + '</td>'
      html += '<td>' + data[index].name.official + '</td>'
      html += '<td>' + data[index].capital + '</td>'
      html += '<td>' + data[index].region + '</td>'
      html += '<td>' + data[index].area + '</td>'
      html += '<td>' + data[index].population + '</td>'
      html += '<td>' + data[index].flag + '</td>'
      html += '</tr>'
    }

    html += '</tbody>'
    html += '</table>'
    var btnHtml = '<div class="btn">'
    btnHtml += ' <button onclick="sortAscending()">' + `ASC` + '</button>'
    btnHtml += '</div>'
    btnHtml += '<div class= "btn">'
    btnHtml += ' <button onclick="sortDescending()">' + `DESC` + '</button>'
    btnHtml += '</div>'

    document.getElementById('countries-table').innerHTML = html
    document.getElementById('btn-sort').innerHTML = btnHtml
  } else {
    document.getElementById('preloader').style.display = 'block'
  }
}
function searchData() {
  searchText = document.getElementById('search-countries').value.toLowerCase()
  var SearchResult = DataArray.filter((element) => {
    return element.name.common.toLowerCase().includes(searchText)
  })
  randerTable(SearchResult)
}
function sortAscending() {
  DataArray.sort(function (a, b) {
    return a.population - b.population
  })
  randerTable(DataArray)
}
function sortDescending() {
  DataArray.sort(function (a, b) {
    return b.population - a.population
  })
  randerTable(DataArray)
}
