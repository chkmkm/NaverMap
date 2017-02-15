$(document).ready(function(){
	
	// 네이버 맵 생성
	var map = new naver.maps.Map("map", {
	    center: new naver.maps.LatLng(37.554610, 126.970702),
	    zoom: 10,
	    mapTypeControl: true
	});
	
	// 파일 업로드시 주소 변화
	$('#file_Up').on('change',function(){
		
		var pom = $(this).val().split(".");
		
		// .xlsx확장자 확인
		if(pom[pom.length-1] != "xlsx"){
			alert("xlsx확장자만 올려주세요");
			$(this).val("");
			return;
		}
		
		var data = new FormData();
		
		data.append("uploadFile",$('#file_Up')[0].files[0]);
		
		$.ajax({
			type : 'POST',
			url : '/map/upload',
			data : data,
			dataType : 'json',
			processData : false,
	        contentType : false,
	        error : function(jqXHR, textStatus) {
	        	alert("통신실패 " + textStatus + " (code): " + jqXHR.status);
	        },
	        success : function(list){
         
	        	$('.list-group').html("");
         
	        	var HOME_PATH = window.HOME_PATH || '.';
	        	map = new naver.maps.Map('map', {
	        		center: new naver.maps.LatLng(list[0].Latitude, list[0].Longitude),
	        		zoom: 10
	        	});
	        	
	        	var markers = [],
	            infoWindows = [];
	        	
	        	for(var i=0;i<list.length;i++){
	        		makeMarker(map, new naver.maps.LatLng(list[i].Latitude, list[i].Longitude), i);
	        		if(naver.maps.LatLngBounds(list[i].Latitude, list[i].Longitude)){
	        			$('.list-group').append("<a href=\"#\" class=\"list-group-item\">"+decodeURIComponent(list[i].Description)+"<span class=\"badge\">O</span></a>");
	        		}else{
	        			$('.list-group').append("<a href=\"#\" class=\"list-group-item\">"+decodeURIComponent(list[i].Description)+"<span class=\"badge\">X</span></a>");
	        		}
	        		
	        		var infoWindow = new naver.maps.InfoWindow({
	        	        content: '<div style="width:150px;text-align:center;padding:10px;"><b>"'+ decodeURIComponent(list[i].Description) +'"</b>.</div>'
	        	    });

	        	    infoWindows.push(infoWindow);
	        	}
	        	
	        	function makeMarker(map, position, index) {
	        		var ICON_GAP = 31;
	        		var ICON_SPRITE_IMAGE_URL = HOME_PATH +'/img/example/sp_pins_spot_v3.png';
	        		var iconSpritePositionX = (index * ICON_GAP) + 1;
	        		var iconSpritePositionY = 1;
	        		var marker = new naver.maps.Marker({
	        			map: map,
	        			position: position,
	        			icon: {
	        				url: ICON_SPRITE_IMAGE_URL,
	        				size: new naver.maps.Size(26, 36), // 이미지 사이즈
	        				origin: new naver.maps.Point(iconSpritePositionX, iconSpritePositionY), // 스프라이트 이미지에서 클리핑 위치
	        				anchor: new naver.maps.Point(13, 36), // 지도 상 위치에서 이미지 위치의 offset 값
	        				scaledSize: new naver.maps.Size(395, 79)
	        			}
	        		});
	        		markers.push(marker);
	        		
	        		return marker;
	        	}
	        	
	        	function updateMarkers(map, markers) {

	        	    var mapBounds = map.getBounds();
	        	    var marker, position;

	        	    for (var i = 0; i < markers.length; i++) {

	        	        marker = markers[i]
	        	        position = marker.getPosition();

	        	        if (mapBounds.hasLatLng(position)) {
	        	            showMarker(map, marker);
	        	        } else {
	        	            hideMarker(map, marker);
	        	        }
	        	    }
	        	}

	        	function showMarker(map, marker) {

	        	    if (marker.setMap()) return;
	        	    marker.setMap(map);
	        	}

	        	function hideMarker(map, marker) {

	        	    if (!marker.setMap()) return;
	        	    marker.setMap(null);
	        	}
	        	
	        	function showMarker(map, marker) {

	        	    if (marker.setMap()) return;
	        	    marker.setMap(map);
	        	}

	        	function hideMarker(map, marker) {

	        	    if (!marker.setMap()) return;
	        	    marker.setMap(null);
	        	}

	        	// 해당 마커의 인덱스를 seq라는 클로저 변수로 저장하는 이벤트 핸들러를 반환합니다.
	        	function getClickHandler(seq) {
	        	    return function(e) {
	        	        var marker = markers[seq],
	        	            infoWindow = infoWindows[seq];

	        	        if (infoWindow.getMap()) {
	        	            infoWindow.close();
	        	        } else {
	        	            infoWindow.open(map, marker);
	        	            map.panToBounds(new naver.maps.LatLng(list[seq].Latitude, list[seq].Longitude));
	        	        }
	        	    }
	        	}

	        	for (var i=0, ii=markers.length; i<ii; i++) {
	        	    naver.maps.Event.addListener(markers[i], 'click', getClickHandler(i));
	        	}
	        }
		});
	}); // 파일 업로드시 좌표 읽어서 마크 뿌리기	
	
	$(document).on('click','a',function(){
		$(this).val();
		
	});
});