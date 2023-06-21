const { Joi, celebrate } = require('celebrate');
const { REGEXP } = require('../utils/constants');

module.exports.validateRegister = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      'string.email': 'Введена некорректная почта',
      'any.required': 'Почта не должна быть пустой',
    }),
    password: Joi.string().required().messages({
      'any.required': 'Пароль не должен быть пустым',
    }),
    name: Joi.string().min(2).max(30).required()
      .messages({
        'string.min': 'Поле "имя" не должно быть меньше 2 символов',
        'string.max': 'Поле "имя" не должно быть больше 30 символов',
        'any.required': 'Поле "имя" не должно быть пустым',
      }),
  }),
});

module.exports.validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      'string.email': 'Введена некорректная почта',
      'any.required': 'Почта не должна быть пустой',
    }),
    password: Joi.string().required().messages({
      'any.required': 'Пароль не должен быть пустым',
    }),
  }),
});

module.exports.validateUpdateProfile = celebrate({
  body: Joi.object({
    name: Joi.string().min(2).max(30).required()
      .messages({
        'string.min': 'Поле "имя" не должно быть меньше 2 символов',
        'string.max': 'Поле "имя" не должно быть больше 30 символов',
        'any.required': 'Поле "имя" не должно быть пустым',
      }),
    email: Joi.string().email().required().messages({
      'string.email': 'Введена некорректная почта',
    }),
  }),
});

// CARDS

module.exports.validateCard = celebrate({
  body: Joi.object({
    country: Joi.string()
      .messages({
        'any.required': 'Поле не должно быть пустым',
      })
      .required(),
    director: Joi.string()
      .messages({
        'any.required': 'Поле не должно быть пустым',
      })
      .required(),
    duration: Joi.number()
      .messages({
        'any.required': 'Поле не должно быть пустым',
      })
      .required(),
    year: Joi.string()
      .messages({
        'any.required': 'Поле не должно быть пустым',
      })
      .required(),
    description: Joi.string()
      .messages({
        'any.required': 'Поле не должно быть пустым',
      })
      .required(),
    image: Joi.string()
      .regex(REGEXP)
      .messages({
        'string.dataUri': 'Невалидная ссылка',
        'any.required': 'Поле не должно быть пустым',
      })
      .required(),
    trailerLink: Joi.string()
      .regex(REGEXP)
      .messages({
        'string.dataUri': 'Невалидная ссылка',
      })
      .required(),
    thumbnail: Joi.string()
      .regex(REGEXP)
      .messages({
        'string.dataUri': 'Невалидная ссылка',
      })
      .required(),
    nameRU: Joi.string()
      .messages({
        'any.required': 'Поле не должно быть пустым',
      })
      .required(),
    nameEN: Joi.string()
      .messages({
        'any.required': 'Поле не должно быть пустым',
      })
      .required(),
    movieId: Joi.number()
      .messages({
        'any.required': 'Поле не должно быть пустым',
      })
      .required(),
    isSave: Joi.boolean()
    .messages({
      'any.required': 'Поле не должно быть пустым',
    })
    .required(),
  }),
});

module.exports.validateIds = celebrate({
  params: Joi.object({
    id: Joi.string().required().hex().length(24),
  }),
});
