# lego ui kit [![TFS Link](http://ddsm-tfs01:8080/tfs/_static/tfs/12/_content/repository-git.png)](http://ddsm-tfs01:8080/tfs/TFS_DPR/SDU_DDMWeb/_git/lego-ui-kit)

Модуль с компонентами из корпоративного LegoUi kit. 
Концепт дизайна:
 - [Базовые элементы](https://manager.avocode.com/view/485a812cc0874d48b2874bebf58125f8/)
 - [Окна](https://manager.avocode.com/view/0abd10c7c7c34f9c9be5c5653ac8a3e7/)
 - [Цвета](https://manager.avocode.com/view/39fe352ec07d4200ba79bfe832385e4e/)

Модуль является оберткой библиотеки [PrimeNg](http://www.primefaces.org/primeng) (там можно посмотреть все доступные компоненты) с темой LegoUi 

Другие компоненты из lego-ui-kit скоро появятся...

Использовать в своем модуле:
```javascript
import { LegoUiModule } from '@dd/lego-ui-kit';

...
imports: [
    ...
    LegoUiModule
    ...
]
...
```

PS: Чтобы выгрузить имена всех модулей и классов из PrimeNg:
В `lego-ui.module.ts` добавить:
```javascript
import  * as prime  from 'primeng/primeng';
export  *  from 'primeng/primeng';
```
Выполнить скрипт и вставить его вывод в `exports` модуля `LegoUiModule`:
```bash
cd /psth/to/node_modules/primeng
find . -name "*.d.ts" | xargs  grep  -Ro -E  ' .+Module' | awk '{ print "prime."$NF"," }'
```