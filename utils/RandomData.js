function generateUniqueLastName(length = 6) {
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    let lastName = '';

    for (let i = 0; i < length; i++) {
        lastName += letters.charAt(
            Math.floor(Math.random() * letters.length)
        );
    }

    return lastName.charAt(0).toUpperCase() + lastName.slice(1);
}

function generatePatientName() {
    return `Test ${generateUniqueLastName()}`;
}

module.exports = {
    generatePatientName
};