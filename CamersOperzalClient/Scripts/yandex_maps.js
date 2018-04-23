ymaps.ready(init);
        var myMap,myMap2,myMap3, 
            myPlacemark1,
            myPlacemark2,
            myPlacemark3;

        function init(){ 
        
        if(document.getElementById('map1') != null) {
        
            myMap = new ymaps.Map ("map1", {
                center: [55.76, 37.64],
                zoom: 10
            }); 
            
            myMap.controls
		        // Кнопка изменения масштаба.
		        .add('zoomControl', { left: 5, top: 5 })
		        // Список типов карты
		        .add('typeSelector')
		        // Стандартный набор кнопок
		        .add('mapTools', { left: 35, top: 5 });

            
            var myGeocoder = ymaps.geoQuery(ymaps.geocode("Москва, 2-й Боткинский пр-д, 8, стр. 1"))
            .add(ymaps.geocode("Москва, Орликов пер., 3, стр. 1"))
            .add(ymaps.geocode("119048, Москва, ул. Доватора, 12, корп.2, стр. 5"))
            .add(ymaps.geocode("Москва, ул. Марксистская, 34"))
            .addToMap(myMap);

        }


         if(document.getElementById('map2') != null) {
         
		     myMap2 = new ymaps.Map ("map2", {
                center: [55.76, 37.64],
                zoom: 16
            }); 
            
            myMap2.controls
		        // Кнопка изменения масштаба.
		        .add('zoomControl', { left: 5, top: 5 })
		        // Список типов карты
		        .add('typeSelector')
		        // Стандартный набор кнопок
		        .add('mapTools', { left: 35, top: 5 });

            myPlacemark3 = new ymaps.Placemark([55.76, 37.64], {
                hintContent: 'Межрегиональная инспекция Федеральной налоговой службы № 4',
                balloonContent: '<a href="">Межрегиональная инспекция Федеральной налоговой службы № 4 по крупнейшим налогоплательщикам</a><p>Орликов пер., 3, стр. 1<br>Москва, <span class="gray">107139</span></p><p class="baloon_phone">8 (322) 656-00-00</p>'
            });

            myMap2.geoObjects
		        .add(myPlacemark3);

         }
         
         if(document.getElementById('map3') != null) {

		    myMap3 = new ymaps.Map ("map3", {
                center: [55.76, 37.64],
                zoom: 16
            }); 
            
            myMap3.controls
		        // Кнопка изменения масштаба.
		        .add('zoomControl', { left: 5, top: 5 })
		        // Список типов карты
		        .add('typeSelector')
		        // Стандартный набор кнопок
		        .add('mapTools', { left: 35, top: 5 });

            myMap3.geoObjects
		        .add(myPlacemark3);
		        
		}

}