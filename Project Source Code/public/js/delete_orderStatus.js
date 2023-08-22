// Citation for delete data:
// Date: 10/27/2022
// Adapted from:
// https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data

function deleteOrderStatus(statusID) {
  // We set up our ajax request, where we include the statusID as data, and send a request to our app.js
  // as a DELETE request. If the request successfully returns, the webpage is refreshed. Otherwise,
  // an alert is posted letting the user know why the deletion failed.

  let link = '/delete-orderStatus-ajax/';
  let data = {
    id: statusID
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
      alert("Could not delete. This status is used in an order, so it cannot be deleted.")
    }
  });
}
