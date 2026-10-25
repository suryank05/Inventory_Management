package com.example.InventoryManagement.Service;

import java.io.IOException;
import java.util.List;

import org.apache.poi.ss.util.CellRangeAddressList;
import org.apache.poi.ss.usermodel.DataValidation;
import org.apache.poi.ss.usermodel.DataValidationConstraint;
import org.apache.poi.ss.usermodel.DataValidationHelper;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.example.InventoryManagement.Config.ExcelUserAdapter;
import com.example.InventoryManagement.DTO.UserRequest;
import com.example.InventoryManagement.DTO.UserResponse;
import com.example.InventoryManagement.Entity.LedgerEntity;
import com.example.InventoryManagement.Entity.Role;
import com.example.InventoryManagement.Entity.User;
import com.example.InventoryManagement.Exception.BadRequestException;
import com.example.InventoryManagement.Exception.DuplicateResourceException;
import com.example.InventoryManagement.Exception.ResourceNotFoundException;
import com.example.InventoryManagement.Helpers.GetCurrentUsername;
import com.example.InventoryManagement.IO.RegisterRequest;
import com.example.InventoryManagement.Mapper.DtoMapper;
import com.example.InventoryManagement.Repository.LedgerInventoryRepo;
import com.example.InventoryManagement.Repository.UserRepo;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {

	private final ExcelUserAdapter adapter;
	private final UserRepo userRepo;
	private final PasswordEncoder passwordEncoder;
	
	private final LedgerInventoryRepo ledger;
	
	private final GetCurrentUsername userName;

	@Transactional
	public User registerUser(RegisterRequest request) {
		
		
		if (userRepo.existsByEmail(request.getEmail())) {
			throw new DuplicateResourceException("Email already exists");
		}

		User user = User.builder()
				.userName(request.getUsername())
				.email(request.getEmail())
				.password(passwordEncoder.encode(request.getPassword()))
				.role(Role.EMPLOYEE)
				.build();
		
		User saved = userRepo.save(user);

		LedgerEntity leg = LedgerEntity.builder()
		        .userName(userName.getCurrentUsername())
		        .quantityBefore(null)
		        .quantityAfter(null)
		        .actionDone("Added_User with the name as " + saved.getUserName())
		        .build();

		ledger.save(leg);

		return saved;
	}

	public List<UserResponse> getAll() {
		LedgerEntity leg=LedgerEntity.builder()
		        .userName(userName.getCurrentUsername())
		        .quantityBefore(null)
		        .quantityAfter(null)
		        .actionDone("Listed all the users")
		        .build();
		
		ledger.save(leg);
		
		return userRepo.findAll().stream().map(DtoMapper::toUserResponse).toList();
	}

	@Transactional
	public UserResponse createUser(UserRequest request) {
				
		if (userRepo.existsByEmail(request.getEmail())) {
			throw new DuplicateResourceException("Email already exists");
		}
		if (request.getPassword() == null || request.getPassword().isBlank()) {
			throw new BadRequestException("Password is required");
		}

		User user = User.builder()
				.userName(request.getUserName())
				.email(request.getEmail())
				.password(passwordEncoder.encode(request.getPassword()))
				.role(request.getRole() == null ? Role.EMPLOYEE : request.getRole())
				.build();
		
		User saved = userRepo.save(user);

		LedgerEntity leg = LedgerEntity.builder()
		        .userName(userName.getCurrentUsername())
		        .quantityBefore(null)
		        .quantityAfter(null)
		        .actionDone("Added_User with the name as " + saved.getUserName())
		        .build();

		ledger.save(leg);

		return DtoMapper.toUserResponse(saved);	}

	@Transactional
	public UserResponse updateUser(UserRequest request) {

	    User existing = userRepo.findByEmail(request.getEmail())
	            .orElseThrow(() -> new ResourceNotFoundException("User not found"));

	    String oldName = existing.getUserName();
	    Role oldRole = existing.getRole();

	    StringBuilder description = new StringBuilder();
	    description.append("Updated user '")
	            .append(oldName)
	            .append("': ");

	    boolean changed = false;

	    if (request.getUserName() != null
	            && !request.getUserName().equals(existing.getUserName())) {

	        description.append("Username changed from '")
	                .append(existing.getUserName())
	                .append("' to '")
	                .append(request.getUserName())
	                .append("'; ");

	        existing.setUserName(request.getUserName());
	        changed = true;
	    }

	    if (request.getPassword() != null && !request.getPassword().isBlank()) {
	        existing.setPassword(passwordEncoder.encode(request.getPassword()));

	        description.append("Password changed; ");
	        changed = true;
	    }

	    if (request.getRole() != null
	            && !request.getRole().equals(existing.getRole())) {

	        description.append("Role changed from '")
	                .append(existing.getRole())
	                .append("' to '")
	                .append(request.getRole())
	                .append("'; ");

	        existing.setRole(request.getRole());
	        changed = true;
	    }

	    if (changed) {
	        User saved = userRepo.save(existing);

	        LedgerEntity leg = LedgerEntity.builder()
	                .userName(userName.getCurrentUsername())
	                .quantityBefore(null)
	                .quantityAfter(null)
	                .actionDone(description.toString())
	                .build();

	        ledger.save(leg);

	        return DtoMapper.toUserResponse(saved);
	    }

	    return DtoMapper.toUserResponse(existing);
	}

	@Transactional
	public void deleteUser(String email) {
		User user = userRepo.findByEmail(email)
				.orElseThrow(() -> new ResourceNotFoundException("User not found"));
		userRepo.delete(user);
		
		LedgerEntity leg=LedgerEntity.builder()
		        .userName(userName.getCurrentUsername())
		        .quantityBefore(null)
		        .quantityAfter(null)
		        .actionDone("Deleted_User wiht the name as "+user.getUserName())
		        .build();
		
		ledger.save(leg);
		
	}

	public boolean validateLogin(String email, String password) {
		User user = userRepo.findByEmail(email)
				.orElseThrow(() -> new ResourceNotFoundException("User not found"));
		return passwordEncoder.matches(password, user.getPassword());
	}

	@Transactional
	public void importUsersFromExcel(MultipartFile file) {
		if (file == null || file.isEmpty()) {
			throw new BadRequestException("File is empty");
		}
		List<User> users = adapter.convert(file);
		users.forEach(user -> user.setPassword(passwordEncoder.encode(user.getPassword())));
		userRepo.saveAll(users);
		log.info("Imported {} users from Excel", users.size());
		
		LedgerEntity leg=LedgerEntity.builder()
		        .userName(userName.getCurrentUsername())
		        .quantityBefore(null)
		        .quantityAfter(null)
		        .actionDone("Imported users by the excel")
		        .build();
		
		ledger.save(leg);
		
	}

	public void generateExcelTemplate(HttpServletResponse response) throws IOException {
		try (Workbook workbook = new XSSFWorkbook()) {
			Sheet sheet = workbook.createSheet("Users");
			Row header = sheet.createRow(0);
			header.createCell(0).setCellValue("Username");
			header.createCell(1).setCellValue("Email");
			header.createCell(2).setCellValue("Password");
			header.createCell(3).setCellValue("Role");
			addRoleDropdown(sheet);
			addUsernameValidation(sheet);
			response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
			response.setHeader("Content-Disposition", "attachment; filename=users_template.xlsx");
			workbook.write(response.getOutputStream());
		}
	}

	private void addRoleDropdown(Sheet sheet) {
		DataValidationHelper helper = sheet.getDataValidationHelper();
		DataValidationConstraint constraint =
				helper.createExplicitListConstraint(new String[] { "EMPLOYEE", "ADMIN" });
		CellRangeAddressList addressList = new CellRangeAddressList(1, 100, 3, 3);
		sheet.addValidationData(helper.createValidation(constraint, addressList));
	}

	private void addUsernameValidation(Sheet sheet) {
		DataValidationHelper helper = sheet.getDataValidationHelper();
		DataValidationConstraint constraint = helper.createCustomConstraint("LEN(A2)>0");
		CellRangeAddressList addressList = new CellRangeAddressList(1, 100, 0, 0);
		sheet.addValidationData(helper.createValidation(constraint, addressList));
	}
}
