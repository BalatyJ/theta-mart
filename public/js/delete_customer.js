function deleteCustomer(customerID) {
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