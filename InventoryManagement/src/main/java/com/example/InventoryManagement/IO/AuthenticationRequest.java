package com.example.InventoryManagement.IO;


import lombok.Data;

@Data
public class AuthenticationRequest {

    private String email;
    private String password;
}
