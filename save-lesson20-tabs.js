/* Табы (старый метод)

    const tabs = () => {
        // Родитель табов
        const tabHeader   = document.querySelector('.service-header');

        // Табы
        const tab = tabHeader.querySelectorAll('.service-header-tab');

        // Содержание таба
        const tabContent = document.querySelectorAll('.service-tab'); 
        
        //Перебирает табы и показывает его, остальные скрывает
        const toggleTabContent = (index) => {
            for(let i = 0; i < tabContent.length; i++){
                if(index === i) {
                    tabContent[i].classList.remove('d-none');
                    tab[i].classList.add('active');
                } else {
                    tabContent[i].classList.add('d-none');
                    tab[i].classList.remove('active');
                }
            }
        }

        // Делегирование
        tabHeader.addEventListener('click', (event) => {

            //получаем элемент по которому кликнули
            let target = event.target;

            // Проверка, не является ли target tabHeader, если кликаем в блок tab или tab>span, то делаем проверку
            while(target !== tabHeader){

                // проверка клика по табу
                if (target.classList.contains('service-header-tab')) { 
                    tab.forEach((item, i) => {
                        if (item === target) {
                            //запускает цикл и сравнивает i с index из  toggleTabContent
                            toggleTabContent(i);
                        }
                    });
                    //завершение цикла while
                    return; 
                }
                // если у target не является классом service-header-tab,
                //присваиваем target (который не service-header-tab) родителя, далее снова проверка while
                target = target.parentNode;
            }
        });
    };

    tabs();
    */