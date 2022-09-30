import millify from "millify";
const format = (value: number | string | any) => {
    return millify(value)
};
export default format;