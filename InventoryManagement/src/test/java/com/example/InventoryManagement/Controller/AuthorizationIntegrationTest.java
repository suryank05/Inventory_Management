package com.example.InventoryManagement.Controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class AuthorizationIntegrationTest {

	@Autowired
	private MockMvc mockMvc;

	@Test
	void userApiIsUnauthorizedWithoutToken() throws Exception {
		mockMvc.perform(get("/user/get")).andExpect(status().isUnauthorized());
	}

	@Test
	@WithMockUser(roles = "EMPLOYEE")
	void employeeCannotListUsers() throws Exception {
		mockMvc.perform(get("/user/get")).andExpect(status().isForbidden());
	}

	@Test
	@WithMockUser(roles = "ADMIN")
	void adminCanListUsers() throws Exception {
		mockMvc.perform(get("/user/get")).andExpect(status().isOk());
	}

	@Test
	@WithMockUser(roles = "EMPLOYEE")
	void employeeCanReadInventory() throws Exception {
		mockMvc.perform(get("/inventory/getall")).andExpect(status().isOk());
	}
}
