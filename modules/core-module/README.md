# core module [![TFS Link](http://ddsm-tfs01:8080/tfs/_static/tfs/12/_content/repository-git.png)](http://ddsm-tfs01:8080/tfs/TFS_DPR/SDU_DDMWeb/_git/core-module)

Модуль содержит Angular2 основные сервисы и типы, которые могут использоваться в приложении.

В состав модуля входят сервисы:
 - AppConfig : IConfigService - сервис получения параметров окружения

Так жк в состав пакета входят классы:
  - Guid (функционал Guid из .Net)

### AppConfig
Сервис для получения настроек окружения и конфига. Основан на (https://gist.github.com/fernandohu/122e88c3bcd210bbe41c608c36306db9)

Под настройками понимается файл `env.json`, объект, который описывает "конфигурацию", пример:
```json
{
  "env":"dev",
  "someProp":"someVal"
}
```

На основании свойства `env`(при его наличии), загружается файл `config.[env].json`, который содержит массив, который описывает свойства окружения. Пример свойств (примеры использования ниже):

Обычное Свойство:
```json
{
  "desc":"Название кнопки создать поручение на главной",
  "key":"Main_Btn_CreateTask",
  "value":"Дать поручение"
}
```
 Коллекционное св-во:
```json
{
  "desc":"Название операции Исполнить в зависимости от параметра",
  "key":"Operation_ExecuteTask",
  "values":[
      {
        "key": true,
        "value": "Ознакомлен"
      },
      {
        "key": false,
        "value": "Исполнить"
      }
  ]
}
```
Для использования в своем приложении необходимо загрузить файлы настроек (по умолчанию `env/env.json` и `env/config.xxx.json`), для этого в своем модуле следует указать:
```js
import { useAppConfigProvider } from '@dd/core-module/providers/useAppConfig.provider.ts';
providers: [
    useAppConfigProvider
]
```

Сервис реализует интерфейс IConfigService:
```js
interface IConfigService {
  /**
   * Инициализация настроек приложения. Должен вызываться в APP_INITIALIZER
   * Читает env/env.json и env/config.[env].json
   * @envPath: Путь к папке с настройками окружения
   */
  load(envPath?: string);

  /**
   * Получить параметр из конфиг.файла
   * @key Ключ объекта в конфиг.файле
   * @subKey Дополнительный ключ для поиска в коллекции values обьекта с ключом key
   * @return Значение св-ва
   */
  getConfig(key: any, subKey?: any);

  /**
   * Чтение свойства из env файла
   * @key Ключ объекта в env файле
   * @return Значение св-ва
   */
  getEnv(key: any);
}

```

Пример для работы с сервисом:
Чтение св-ва из `env.json`:
```js
appConfig.getEnv('someProp') //returns "someVal"
```
Чтение св-ва из `config.dev.json`:
```js
appConfig.getConfig('Main_Btn_CreateTask') //returns "Дать поручение"
```
Чтение коллекционного св-ва из `config.dev.json`:
```js
appConfig.getConfig('Operation_ExecuteTask',true) //returns "Ознакомлен"
```
### Guid

Класс реализует функционал класса Guid из .Net

```javascript
/**
 * Метод возвращает экземпляр пустого Guid
 */
public static empty()

/**
 * Метод генерирует новый экземпляр класса Guid
 */
public static newGuid()

/**
 * Проверка строки на Guid
 */
public static isGuid(value: string): boolean

/**
 * Метод сравнивает с экзампляром Guid
 */
public equals(other: Guid): boolean

/**
 * Метод возвращает строковое представление Guid
 * Доступty формат: x - '{Guid}'
 */
toString(format: string) {
```
