import express from 'express'

import User from '../../models/user'

const router = express.Router()

router.put('/cambiarNivel', async (req, res) => {
  try {
    const {
      user,
      password,
      idUserChanged,
      newType
    }  = req.body;
  } catch (error) {
    return { data: error, completed: false };
  }
})

router.get('/hola', set)