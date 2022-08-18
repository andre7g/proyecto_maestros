//import axios from "axios";
//import ApiService from "@/core/services/api.service";
// action types
export const OBTENER_ITEMS = "obtenerItems";
export const OBTENER_ITEMS_ITEM = "obtenerItemsItem";
// mutation types
export const SET_ITEMS = "setItems";
export const SET_ITEM = "setItem";


const state = {
    items: [],
    item: []
  };
  
const getters = {
obtnenerItems(state) {
    return state.items;
}
};



const generos = [{id: 1, nombreGenero: 'Masculino'}, {id: 2, nombreGenero: 'Femenino'}];

const areasBeneficiadas = [{id: 1, nombreArea: 'Rural'}, {id: 2, nombreArea: 'Urbana'}];

const etnias = [{id: 1, nombreEtnia: 'Indigena'}, {id: 2, nombreEtnia: 'No Indigena'}];

const rangosEdad = [{id: 1, rango: '0-15'}, {id: 2, rango: '16-49'}, {id: 3, rango: 'mayor 50'}];

const tiposIngreso = [{id: 1, nombreTipoIngreso: 'Beneficiaria'}, {id: 2, nombreTipoIngreso: 'Coejecutora'}];

const tiposInstrumento = [
  { id: 1,nombreInstrumento: "Convenio Marco de Cooperación Internacional"},
  { id: 2, nombreInstrumento: "Estrategia de programa país"},
  { id: 3, nombreInstrumento: "a. Convenio de donación" },
  { id: 4, nombreInstrumento: "b. Acuerdo de ejecución de proyectos" },
  { id: 5, nombreInstrumento: "c. Notificación de subvención" }
];

const fuentesMultilaterales = [
    { id: 1, nombreFuenteMultilateral: "Programa de las naciones unidas para el desarrollo (PNUD)" },
    { id: 2, nombreFuenteMultilateral: "Fondo Internacional de Desarrollo Agrícola (FIDA)"},
    { id: 3, nombreFuenteMultilateral: "Organización Panamericana de la Salud (OPS)" },
    { id: 4, nombreFuenteMultilateral: "Programa de las Naciones Unidas para el Medio Ambiente (PNUMA)" },
    { id: 5, nombreFuenteMultilateral: "Organización de las Naciones Unidas Para la Agricultura y la Alimentación (FAO)" },
    { id: 6, nombreFuenteMultilateral: "Banco Centroamericano de Integración Económica (BCIE)" }
];

const tiposCooperacion = [
    { id: 1, nombreTipoCooperacion: "Cooperación Financiera No Reembolsable"},
      { id: 2, nombreTipoCooperacion: "Cooperación Técnica No Reembolsable"},
      { id: 3, nombreTipoCooperacion: "Cooperación en Especie No Reembolsable"},
      { id: 4, nombreTipoCooperacion: "Ayuda Humanitaria"}
];

const fuentesBilaterales = [
    { id: 1, nombrePais: "España"},
    { id: 2, nombrePais: "Noruega"},
    { id: 3, nombrePais: "Suecia" },
    { id: 4, nombrePais: "Suiza" }
  ];

const  tiposFuneteCooperante = [
    { id: 1, nombreTipoFuente: "Bilateral" },
    { id: 2, nombreTipoFuente: "Multilateral" },
    { id: 3, nombreTipoFuente: "Otro" }
  ];


const  nivelesInstitucion = [
    { id: 1, nombreNivel: "Nivel 1" },
    { id: 2, nombreNivel: "Nivel 2" },
    { id: 3, nombreNivel: "Nivel 3" }
  ];

const  tiposInstitucion = [
    { id: 1, nombreTipo: "Tipo 1" },
    { id: 2, nombreTipo: "Tipo 2" },
    { id: 3, nombreTipo: "Tipo 3"}
  ];


const sectoresBeneficiados = [
    { id: 1, nombreSectorBeneficiado: "Financieras de Seguros"},
    { id: 2, nombreSectorBeneficiado: "Industria y Comercio"},
    { id: 3, nombreSectorBeneficiado: "Administración Fiscal"},
    { id: 4, nombreSectorBeneficiado: "Agua y Saneamiento"},
    { id: 5, nombreSectorBeneficiado: "Agropecuario"},
    { id: 6, nombreSectorBeneficiado: "Auditoría y Control"},
    { id: 7, nombreSectorBeneficiado: "Ciencia y Tecnología" }
];

const politicasPublicas = [
    { id: 1, nombrePoliticaPublica: "Política Nacional para el Desarrollo de las Micro, Pequeñas y Medianas Empresas."},
    { id: 2, nombrePoliticaPublica: "Política Nacional de Empleo “Generación de empleo seguro, decente y de calidad 2012- 2021”."},
    { id: 3, nombrePoliticaPublica: "Política de protección, asistencia y atención al guatemalteco en el exterior."},
    { id: 4, nombrePoliticaPublica: "Política Energética 2013-2027"},
    { id: 5, nombrePoliticaPublica: "Política Agrícola Centroamericana 2008-2017." }
]


const departamentos = [
    { id: 1, nombre: "Guatemala"},
    { id: 2, nombre: "Escuintla" },
    { id: 3, nombre: "Santa Rosa" },
    { id: 4, nombre: "Jutiapa"}
];

const municipios = [
    { id: 1, nombre: "Guatemala"},
    { id: 2, nombre: "Santa Catarina Pinula"},
    { id: 3, nombre: "San José Pinula"},
    { id: 4, nombre: "San José del Golfo"},
    { id: 5, nombre: "Palencia"}
];


const tiposAprobacionDonacion = [
    {id: 1, nombreTipoAprobacion: 'Acuerdo Ministerial'}, 
    {id: 2, nombreTipoAprobacion: 'Acuerdo Gubernativo'}, 
    {id: 3, nombreTipoAprobacion: 'Resolución'}
];

const modalidadesEjecucion = [
    { id: 1, nombreModalidad: "Ejecutado por el benficiario"},
    { id: 2, nombreModalidad: "Ejecutado por la fuente cooperante"},
    { id: 3, nombreModalidad: "Ejecutado por un tercero" }
]
//Agencias
const agencias = [{id: 1, nombreAgencia: 'Agencia 1'}, {id: 2, nombreAgencia: 'Agencia 2'}];

const subDivisiones = [
    {id: 1, nombreSubDivision: 'Componente'},
    {id: 2, nombreSubDivision: 'Objetivo'},
    {id: 3, nombreSubDivision: 'Indicador'},
    {id: 4, nombreSubDivision: 'Resultado'},
    {id: 5, nombreSubDivision: 'Meta'},
    {id: 6, nombreSubDivision: 'Impacto'},
    {id: 7, nombreSubDivision: 'Proceso'},
    {id: 8, nombreSubDivision: 'Rubro'},
    {id: 9, nombreSubDivision: 'Tramo Variable'},
    {id: 10, nombreSubDivision: 'Tramo Fijo'},
    {id: 11, nombreSubDivision: 'Categoría'}
];

/**
 * 
 */
const actions = {
    async [OBTENER_ITEMS](context, parametros) {
      return new Promise(resolve => {
        
      let endpoint = parametros.endpoint;
    
      let datos = [];
      switch (endpoint){
        case 'Generos' :
          datos = generos
        break;
        case 'AreasBeneficiadas':
          datos = areasBeneficiadas
        break;
        case 'Etnias':
            datos = etnias
        break;
        case 'RangosEdad':
            datos = rangosEdad
        break;
        case 'TiposIngreso':
            datos = tiposIngreso;
        break;
        case 'TiposInstrumento' :
            datos = tiposInstrumento;
        break;
        case 'FuentesMultiLaterales':
            datos = fuentesMultilaterales;
        break;
        case 'TiposFuenteCooperante':
            datos = tiposFuneteCooperante;
        break;
        case 'FuentesBilaterales':
            datos = fuentesBilaterales;
        break;
        case 'NivelesInstitucion':
            datos = nivelesInstitucion;
        break;
        case 'TiposInstitucion':
            datos = tiposInstitucion;
        break;
        case 'TiposCooperacion' :
            datos = tiposCooperacion;
        break;
        case 'TiposAprobacionDonacion':
            datos = tiposAprobacionDonacion;
        break;
        case 'SectoresBeneficiados':
            datos = sectoresBeneficiados;
        break;
        case 'PoliticasPublicas':
            datos = politicasPublicas;
        break;
        case 'Departamentos':
            datos = departamentos;
        break;
        case 'ModalidadesEjecucion':
            datos = modalidadesEjecucion;
        break;
        case 'SubDivisiones':
            datos = subDivisiones;
        break;
        
        
      };

      context.commit(SET_ITEMS, datos);
        
        resolve({
          status: 200,
          message: `Se ha obtenido el listado de condiciones de desembolso con éxito`,
          data: datos
        });
          
          /*
          ApiService.query(`apiconsume/edit/${proyectoId}?endpoint=${endpoint}`)
          .then(({ data }) => {
            context.commit(SET_ITEMS, data.data);
  
            resolve(data);
          })
          .catch(error => {
            console.log(error);
  
            //context.commit(SET_ERROR, response.data.errors);
          });*/
      });
    },



    async [OBTENER_ITEMS_ITEM] (context, parametros){
        //parametros.endpoint y parametros.id
        return new Promise(resolve => {
        
            let endpoint = parametros.endpoint;
          
            let datos = [];
            switch (endpoint){
              case 'Agencias' :
                datos = agencias
              break;
              case 'Municipios' :
                datos = municipios
              break;
            };
            
            context.commit(SET_ITEMS, datos);
                
            resolve({
                status: 200,
                message: `Se ha obtenido el listado de condiciones de desembolso con éxito`,
                data: datos
            });
                
                /*
                ApiService.query(`apiconsume/edit/${proyectoId}?endpoint=${endpoint}`)
                .then(({ data }) => {
                context.commit(SET_ITEMS, data.data);

                resolve(data);
                })
                .catch(error => {
                console.log(error);

                //context.commit(SET_ERROR, response.data.errors);
                });*/
            });
    }

}



const mutations = {
    [SET_ITEMS](state, data) {
      state.items = data;
    },
  
    [SET_ITEM](state, data) {
      state.item = data;
    }
  };
  
  export default {
    state,
    getters,
    actions,
    mutations
  };
  

