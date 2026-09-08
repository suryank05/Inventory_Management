package com.example.InventoryManagement.Service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.example.InventoryManagement.Config.ExcelUserAdapter;
import com.example.InventoryManagement.DTO.UserRequest;
import com.example.InventoryManagement.DTO.UserResponse;
import com.example.InventoryManagement.Entity.Role;
import com.example.InventoryManagement.Entity.User;
import com.example.InventoryManagement.Exception.DuplicateResourceException;
import com.example.InventoryManagement.Exception.ResourceNotFoundException;
import com.example.InventoryManagement.IO.RegisterRequest;
import com.example.InventoryManagement.Repository.UserRepo;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

	@Mock
	private ExcelUserAdapter adapter;
	@Mock
	private UserRepo userRepo;
	@Mock
	private PasswordEncoder passwordEncoder;

	@InjectMocks
	private UserService userService;

	private RegisterRequest registerRequest;

	@BeforeEach
	void setUp() {
		registerRequest = new RegisterRequest();
		registerRequest.setUsername("Ada");
		registerRequest.setEmail("ada@example.com");
		registerRequest.setPassword("password123");
	}

	@Test
	void registerUserHashesPasswordAndAssignsEmployeeRole() {
		when(userRepo.existsByEmail("ada@example.com")).thenReturn(false);
		when(passwordEncoder.encode("password123")).thenReturn("hashed");
		when(userRepo.save(any(User.class))).thenAnswer(invocation -> invocation.getArgument(0));

		User saved = userService.registerUser(registerRequest);

		assertThat(saved.getPassword()).isEqualTo("hashed");
		assertThat(saved.getRole()).isEqualTo(Role.EMPLOYEE);
		verify(passwordEncoder).encode("password123");
	}

	@Test
	void registerUserRejectsDuplicateEmail() {
		when(userRepo.existsByEmail("ada@example.com")).thenReturn(true);

		assertThatThrownBy(() -> userService.registerUser(registerRequest))
				.isInstanceOf(DuplicateResourceException.class);
	}

	@Test
	void createUserMapsRoleFromRequest() {
		UserRequest request = new UserRequest();
		request.setUserName("Boss");
		request.setEmail("boss@example.com");
		request.setPassword("password123");
		request.setRole(Role.ADMIN);

		when(userRepo.existsByEmail("boss@example.com")).thenReturn(false);
		when(passwordEncoder.encode("password123")).thenReturn("hashed");
		when(userRepo.save(any(User.class))).thenAnswer(invocation -> {
			User user = invocation.getArgument(0);
			user.setId(7L);
			return user;
		});

		UserResponse response = userService.createUser(request);

		assertThat(response.getRole()).isEqualTo(Role.ADMIN);
		assertThat(response.getId()).isEqualTo(7L);
	}

	@Test
	void deleteUserThrowsWhenMissing() {
		when(userRepo.findByEmail("missing@example.com")).thenReturn(Optional.empty());

		assertThatThrownBy(() -> userService.deleteUser("missing@example.com"))
				.isInstanceOf(ResourceNotFoundException.class);
	}

	@Test
	void getAllDoesNotExposePassword() {
		User user = User.builder()
				.id(1L)
				.userName("Ada")
				.email("ada@example.com")
				.password("secret")
				.role(Role.EMPLOYEE)
				.build();
		when(userRepo.findAll()).thenReturn(List.of(user));

		List<UserResponse> users = userService.getAll();

		assertThat(users).hasSize(1);
		assertThat(users.get(0).getEmail()).isEqualTo("ada@example.com");
		assertThat(users.get(0).getUserName()).isEqualTo("Ada");
	}
}
