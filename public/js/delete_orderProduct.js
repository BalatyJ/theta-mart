function deleteOrderProduct(orderProductID) {
    let link = '/delete-orderproduct-ajax/';
    let data = {
        id: orderProductID
    };

    $.ajax({
        url: link,
        type: 'DELETE',
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            window.location.reload(true);
            deleteRow(orderProductID);
        }
    });
}

function deleteRow(orderProductID) {
    let table = document.getElementById("orderproducts-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("data-value") == orderProductID) {
            table.deleteRow(i);
            break;
        }
    }
}