<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no">
    <link href="./resources/css/bootstrap.min.css" rel="stylesheet">
    <title>간단한 지도 표시하기</title>
    <script type="text/javascript" src="https://openapi.map.naver.com/openapi/v3/maps.js?clientId=9ZMCGgplpUYBatJrgQr4&submodules=geocoder"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
    <script src="./resources/js/bootstrap.min.js"></script>
    <script src="./resources/js/jquery.form.js"></script>
    <script src="./resources/js/map.js"></script>
</head>
<body>
<form name="Mapload" class="form-inline">
	<div class="row" >
		<div id="map" class="col-md-7" style="height:800px;"></div>
		<div class="col-md-5">
			<div class="list-group">
				.xlsx을 선택해 주세요
			</div>
			<div id="file_UpDown">
				<input type="file" name="file_Up" id="file_Up" class="form-control" accept=".xlsx" value="파일 올리기">
				<input type="button" name="file_Down" id="file_Down" class="btn btn-info" value="다운로드">
			</div>
			<div class="search" style="">
	            <input id="address" type="text" class="form-control" placeholder="검색할 주소"/>
	            <input id="submit" type="button" class="btn btn-info" value="주소 검색" />
        	</div>
		</div>
	</div>
</form>
</body>
</html>