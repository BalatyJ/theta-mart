function deleteDriver(driverID) {
  // We set up our ajax request, where we include the driverid as data, and send a request to our app.js
  // as a DELETE request. Once the request has successfully returned, the webpage is refreshed.

  let link = "/delete-driver-ajax/";
  let data = {
    id: driverID
  };

  $.ajax({
    url: link,
    type: "DELETE",
    data: JSON.stringify(data),
    contentType: "application/json; charset=utf-8",
    success: function (result) {
      window.location.reload(true);
    }
  });
}
