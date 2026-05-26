package com.example.InventoryManagement.Config;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.example.InventoryManagement.Security.CustomUserDetailsService;
import com.example.InventoryManagement.Security.JwtFilter;

@Configuration
public class SecurityConfig {

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Autowired
    private JwtFilter jwtFilter;

    // ================= CORS CONFIG =================
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOriginPatterns(List.of("*"));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }

    // ================= CUSTOM AUTH MANAGER (NO ENCRYPTION) =================
    @Bean
    public AuthenticationManager authenticationManager() {
        return authentication -> {

            String email = authentication.getName();
            String rawPassword = authentication.getCredentials().toString();

            var userDetails = userDetailsService.loadUserByUsername(email);

            // Plain-text password check
            if (!userDetails.getPassword().equals(rawPassword)) {
                throw new RuntimeException("Invalid email or password");
            }

            return new UsernamePasswordAuthenticationToken(
                    userDetails,
                    rawPassword,
                    userDetails.getAuthorities()
            );
        };
    }

    // ================= SECURITY FILTER CHAIN =================
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .csrf(cs -> cs.disable())

            .authorizeHttpRequests(auth -> auth
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                .requestMatchers("/auth/**").permitAll() // login/register openp
                .requestMatchers("/inventory/**").hasAnyRole("ADMIN", "EMPLOYEE")
                .requestMatchers(HttpMethod.GET, "/user/download-template").hasRole("ADMIN")
                .requestMatchers(HttpMethod.POST, "/user/upload-excel").hasRole("ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/user/delete").hasRole("ADMIN")
                .requestMatchers("/user/**").hasRole("ADMIN")
                .anyRequest().authenticated()
            )

            .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        // JWT filter before default auth filter
        http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
