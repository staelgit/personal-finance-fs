export function generateAuthError(message) {
   switch (message) {
      case 'INVALID_PASSWORD':
         return 'Пароль введен не корректно';
      case 'EMAIL_EXISTS':
         return 'Пользователь с таким Email уже существует';
      case 'EMAIL_NOT_FOUND':
         return 'Email не найден';
      case 'OPERATION_NOT_ALLOWED':
         return 'Вход с паролем отключен для этого проекта';
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
         return 'Мы заблокировали все запросы с этого устройства из-за необычной активности. Попробуйте позже';
      case 'USER_DISABLED':
         return 'Учетная запись пользователя отключена администратором';
      default:
         return 'Неизвестная ошибка, попробуйте позже';
   }
}
