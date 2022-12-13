function tinhtuoi(dob) {
    return new Date().getFullYear() - new Date(dob).getFullYear();
}

console.log(tinhtuoi('01-12-1990'));


const Tinhtuoi = (dob) => {
    return new Date().getFullYear() - new Date(dob).getFullYear();
}


console.log(Tinhtuoi('01-12-1990'));