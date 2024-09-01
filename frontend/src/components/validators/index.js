export const loginValidation = (email, password) => {
    if(email === "" || password === "") return {res: false, mes: "No field can be empty"}
    if(!validateEmail(email)) return {res: false, mes: "Email format incorrect"}
    else return {res: true, mes: "passed"}
}

export const registerValidation = (email, first, last, password) => {
    if(email === "" || password === "" || first === "" || last === "") return {res: false, mes: "No field can be empty"}
    if(!validateEmail(email)) return {res: false, mes: "Email format incorrect"}
    else return {res: true, mes: "passed"}   
}

export const addBookValidation = ({title, genre, author, language, pageCount, publisher}) => {
    if(title === "" || genre === "" || author === "" || pageCount === "" || language === "" || publisher === "") return {res: false, mes: "No field can be empty"};
    else return {res: true, mes: "passed"}
}

const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };