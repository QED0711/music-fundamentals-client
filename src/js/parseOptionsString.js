
// takes in an option instring in the format:
// "<key>:<value>,<key>:<value>,<key>:<value>..."
// returns an object with each key value pair in standard format

const parseOptionsString = (str) => {
    let separated = str.split(",");
    let options = {}
    separated.forEach(option => {
        option=option.split(":")
        options[option[0]] = option[1]
    })
    return options
}

export default parseOptionsString;