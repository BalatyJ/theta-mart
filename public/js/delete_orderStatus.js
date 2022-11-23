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
    }
  });
}
