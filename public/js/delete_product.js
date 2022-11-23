function deleteProduct(productID) {
  let link = '/delete-product-ajax/';
  let data = {
    id: productID
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
      alert("Could not delete. This product is used in an order, so it cannot be deleted.")
    }
  });
}