import moment from "moment";

let alphaRule = propertyType => {
  return v =>
    /[a-zA-Z ñÑáéíóúÁÉÍÓÚ]+$/.test(v) ||
    `Solo se permiten letras y espacios para el campo ${propertyType}`;
};

let required = propertyType => {
  return v => !!v || `El campo ${propertyType} es obligatorio`;
};

let selectRequired = propertyType => {
  return v => !!v || `El campo ${propertyType} es obligatorio`;
};

let fileRequired = propertyType => {
  return v => !!v || `El archivo ${propertyType} es obligatorio`;
  //return v => (v && v.length > 0) || `El archivo ${propertyType} es obligatorio`;
};

let minLength = (propertyType, minLength) => {
  return v =>
    v.length >= minLength ||
    `Utilice como mínimo ${minLength} caracteres para ${propertyType}`;
};

//Valida el máxima de caractares seguún el parámetro que se envíe (maxLength)
let maxLength = (propertyType, maxLength) => {
  return v =>
    v.length <= maxLength ||
    `Máximo número de caracteres sobrepasado  ${maxLength} para el campo ${propertyType}`;
};


//Caracteres especiales
let specialChars = (propertyType) => {
  return v => !/^[-.: ,;+ñáéíóúÚÓÍÉÁa-zA-Z0-9_#$%&/()]$/.test(v) || `No se permieten caracteres especiales para el campo ${propertyType}. Caracteres válidos: -.:,;+a-zA-Z0-9_#$%&/()`;
};


let maxLengthForm10 = (propertyType) => {
  return v => /^[-.: ,;+ñáéíóúÚÓÍÉÁa-zA-Z0-9_#$%&/()]{0,10}$/.test(v) || `Máximo número de caracteres sobrepasa 10 o ingresó un caracter que no es válido para el campo ${propertyType}, caracteres válidos: -.:,;+a-zA-Z0-9_#$%&/()`;
};
let maxLengthForm15 = (propertyType) => {
  return v => /^[-.: ,;+ñáéíóúÚÓÍÉÁa-zA-Z0-9_#$%&/()]{0,15}$/.test(v) || `Máximo número de caracteres sobrepasa 15 o ingresó un caracter que no es válido para el campo ${propertyType}, caracteres válidos: -.:,;+a-zA-Z0-9_#$%&/()`;
};
let maxLengthForm20 = (propertyType) => {
  return v => /^[-.: ,;+ñáéíóúÚÓÍÉÁa-zA-Z0-9_#$%&/()]{0,20}$/.test(v) || `Máximo número de caracteres sobrepasa 20 o ingresó un caracter que no es válido para el campo ${propertyType}, caracteres válidos: -.:,;+a-zA-Z0-9_#$%&/()`;
};
let maxLengthForm50 = (propertyType) => {
  return v => /^[-.: ,;+ñáéíóúÚÓÍÉÁa-zA-Z0-9_#$%&/()]{0,50}$/.test(v) || `Máximo número de caracteres sobrepasa 50 o ingresó un caracter que no es válido para el campo ${propertyType}, caracteres válidos: -.:,;+a-zA-Z0-9_#$%&/()`;
};
let maxLengthForm100 = (propertyType) => {
  return v => /^[-.: ,;+ñáéíóúÚÓÍÉÁa-zA-Z0-9_#$%&/()]{0,100}$/.test(v) || `Máximo número de caracteres sobrepasa 100 o ingresó un caracter que no es válido para el campo ${propertyType}, caracteres válidos: -.:,;+a-zA-Z0-9_#$%&/()`;
};
let maxLengthForm200 = (propertyType) => {
  return v => /^[-.: ,;+ñáéíóúÚÓÍÉÁa-zA-Z0-9_#$%&/()]{0,200}$/.test(v) || `Máximo número de caracteres sobrepasa 200 o ingresó un caracter que no es válido para el campo ${propertyType}, caracteres válidos: -.:,;+a-zA-Z0-9_#$%&/()`;
};
let maxLengthForm300 = (propertyType) => {
  return v => /^[-.: ,;+ñáéíóúÚÓÍÉÁa-zA-Z0-9_#$%&/()]{0,300}$/.test(v) || `Máximo número de caracteres sobrepasa 300 o ingresó un caracter que no es válido para el campo ${propertyType}, caracteres válidos: -.:,;+a-zA-Z0-9_#$%&/()`;
};
let maxLengthForm500 = (propertyType) => {
  return v => /^[-.: ,;+ñáéíóúÚÓÍÉÁa-zA-Z0-9_#$%&/()]{0,500}$/.test(v) || `Máximo número de caracteres sobrepasa 500 o ingresó un caracter que no es válido para el campo ${propertyType}, caracteres válidos: -.:,;+a-zA-Z0-9_#$%&/()`;
};
let maxLengthForm1000 = (propertyType) => {
  return v => /^[-.: ,;+ñáéíóúÚÓÍÉÁa-zA-Z0-9_#$%&/()]{0,1000}$/.test(v) || `Máximo número de caracteres sobrepasa 1000 o ingresó un caracter que no es válido para el campo ${propertyType}, caracteres válidos: -.:,;+a-zA-Z0-9_#$%&/()`;
};
let latitudForm = (propertyType) => {
  return v => /^[+-]?(([1-8]?[0-9])(\.[0-9]{1,6})?|90(\.0{1,6})?)$/.test(v) || `El valor que ingresó en el campo ${propertyType} no es válido`;
};
let longitudForm = (propertyType) => {
  return v => /^[+-]?((([1-9]?[0-9]|1[0-7][0-9])(\.[0-9]{1,6})?)|180(\.0{1,6})?)$/.test(v) || `El valor que ingresó en el campo ${propertyType} no es válido`;
};

let validEmail = propertyType => {
  let reg= /.+@.+\..+/
  return v => reg.test(v) || `${propertyType} correo electrónico inválido`;
};
let gradosForm = (propertyType) => {
  return v => /^[+-]?((([0-9]|[1-8][0-9]|90)?)|((9[1-9]|1[0-7][0-9]|180)?)|((18[1-9]|19[0-9]|2[0-6][0-9]|270)?)|((27[1-9]|2[8-9][0-9]|3[0-5][0-9]|360)?))(\.[0-9]{1,4})?$/.test(v) || `El valor que ingresó en el campo ${propertyType} no es válido`;
};
let minutosForm = (propertyType) => {
  return v => /^[+-]?((([0-9]|[1-8][0-9]|90)?)|((9[1-9]|1[0-7][0-9]|180)?)|((18[1-9]|19[0-9]|2[0-6][0-9]|270)?)|((27[1-9]|2[8-9][0-9]|3[0-5][0-9]|360)?))(\.[0-9]{1,4})?$/.test(v) || `El valor que ingresó en el campo ${propertyType} no es válido`;
};
let segundosForm = (propertyType) => {
  return v => /^[+-]?((([0-9]|[1-8][0-9]|90)?)|((9[1-9]|1[0-7][0-9]|180)?)|((18[1-9]|19[0-9]|2[0-6][0-9]|270)?)|((27[1-9]|2[8-9][0-9]|3[0-5][0-9]|360)?))(\.[0-9]{1,4})?$/.test(v) || `El valor que ingresó en el campo ${propertyType} no es válido`;
};
let dateFormat = propertyType => {
  //return v => moment(String(v)).format('DD/MM/YYYY') || 'Fecha Inválida'
  return v =>
    /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/.test(v) ||
    `${propertyType} Fecha inválida`;
};
let onlyNit = propertyType => {
  return v => /^[0-9]+(-?[0-9kK])?$/.test(v) || `Debe de ingresar un ${propertyType} válido.`;
};
let onlyInteger = propertyType => {
  return v =>
    /[0-9]$/.test(v) || `${propertyType} Debe de ingresar un número entero`;
};

let minNumber = (propertyType, min) => {
  return v =>
    (v && v > min) ||
    `El número ingresado para ${propertyType} debe ser mayor a ${min}`;
};

//
let maxNumber = (propertyType, max) => {
  return v =>
    (v && v <= max) ||
    `El número ingresado para ${propertyType} debe ser menor a ${max}`;
};

let cuiFormat = (propertyType, max) => {
  return v =>
    (v && v <= max) ||
    `El número ingresado para ${propertyType} debe ser menor a ${max}`;
};

//Que pueden ingresar números de telefono separados por comas
let phoneNumbers = propertyType => {
  return v =>
    !/[^0-9 .,()+]$/.test(v) ||
    `Solo se permiten valores numéricos,  ( ) y comas para el campo ${propertyType}`;
};

//Validar fecha, que sea mayor a la ingresada
let dateGreatherThan = (propertyType, date) => {
  return v =>
    moment(date, "DD-MM-YYYY").diff(moment(v, "DD-MM-YYYY")) < 0 ||
    `La fecha ingresada debe ser mayor a ${date}`;
};

//Validar 2 decimales
let decimals = (propertyType) => {
  return v =>
  /^\d+(\.\d{1,2})?$/.test(v) ||
    `Solo se permiten valores decimales para ${propertyType}`;
};

//Validar 4 decimales
let decimals4 = (propertyType) => {
  return v =>
  /^\d+(\.\d{1,4})?$/.test(v) ||
    `Solo se permiten valores decimales para ${propertyType}`;
};

export default {
  alphaRule,
  required,
  minLength,
  maxLength,
  specialChars,
  validEmail,
  selectRequired,
  fileRequired,
  dateFormat,
  onlyInteger,
  minNumber,
  maxNumber,
  phoneNumbers,
  dateGreatherThan,
  cuiFormat,
  decimals,
  decimals4,
  maxLengthForm15,
  maxLengthForm500,
  maxLengthForm1000,
  maxLengthForm50,
  maxLengthForm300,
  latitudForm,
  longitudForm,
  gradosForm,
  minutosForm,
  segundosForm,
  maxLengthForm10,
  onlyNit,
  maxLengthForm200,
  maxLengthForm20,
  maxLengthForm100
};
