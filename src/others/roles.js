const ROLES_LEVEL = {
  DEVELOPER: {
    name: 'Developer',
    level: 0,
  },
  GERENTE: { 
    name: 'Gerente',
    level: 5,
  },
  SUPERVISOR: {
    name: 'Supervisor',
    level: 10,
  },
  GUARDA: {
    name: 'Guarda',
    level: 15,
  },
  OTHERS: {
    name: 'Visitante',
    level: 4,
  }
}

// creando objeto que solo tiene el dato del name
const rolNames = () => {
  let names = {}
  // console.log(Object.values(ROLES_LEVEL))
  for(rol in ROLES_LEVEL){
    // console.log(ROLES_LEVEL[rol])
    names[rol] = ROLES_LEVEL[rol].name
    
  };
  return names
}
// agregando el resultado de la funcion anterior a un dato
const ROLES  = rolNames()

// funcion que retorna el nivel de un dato 
function LEVEL_FROM_NAME(rol){
  // console.log(rol in Object.values(ROLES))
  try {
    return ROLES_LEVEL[Object.keys(ROLES_LEVEL).find( key => ROLES_LEVEL[key].name.toLowerCase() == rol.toLowerCase())].level;
  } catch (e) {
    return ROLES_LEVEL.OTHERS.level;
  }
    
}




module.exports = {
  ROLES_LEVEL,
  ROLES,
  LEVEL_FROM_NAME
}
