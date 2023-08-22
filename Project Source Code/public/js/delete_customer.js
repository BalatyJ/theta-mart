// Citation for delete data:
// Date: 10/27/2022
// Adapted from:
// https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data

function deleteCustomer(customerID) {
  // We set up our ajax request, where we include the customerid as data, and send a request to our app.js
  // as a DELETE request. If the delete's successful, we refresh the page. Otherwise, we post an alert letting
  // the user know why it failed.

  let link = '/customers/:delete-customer-ajax/';
  let data = {
    id: customerID
  };

  $.ajax({
    url: link,
    type: 'DELETE',
    data: JSON.stringify(data),
    contentType: "application/json; charset=utf-8",
    success: function (result) {
      window.location.reload();
    },
    error: function () {
      alert("Customer could not be deleted because they have made one or more orders.")
    }
  });
}
