package com.file.map.model;

public class MapVo {
	
	private String Name;
	private String Longitude;
	private String Latitude;
	private String Description;

	public MapVo() {
		// TODO Auto-generated constructor stub
	}

	public String getName() {
		return Name;
	}

	public void setName(String Name) {
		this.Name = Name;
	}

	public String getLongitude() {
		return Longitude;
	}

	public void setLongitude(String longitude) {
		Longitude = longitude;
	}

	public String getLatitude() {
		return Latitude;
	}

	public void setLatitude(String latitude) {
		Latitude = latitude;
	}

	public String getDescription() {
		return Description;
	}

	public void setDescription(String description) {
		Description = description;
	}

	@Override
	public String toString() {
		
		StringBuffer sb = new StringBuffer();
		
		sb.append("Name : " + Name);
		sb.append("Longitude : " + Longitude);
		sb.append("Latitude : " + Latitude);
		sb.append("Description : " + Description);
		
		return sb.toString();
	}
	
	
	
}
