let updateorderStatus = document.getElementById('update-orderStatus-form-ajax');

updateorderStatus.addEventListener('submit', function (e) {
    e.preventDefault();

    let inputOrderStatus = document.getElementById('update-orderStatus');
    let inputDescription = document.getElementById('update-description');

    let inputOrderStatusValue = inputOrderStatus.value;
    let inputDescriptionValue = inputDescription.value;

    let data = {
        orderstatus_id: inputOrderStatusValue,
        description: inputDescriptionValue,
    };

    var xhttp = new XMLHttpRequest();
    xhttp.open('PUT', '/orderStatuses/:put-orderStatus-ajax', true);
    xhttp.setRequestHeader('Content-type', 'application/json');

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            updateOrderStatusRow(xhttp.response, inputOrderStatus);

        } 
        
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log('There was an error with the input');
        }
    };
    // Force page refresh on Submit
    xhttp.onload = function () {
      location.reload();
    };
  
    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
  })


function updateOrderStatusRow (data, orderStatusID) {
    let parsedData = JSON.parse(data);

    let table = document.getElementById('orderstatus-table');

    for (let i = 0, row; (row = table.rows[i]); i++) {

    if (table.rows[i].getAttribute('data-value') === orderStatusID) {

        let updateRowIndex = table.getElementsByTagName('tr')[i];
      
        let td = updateRowIndex.getElementsByTagName('td')[1];
      
        td.innerHTML = parsedData[0].name;
    }
  }
}


function autofill() {
  let selectElement = document.getElementById('update-orderStatus');
  let selectElement_id = selectElement.value;

  let table = document.getElementById('orderstatus-table');

  for (let i = 0, row; row = table.rows[i]; i++) {
    console.log(table.rows[i].getAttribute('data-value'));
    if (table.rows[i].getAttribute('data-value') == selectElement_id) {

       let updateRowIndex = table.getElementsByTagName("tr")[i];
       

       let td = updateRowIndex.getElementsByTagName("td")[1];
       
       console.log(td);

       document.getElementById('update-description').value = td.innerHTML;
    }
  }
}
