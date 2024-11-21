const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');
const { isDate } = require('../helpers/isDate');

const router = Router();

//obtener events
router.get(
    '/',
    validarJWT,  
    getEventos );

// Crear un nuevo evento
router.post(
    '/', 
    [
        check('title', 'El título es obligatorio').not().isEmpty(),
        check('start', 'La fecha de inicio es obligatoria').custom( isDate ),
        check('end', 'La fecha de finalización es obligatoria').custom( isDate ),
        validarCampos
    ],
    validarJWT,
    crearEvento );


//Actualizar evento
router.put('/:id', validarJWT,  actualizarEvento );


// Borrar evento
router.delete('/:id', validarJWT,  eliminarEvento );

module.exports = router;