//конфигурация данных сайта
const messages = {};

//имя и пароль админа (вне базы для этой версии, в данный момент - пароль 123).
messages.admin = {username:"admin", passHash:"be9106a650ede01f4a31fde2381d06f5fb73e612"},
messages.messages = ["Very big image! (must be less than 2 mb)", "Please upload image only!", "Пожалуйста, введите верные логин и пароль", "Хуй хакерам, а не помидоры!"],
messages.title = ["Image uploader", "Авторизация"],
messages.descr = ["* images only (2MB max)","Введите логин и пароль"],

module.exports = messages
