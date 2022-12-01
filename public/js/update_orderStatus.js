// Get the objects we need to modify
let updateorderStatus = document.getElementById('update-orderStatus-form-ajax');

// Modify the objects we need
updateorderStatus.addEventListener('submit', function (e) {

  // Prevent the form from submitting
  e.preventDefault();


  // Get form fields we need to get data from
  let inputOrderStatus = document.getElementById('update-orderStatus');
  let inputDescription = document.getElementById('update-description');

  // Get the values from the form fields
  let inputOrderStatusValue = inputOrderStatus.value;
  let inputDescriptionValue = inputDescription.value;

  // Put our data we want to send in a javascript object
  let data = {
    orderstatus_id: inputOrderStatusValue,
    description: inputDescriptionValue
  };

  // Setup our AJAX request
  var xhttp = new XMLHttpRequest();
  xhttp.open('PUT', '/orderStatuses/:put-orderStatus-ajax', true);
  xhttp.setRequestHeader('Content-type', 'application/json');

  // Tell our AJAX request how to resolve
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status != 200) {
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


// When the PK is selected for the Update form, the fields in the 
// form get automatically selected or filled out based on the PK selected.
function autofill() {
  // Get the ID of our update form and the value of the PK dropdown selected.
  let selectElement = document.getElementById('update-orderStatus');
  let selectElement_id = selectElement.value;

  if (selectElement_id === '') {
    // If the default option is selected, all the values should be set to the default value.
    document.getElementById('update-description').value = ''
  }
  let table = document.getElementById('orderstatus-table');

  // Otherwise, we loop through the table, find the row corresponding to the selected PK.
  for (let i = 0, row; row = table.rows[i]; i++) {
    console.log(table.rows[i].getAttribute('data-value'));

    if (table.rows[i].getAttribute('data-value') == selectElement_id) {

      // Then we update the update form's fields with the corresponding values from the table.

      let updateRowIndex = table.getElementsByTagName("tr")[i];


      let td = updateRowIndex.getElementsByTagName("td")[1];

      document.getElementById('update-description').value = td.innerHTML;
    }
  }
}
