function deleteOrderStatus(statusID) {
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
