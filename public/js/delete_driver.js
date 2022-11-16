function deleteDriver(driverID) {
    let link = '/delete-driver-ajax/';
    let data = {
        id: driverID
    };

    $.ajax({
        url: link,
        type: 'DELETE',
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            window.location.reload(true);
            deleteRow(driverID);
        }
    });
}

function deleteRow(driverID) {
    let table = document.getElementById("driver-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("data-value") == driverID) {
            table.deleteRow(i);
            break;
        }
    }
}

