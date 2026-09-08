package com.example.InventoryManagement.Config;

import java.util.ArrayList;
import java.util.List;

import org.apache.poi.ss.usermodel.DataFormatter;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import com.example.InventoryManagement.Entity.Role;
import com.example.InventoryManagement.Entity.User;
import com.example.InventoryManagement.Exception.BadRequestException;

@Component
public class ExcelUserAdapter {

	public List<User> convert(MultipartFile file) {
		List<User> users = new ArrayList<>();

		try (Workbook workbook = new XSSFWorkbook(file.getInputStream())) {
			Sheet sheet = workbook.getSheetAt(0);
			DataFormatter formatter = new DataFormatter();

			for (Row row : sheet) {
				if (row.getRowNum() == 0) {
					continue;
				}
				if (row.getCell(0) == null) {
					continue;
				}

				String username = formatter.formatCellValue(row.getCell(0)).trim();
				String email = row.getCell(1) != null ? formatter.formatCellValue(row.getCell(1)).trim() : "";
				String password = row.getCell(2) != null ? formatter.formatCellValue(row.getCell(2)).trim() : "";
				String role = row.getCell(3) != null ? formatter.formatCellValue(row.getCell(3)).trim() : "";

				if (username.isEmpty() || email.isEmpty()) {
					continue;
				}

				User user = new User();
				user.setUserName(username);
				user.setEmail(email);
				user.setPassword(!password.isEmpty() ? password : "ChangeMe123!");
				user.setRole(Role.fromString(role));
				users.add(user);
			}
		} catch (Exception e) {
			throw new BadRequestException("Could not read Excel file");
		}

		return users;
	}
}
