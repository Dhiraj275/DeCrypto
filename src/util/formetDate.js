
const formetDate = (ts) => {
    var date = new Date(ts).toString().split(" ");
    const time = date[4].split(":");
    const hours = Number(time[0]);
    const minutes = time[1];
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12; // Ensure 12-hour format

    const formattedDate = `${date[0]} ${date[1]} ${date[2]} ${date[3]} ${formattedHours}:${minutes} ${ampm}`;
    return(formattedDate)
}

export default formetDate