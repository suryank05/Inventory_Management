package com.example.InventoryManagement.Config;

import java.io.IOException;
import java.util.ArrayDeque;
import java.util.Deque;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.example.InventoryManagement.DTO.ApiResponse;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
@Order(Ordered.HIGHEST_PRECEDENCE)
public class RateLimitFilter extends OncePerRequestFilter {

	private static final int MAX_ATTEMPTS = 5;
	private static final long WINDOW_MS = 60_000;
	private final Map<String, Deque<Long>> attempts = new ConcurrentHashMap<>();
	private final ObjectMapper objectMapper = new ObjectMapper();

	@Override
	protected boolean shouldNotFilter(HttpServletRequest request) {
		String path = request.getServletPath();
		return !("/auth/login".equals(path) || "/auth/register".equals(path) || "/auth/refresh".equals(path));
	}

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		String key = request.getRemoteAddr() + ":" + request.getServletPath();
		long now = System.currentTimeMillis();
		Deque<Long> timestamps = attempts.computeIfAbsent(key, k -> new ArrayDeque<>());

		synchronized (timestamps) {
			while (!timestamps.isEmpty() && now - timestamps.peekFirst() > WINDOW_MS) {
				timestamps.pollFirst();
			}
			if (timestamps.size() >= MAX_ATTEMPTS) {
				response.setStatus(HttpStatus.TOO_MANY_REQUESTS.value());
				response.setContentType(MediaType.APPLICATION_JSON_VALUE);
				objectMapper.writeValue(response.getWriter(),
						ApiResponse.error("Too many attempts. Try again in a minute."));
				return;
			}
			timestamps.addLast(now);
		}

		filterChain.doFilter(request, response);
	}
}
