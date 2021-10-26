// import mongoose from "mongoose";
import User from "../../models/user";
import { ROLES_LEVEL } from '../../middleWares/auth/Roles';

// validar el usuario aqui
async function setUser(req, res, next) {
  const {
    username,
    password,
  } = req.body;
  try {
    if(username || password) {
      await User.findOne({ user: username }, async (error, result) => {
        if(error) {
          // error encontrando el documento
          res.status(500);
          res.send({ data: `${error}`, completed: false });
        }else if(result) {// documento encontrado
          // validando si la contraseña es correcta
          await result.isCorrectPassword(password, (errorResult, correct) => {
            if (errorResult) {// error validando la contraseña
              res.status(500);
              res.send({ data: `${errorResult}`, completed: false });
            }else if(correct){ // contraseña correcta
              const userEnd = result;
              userEnd.password = undefined; // eliminando el dato de la contraseña
              req.userData = userEnd; // pasando el dato del usario sin contraseña
              next();
            } else { //contraseña incorrecta
              res.status(401)
              res.send({ data: 'Contraseña incorrecta', completed: false})
            }
          })
          
        } else {
          // documento no encontrado
          res.status(404)
          res.send({ data: 'Dato no encontrado', completed: false, extra: { notFound: true} })
        }
      }).clone();
    } else {
      res.status(401)
      res.send({ data: 'Hacen falta datos', completed: false })
    }
  } catch (error) {
    // console.log(`${error}`);
    res.status(500);
    res.send({ data: error, completed: false });
  }
  
}

//validando si se encuentra logueado o no
function authUser(req, res, next) {
  // el dato "user" se consigue por medio del middleware programado en "app.js"
  if(req.userData === null) {
    res.status(403);
    return res.send('Necesitas loguearte');
  }
  next();
}

// validando si el usuario tiene el rol pedido
function authRole2(role) {
  return (req, res, next) => {
    if (req.userData === undefined || req.userData === null){
      res.status(400);
      return res.send('No se ha creado al usuario');
    } else if (req.userData.type !== role) {
      //el usuario no tiene el rol necesario
      res.status(401);
      return res.send('No se tienen los permisos necesarios');
    }
    next()
  }
}

// cumple la misma funcion de "authRole" con la diferencia de que valida grupo de permisos
// el Gerente puede hacer de todo
// el Supervisor puede hacer todo lo que hace el gerente mas ciertas cosas
// los permisos del gerente son realmente limitados
function authRole(role) {
  return (req, res, next) => {
    if(getLevelFromRole(role) !== 4) { // se verifica que no se pida permisos de nivel 4, al cual cualquiera puede acceder
      if (req.userData === undefined || req.userData === null){
        res.status(400);
        return res.send({ data: 'No se ha creado al usuario', completed: false });
      } else {
        if (getLevelFromRole(req.userData.type) > getLevelFromRole(role)){
          res.status(401);
          return res.send({ data: 'Su perfil no cuenta con los permisos necesarios', completed: false});
        }
      }
    }
    next();
  }
}

function getLevelFromRole(role) {
  return ROLES_LEVEL[Object.keys(ROLES_LEVEL).find( key => ROLES_LEVEL[key].name.toLowerCase() == role.toLowerCase())].level;
}

module.exports = {
  authUser,
  authRole,
  setUser
}