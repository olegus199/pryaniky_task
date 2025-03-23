# Тестовое задание Pryaniky

### Демо проекта
Ознакомиться с демо можно по [этой ссылке](https://olegus199.github.io/pryaniky_task/)

### Запуск проекта
1. Клонируйте проект
```bash
git clone https://github.com/olegus199/pryaniky_task.git
```
2. Перейдите в директорию проекта
```bash
cd pryaniky_task
```
3. Установите зависимости
```bash
pnpm i
```
или
```bash
npm i
```
4. Запустите проект
```bash
pnpm run dev
```
или
```bash
npm run dev
```
5. Перейдите по адресу
```
http://localhost:5173
```

### Идеи по архитектуре
1. Использовать более семантически верные HTTP-методы. Вместо использования POST для добавления/редактирования/удаления ресурсов, использовать POST/PUT/DELETE соответсвенно
2. Добавить возврат ошибок с сервера. При запросе без авторизации, с сервера возвращается успешный ответ со статус-кодом 200, но в теле ответа содержится информация об ошибке. Я бы изменил этот ответ на ответ ошибки со статус кодом 401
3. Просмотр каждого отдельного документа. Добавить функционал с детализированной информацией по каждому документу (к примеру, при нажатии на документ). Можно было бы сделать динамический роутинг со страницей для каждого документа, при переходе на которую будет отображаться дополнительная информация
4. Объектное хранилище. Можно развернуть объектное хранилище и иметь доступ к файлам документов (договора, подписи итд)

### Стек технологий
- React
- TypeScript
- SCSS
- Redux / RTK / RTK Query
- MUI
- React router

## Контакты
Олег Кремнев

[Телеграм](https://t.me/goshlegos)
