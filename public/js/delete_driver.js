function deleteDriver(driverID) {
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
