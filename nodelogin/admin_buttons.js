const targetDiv = document.getElementById("add");
    targetDiv.style.display = "none";
    const btn = document.getElementById("insert");

    const targetDivDelete = document.getElementById("del");
    targetDivDelete.style.display = "none";
    const btnDelete = document.getElementById("delete");

    const targetDivUpdate = document.getElementById("up");
    targetDivUpdate.style.display = "none";
    const btnUpdate = document.getElementById("update");
    
    btn.onclick = function () {
        if (targetDiv.style.display !== "none") {
            targetDiv.style.display = "none";
        } else {
            targetDiv.style.display = "flex";
            targetDivDelete.style.display = "none";
            targetDivUpdate.style.display = "none";
        }
    }
    
    btnDelete.onclick = function () {
        if (targetDivDelete.style.display !== "none") {
            targetDivDelete.style.display = "none";
        } else {
            targetDivDelete.style.display = "flex";
            targetDiv.style.display = "none";
            targetDivUpdate.style.display = "none";
        }
    }


    btnUpdate.onclick = function () {
        if (targetDivUpdate.style.display !== "none") {
            targetDivUpdate.style.display = "none";
        } else {
            targetDivUpdate.style.display = "flex";
            targetDiv.style.display = "none";
            targetDivDelete.style.display = "none";
        }
    }