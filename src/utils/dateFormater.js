const months = [
    "January",
    "Febrary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
]
export default function dateFormater(dateObj) {
    const corTime = new Date(Number(dateObj))
    return `${corTime.getDate()} ${
        months[corTime.getMonth()]
    } ${corTime.getFullYear()}`
}
