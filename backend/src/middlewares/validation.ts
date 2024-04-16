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

export default {
  loginSchema,
  uuidParam,
};
