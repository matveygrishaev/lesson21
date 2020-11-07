window.addEventListener('DOMContentLoaded', function(){
  'use strict';
  
    //Timer
    function countTimer(deadLine) {
        let idInterval,
            timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');
      
        function getTimeRemaining () {

            let dateStop = new Date(deadLine).getTime(),
                dateNow = new Date().getTime(),
                timeRemaining = (dateStop - dateNow) / 1000,
                seconds = Math.floor(timeRemaining % 60),
                minutes = Math.floor((timeRemaining / 60) % 60),
                hours = Math.floor(timeRemaining / 60 / 60);
                return {timeRemaining, hours, minutes, seconds};
        } //вычисляет сколько времени осталось до deadline

        function updateClock () {
          let timer = getTimeRemaining();

          const timeCheck = (element1, element2) => {
              if (String(element1).length === 1) {
                element2.textContent = '0' + element1;
              } else {
                element2.textContent = element1;
              }
          };


          //Часы
          timeCheck(timer.hours, timerHours);

          //Минуты
          timeCheck(timer.minutes, timerMinutes);

          // Секунды
          timeCheck(timer.seconds, timerSeconds);

          if (timer.timeRemaining < 0) {
              clearInterval(idInterval);
              timerHours.textContent = '00';
              timerHours.style.color = 'tomato';

              timerMinutes.textContent = '00';
              timerMinutes.style.color = 'tomato';

              timerSeconds.textContent = '00';
              timerSeconds.style.color = 'tomato';
          }
        } // получаем и записываем значения seconds, minutes, hours

        updateClock();

        idInterval = setInterval(updateClock, 1000);
    }

    countTimer('07 november 2020 23:32:20');

    //Menu
    const toggleMenu = () => {
        const btnMenu = document.querySelector('.menu'), // кнопка бургер, открывает и закрывает меню
            menu = document.querySelector('menu'), // скрытое, с помощью translate(-100%) меню
            body = document.querySelector('body'),
            closeBtn = document.querySelector('.close-btn'), // кнопка "крестик" в меню 
            menuItems = menu.querySelectorAll('ul>li>a'), // список ссылок в выпадающем меню

        // Кнопка-бургер меню, открыть и закрыть
        handlerMenu = () => {
            menu.classList.toggle('active-menu');
        };
        
        // btnMenu.addEventListener('click', handlerMenu);

        body.addEventListener('click', (event) => {

            //Присваиваем кликнутый элемент target'у
            let target = event.target;

            if (target.closest('.menu')) {
                handlerMenu();
            } else if (target.classList.contains('close-btn')) {
                handlerMenu();
            } else if (!target.matches('.active-menu') && !target.matches('li')) {
                menu.classList.remove('active-menu');
            }
        });
    };

    toggleMenu();

    //PopUp окно
    const togglePopUp = () => {
        const popUp = document.querySelector('.popup'),
        popUpContent = document.querySelector('.popup-content'),
        popUpBtns = document.querySelectorAll('.popup-btn');

        //Навешивает всем popUpBtns display block по клику + анимация Opacity
        popUpBtns.forEach(elem => {
            elem.addEventListener('click', () => {
              if(window.innerWidth > 768) {
                let count = 0;
                popUpContent.style.opacity = 0;
                console.log(popUpContent.style.opacity);
                popUp.style.display = 'block';
                
                setInterval(() => {
                    if (popUpContent.style.opacity < 1) {
                        count += 0.04;
                        popUpContent.style.opacity = count;
                    } else {
                        clearInterval();
                    }
                }, 40);
                } else {
                    popUp.style.display = 'block';
                }
            });
        });
        
        // PopUp окно
        popUp.addEventListener('click', (event) => {
            let target = event.target;
                // Проверка на нажатие на крестик
                if (target.classList.contains('popup-close')) {
                    popUp.style.display = 'none';
                } else {
                    //Если кликнем за пределами .popup-content, то получим NaN
                    target = target.closest('.popup-content');

                    //Если мы Не получили target(NaN), то закрываем popUp окно
                    if (!target) {
                        popUp.style.display = 'none';
                    }
                }
                
        });
    };

    togglePopUp();

    //Табы
    const tabs = () => {
        
        const tabHeader   = document.querySelector('.service-header'), //Родитель табов
            tab = tabHeader.querySelectorAll('.service-header-tab'), //Табы
            tabContent = document.querySelectorAll('.service-tab'); //Содержание таба
        
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
        };

        // Делегирование
        tabHeader.addEventListener('click', (event) => {

            //получаем элемент по которому кликнули
            let target = event.target;

            //с помощью .closest присваивает .service-header-tab элементу
            target = target.closest('.service-header-tab');
            console.log(target);

            // проверка клика по табу
            if (target) { 

                tab.forEach((item, i) => {

                    if (item === target) {
                        //запускает цикл и сравнивает i с index из  toggleTabContent
                        toggleTabContent(i);
                    }
                });
            }
        });
    };

    tabs();
});