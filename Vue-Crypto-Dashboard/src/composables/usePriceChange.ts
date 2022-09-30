const priceChanged = (value: string | number | any) => {
    if (value.toString().includes("-")) {
        return value;
    } else {
        return ""
    }
};

export default priceChanged;