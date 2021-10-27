const ROLES = {
  GERENTE: 'Gerente',
  SUPERVISOR: 'Supervisor',
  GUARDA: 'Guarda',
  OTHERS: 'Visitante',
};

const ROLES_LEVEL = {
  GERENTE: { 
    name: 'Gerente',
    level: 1,
  },
  SUPERVISOR: {
    name: 'Supervisor',
    level: 2,
  },
  GUARDA: {
    name: 'Guarda',
    level: 3,
  },
  OTHERS: {
    name: 'Visitante',
    level: 4,
  }
};


module.exports = {
  ROLES,
  ROLES_LEVEL
}