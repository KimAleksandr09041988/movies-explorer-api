const NOT_FOUND_DELETING_CARD = 'Карточки с указанным ID не существует.';
const FORBIDDEN_RESPONSE = 'Нельзя удалить чужую карточку :)';
const BAD_REQUEST_VALIDATION_ERROR = 'Валидация не пройдена, проверьте правильность введённых данных!';
const BAD_REQUEST_CAST_ERROR = 'Карточка с указанным ID не найдена.';
const REPEATS_EMAIL_ERROR = 'Валидация не пройдена, поле email должно быть уникальным.';
const SUCCESS_LOGIN = 'Залогинились успешно)';
const WRONG_DATA_RESPONSE = 'Неправильный адрес электронной почты или неверный пароль';
const WRONG_URL = 'Некорректный путь!';
const WRONG_ACCESS = 'Необходима авторизация!';

const REGEXP = /^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9\-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-\/])*)?/;

module.exports = {
  NOT_FOUND_DELETING_CARD,
  FORBIDDEN_RESPONSE,
  BAD_REQUEST_VALIDATION_ERROR,
  BAD_REQUEST_CAST_ERROR,
  REPEATS_EMAIL_ERROR,
  SUCCESS_LOGIN,
  WRONG_DATA_RESPONSE,
  REGEXP,
  WRONG_URL,
  WRONG_ACCESS,
};
