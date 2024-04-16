import { celebrate, Joi, Segments } from "celebrate";

const loginSchema = celebrate({
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().required().trim(),
    password: Joi.string().required(),
  }),
});

const uuidParam = celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required(),
  },
});

const RegisterSchema = celebrate({
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().required().trim(),
    password: Joi.string().required().min(1),
    userName: Joi.string().required().min(1),
  }),
});

export default {
  loginSchema,
  uuidParam,RegisterSchema
};
