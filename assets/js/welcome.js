function welcome() {
    var today = new Date();
    var hours = today.getHours();

    if(hours > 12 && hours < 18) {
        document.write("Boa-tarde");
    } else if(hours <= 12 && hours >= 6) {
        document.write("Bom-dia");
    } else {
        document.write("Boa-noite");
    }
}