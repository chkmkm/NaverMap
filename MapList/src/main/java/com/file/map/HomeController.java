package com.file.map;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.PrintWriter;
import java.math.BigDecimal;
import java.net.URLEncoder;
import java.text.DateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.json.simple.JSONArray;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.MultipartResolver;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;

import com.file.map.model.MapVo;

@Controller
public class HomeController {
	
	private static final Logger logger = LoggerFactory.getLogger(HomeController.class);
	
	/**
	 * Simply selects the home view to render by returning its name.
	 */
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String home(Locale locale, Model model) {
		logger.info("Welcome home! The client locale is {}.", locale);
		
		Date date = new Date();
		DateFormat dateFormat = DateFormat.getDateTimeInstance(DateFormat.LONG, DateFormat.LONG, locale);
		
		String formattedDate = dateFormat.format(date);
		
		model.addAttribute("serverTime", formattedDate );
		
		return "home";
	}
	
	@RequestMapping(value = "/upload", method = RequestMethod.POST)
	@ResponseBody
	public Object FileUp(MultipartHttpServletRequest req, HttpServletResponse resp){
		
		String url = req.getRealPath("file")+"\\";
		
		Iterator<String> itr = req.getFileNames();
		MultipartFile mpf = req.getFile(itr.next());
		String originFileName = mpf.getOriginalFilename();
		
		// 디레토리가 없다면 생성
		File file = new File(url+originFileName);
		
		if (!file.isDirectory()) {
			file.mkdirs();
		}
		
		List<HashMap<String, Object>> list = new ArrayList<HashMap<String,Object>>();
		
		try {
			mpf.transferTo(file);
			
			// 엑셀 파일 오픈
			XSSFWorkbook wb = new XSSFWorkbook(new FileInputStream(file));
			// HashMap으로 이루어진 List 객체 생성
			for(Row row : wb.getSheetAt(0)){
				
				// 타이틀 1줄을 건너 뛴다
				if(row.getRowNum() < 1){
					continue;
				}
				
				if(row.getCell(1) == null || row.getCell(2) == null){
                    break;
                }

				HashMap<String, Object> map = new HashMap<String, Object>();
				map.put("Name", URLEncoder.encode(""+row.getCell(0) , "UTF-8"));
				map.put("Longitude", row.getCell(1));
				map.put("Latitude", row.getCell(2));
				map.put("Description", URLEncoder.encode(""+row.getCell(3) , "UTF-8"));
				
				System.out.println(map.get("Name")+":"+map.get("Longitude")+":"+map.get("Latitude")+":"+map.get("Description"));
				
				list.add(map);
			}
		} catch (FileNotFoundException e1) {
			e1.printStackTrace();
		} catch (IOException e1) {
			e1.printStackTrace();
		}
		
		return JSONArray.toJSONString(list);
		
//		try {
//			resp.setCharacterEncoding("UTF-8");
//			PrintWriter out = resp.getWriter();
//			out.print("확인");
//		} catch (IOException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
		
		
	}
	
}
