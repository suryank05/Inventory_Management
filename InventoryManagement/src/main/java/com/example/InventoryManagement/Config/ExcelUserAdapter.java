package com.example.InventoryManagement.Config;

import java.util.ArrayList;
import java.util.List;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import com.example.InventoryManagement.Entity.User;

@Component
public class ExcelUserAdapter {

    public List<User> convert(MultipartFile file) {
        List<User> users = new ArrayList<>();

        try (Workbook workbook = new XSSFWorkbook(file.getInputStream())) {

            Sheet sheet = workbook.getSheetAt(0);

            DataFormatter formatter = new DataFormatter();

            for (Row row : sheet) {
                if (row.getRowNum() == 0) continue;

                if (row.getCell(0) == null) continue; // skip empty row

                String username = formatter.formatCellValue(row.getCell(0)).trim();
                String email = row.getCell(1) != null ? formatter.formatCellValue(row.getCell(1)).trim() : "";
                String password = row.getCell(2) != null ? formatter.formatCellValue(row.getCell(2)).trim() : "";
                String role = row.getCell(3) != null ? formatter.formatCellValue(row.getCell(3)).trim() : "";

                if (username.isEmpty() || email.isEmpty()) continue;

                User user = new User();
                user.setUserName(username);
                user.setEmail(email);
                user.setPassword(!password.isEmpty() ? password : "emp@123"); 
                user.setRole(!role.isEmpty() ? role.toUpperCase() : "EMPLOYEE");

                users.add(user);
            }

        } catch (Exception e) {
            throw new RuntimeException("Error reading Excel file: " + e.getMessage());
        }

        return users;
    }
}