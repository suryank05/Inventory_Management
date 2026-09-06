package com.example.InventoryManagement.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.InventoryManagement.Config.ExcelUserAdapter;
import com.example.InventoryManagement.Entity.User;
import com.example.InventoryManagement.IO.RegisterRequest;
import com.example.InventoryManagement.Repository.UserRepo;

import java.io.IOException;
import jakarta.servlet.http.HttpServletResponse;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.util.CellRangeAddressList;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

@Service
public class UserService {

	@Autowired
	private ExcelUserAdapter adapter;

    @Autowired
    private UserRepo userRepo;

    // ================= REGISTER USER =================
    public User registerUser(RegisterRequest request) {

        // Prevent duplicate email
        if (userRepo.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        User user = new User();
        user.setUserName(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword()); // Plain text
        user.setRole("EMPLOYEE"); // DEFAULT ROLE

        return userRepo.save(user);
    }

    // ================= GET ALL USERS =================
    public List<User> getAll() {
        return userRepo.findAll();
    }

    // ================= CREATE USER =================
    public User createUser(User user) {
        if (user.getRole() == null || user.getRole().trim().isEmpty()) {
            user.setRole("EMPLOYEE");
        }
        return userRepo.save(user);
    }

    // ================= UPDATE USER =================
    public User updateUser(User user) {

        User existing = userRepo.findByEmail(user.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        existing.setUserName(user.getUserName());
        existing.setPassword(user.getPassword());
        existing.setRole(user.getRole());

        return userRepo.save(existing);
    }

    // ================= DELETE USER =================
    public void deleteUser(String email) {

        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        userRepo.delete(user);
    }

    // ================= LOGIN CHECK (OPTIONAL) =================
    public boolean validateLogin(String email, String password) {

        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return user.getPassword().equals(password);
    }

    public void importUsersFromExcel(MultipartFile file) throws Exception {
    	List<User> users = adapter.convert(file);

       

        userRepo.saveAll(users); 
    }

    private void addRoleDropdown(Sheet sheet) {

        DataValidationHelper helper = sheet.getDataValidationHelper();

        DataValidationConstraint constraint =
            helper.createExplicitListConstraint(new String[]{"EMPLOYEE"});

        CellRangeAddressList addressList =
            new CellRangeAddressList(1, 100, 3, 3);

        DataValidation validation =
            helper.createValidation(constraint, addressList);

        sheet.addValidationData(validation);
    }
    
    private void addUsernameValidation(Sheet sheet) {

        DataValidationHelper helper = sheet.getDataValidationHelper();

        DataValidationConstraint constraint =
            helper.createCustomConstraint("LEN(A2)>0");

        CellRangeAddressList addressList =
            new CellRangeAddressList(1, 100, 0, 0);

        DataValidation validation =
            helper.createValidation(constraint, addressList);

        sheet.addValidationData(validation);
    }
    
    public void generateExcelTemplate(HttpServletResponse response) throws IOException {

        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Users");

        // Header Row
        Row header = sheet.createRow(0);
        header.createCell(0).setCellValue("Username");
        header.createCell(1).setCellValue("Email");
        header.createCell(2).setCellValue("Password");
        header.createCell(3).setCellValue("Role");

        // Add validation
        addRoleDropdown(sheet);
        addUsernameValidation(sheet);

        // Response setup
        response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        response.setHeader("Content-Disposition", "attachment; filename=users_template.xlsx");

        workbook.write(response.getOutputStream());
        workbook.close();
    }
}
