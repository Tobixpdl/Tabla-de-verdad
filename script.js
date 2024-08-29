function copySymbol(symbol) {
    navigator.clipboard.writeText(symbol).then(function () {
        showNotification();
    }, function (err) {
        console.error('Error al copiar: ', err);
    });
}

function showNotification() {
    var notification = document.getElementById("notification");
    notification.classList.add("show");
    setTimeout(function () {
        notification.classList.remove("show");
    }, 3000);
}

function captureAndDownload(event) {
    event.preventDefault();

    var element = document.querySelector('.form-container');

    var fileName = `Ejercicio 4.png`;

    html2canvas(element).then(function (canvas) {
        var link = document.createElement('a');
        link.download = fileName;
        link.href = canvas.toDataURL('image/png');
        link.click();
    });
}

function createTable() {
    var numVar = parseInt(document.getElementById("numVar").value);
    var numProp = parseInt(document.getElementById("numProp").value);
    var cols = numVar + numProp + 2;
    var tablePlaceHolder = document.getElementById("tablePlaceHolder");

    if (numVar > 0 && cols > 0) {
        var table = document.createElement("table");
        table.id = "DynamicTable";

        var headerRow = document.createElement("tr");
        for (var j = 1; j <= cols; j++) {
            var headerCell = document.createElement("th");
            var tbHeader = document.createElement("input");
            tbHeader.type = "text";
            tbHeader.id = "header_tb_" + j;

            if (j == 1 && numVar >= 1) {
                tbHeader.value = "p";
                tbHeader.readOnly = true;
            } else if (j == 2 && numVar >= 2) {
                tbHeader.value = "q";
                tbHeader.readOnly = true;
            } else if (j == 3 && numVar >= 3) {
                tbHeader.value = "r";
                tbHeader.readOnly = true;
            } else if (j == 4 && numVar >= 4) {
                tbHeader.value = "s";
                tbHeader.readOnly = true;
            } else if (j == cols - 1) {
                tbHeader.placeholder = "Conclusión";
            } else if (j == cols) {
                tbHeader.value = "Validez";
                tbHeader.readOnly = true;
            } else {
                tbHeader.placeholder = "Proposición " + (j - numVar);
            }
            if(j<=numVar)
            {
                tbHeader.classList.add("table-textbox");
            }
            else{
                tbHeader.classList.add("header-textbox");

            }

            headerCell.appendChild(tbHeader);
            headerRow.appendChild(headerCell);
        }
        table.appendChild(headerRow);

        var rows = Math.pow(2, numVar);
        for (var i = 0; i < rows; i++) {
            var row = document.createElement("tr");
            for (var j = 0; j < cols; j++) {
                var cell = document.createElement("td");
                var tb = document.createElement("input");
                tb.type = "text";
                tb.id = "tb_" + i + "_" + j;

                if (j < numVar) {
                    tb.classList.add("table-textbox");

                    var patternInterval = Math.pow(2, numVar - j - 1);
                    tb.value = (Math.floor(i / patternInterval) % 2 === 0) ? "V" : "F";
                    tb.readOnly = true;
                } else {
                    tb.classList.add("header-textbox");
                }

                cell.appendChild(tb);
                row.appendChild(cell);
            }
            table.appendChild(row);
        }

        // Add table to placeholder
        tablePlaceHolder.innerHTML = "";
        tablePlaceHolder.appendChild(table);

        // Show the save button
        document.getElementById("btnSubmit").style.display = "block";
    }
}