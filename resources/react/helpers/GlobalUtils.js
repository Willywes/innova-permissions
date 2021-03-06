export const setInputError = (input, message) => {
    try {
        // console.log(input);
        const element = document.getElementById(input);
        const formGroup = element.parentElement;
        element.classList.add('is-invalid');
        formGroup.querySelector('.invalid-feedback').innerHTML = message;
    } catch (e) {

    }
}

export const setCleanInputError = e => {
    try {
        const element = document.getElementById(e.target.id);
        const formGroup = element.parentElement;
        element.classList.remove('is-invalid');
        formGroup.querySelector('.invalid-feedback').innerHTML = '';
    } catch (e) {
    }
}

export const setCleanInputErrorById = (idName) => {
    try {
        const element = document.getElementById(idName);
        const formGroup = element.parentElement;
        element.classList.remove('is-invalid');
        formGroup.querySelector('.invalid-feedback').innerHTML = '';
    } catch (e) {
    }
}

export const formatAmount = (number) => {
    return new Intl.NumberFormat("de-DE").format(number)
}

export const formatNumber = (number) => {
    return new Intl.NumberFormat("de-DE").format(number)
}

export const formatMoney = (number) => {
    return '$' + new Intl.NumberFormat("de-DE").format(number)
}

export const formatPhone = (number) => {
    try {
        let onlyNumbers = /^[0-9]+$/;

        if (number.match(onlyNumbers) && number.length <= 9) {
            return true;
        } else if (number == "") {
            return true;
        }

        return false;
    } catch (e) {
    }
}

export const phoneLength = (number) => {
    try {
        if (number.length <= 12) {
            return true;
        } else if (number == "") {
            return true;
        }
        return false;
    } catch (e) {
    }
}

// const capitalizeChar = e => {
//     let string = e.target.value
//         .toLowerCase()
//         .split(" ")
//         .map(word => word.charAt(0).toUpperCase() + word.substring(1))
//         .join(" ");

//     setModel({
//         ...model,
//         [e.target.name]: checkKeyName(string)
//     });
// }

// function checkKeyName(string){
//     var clean = string.replace(/[^a-zA-Z?????????????????????????? ]/g, "");
//     console.log('Cleaned: ', clean);
// }


export const capitalizeFirstLetterOfEachWord = (value) => {
    try {

        let string = value
            .toLowerCase()
            .split(" ")
            .map(word => word.charAt(0).toUpperCase() + word.substring(1))
            .join(" ");

        string = string.replace(/[^a-zA-Z?????????????????????????? ]/g, "");

        return string;

    } catch (e) {
    }
};

export const getShortSpanishDayName = day => {
    switch (day) {
        case 0:
            return "DOM";
        case 1:
            return "LUN";
        case 2:
            return "MAR";
        case 3:
            return "MIE";
        case 4:
            return "JUE";
        case 5:
            return "VIE";
        case 6:
            return "SAB";
    }
};

export const slug = (str) =>{
    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();

    // remove accents, swap ?? for n, etc
    let from = "??????????????????????????????????????????????/_,:;";
    let to   = "aaaaeeeeiiiioooouuuunc------";
    for (var i=0, l=from.length ; i<l ; i++) {
        str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
        .replace(/\s+/g, '-') // collapse whitespace and replace by -
        .replace(/-+/g, '-'); // collapse dashes

    return str;
}

export const reactSelectAdapter = (array) => {
    let data = [];
    array.map(item => {
        data = [
            ...data, {
                value: item.id,
                label: item.name ? item.name : item.label,
            }
        ]
    });
    return data;
}
