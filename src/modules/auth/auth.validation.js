import { query } from 'express';
import joi from 'joi';

export const signupschema={
    body :joi.object({
        userName: joi.string().alphanum().min(3).max(20).required(),
        email:joi.string().email().required(),
        password: joi.string().min(8).max(20).required(),
        cPassword: joi.valid(joi.ref('password')).required(),
    }),

    query:joi.object({
        test:joi.bool().required(),
    })
}


// export const signupschema = joi.object({
//     userName: joi.string().alphanum().min(3).max(20).required(),
//     email:joi.string().email().required(),
//     password: joi.string().min(8).max(20).required(),
//     cPassword: joi.valid(joi.ref('password')).required(),
// })

export const signinschema = {
    body : joi.object({
    email:joi.string().email().required(),
    password: joi.string().min(8).max(20).required(),
})

}