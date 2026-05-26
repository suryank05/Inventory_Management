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

            for (Row row : sheet) {
                if (row.getRowNum() == 0) continue;

                if (row.getCell(0) == null) continue; // skip empty row

                String username = row.getCell(0).getStringCellValue();
                String email = row.getCell(1).getStringCellValue();
                String password = row.getCell(2).getStringCellValue();

                User user = new User();
                user.setUserName(username);
                user.setEmail(email);
                user.setPassword("emp@123"); 
                user.setRole("EMPLOYEE");

                users.add(user);
            }

        } catch (Exception e) {
            throw new RuntimeException("Error reading Excel file");
        }

        return users;
    }
}