package com.uttam.restaurant.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class MyConfig extends WebSecurityConfigurerAdapter {


	// some beans required for actual configuration
	@Bean
	public UserDetailsService getUserDetailService() {
		return new UserDetailsServiceImpl();
	}
	
	@Bean
	public BCryptPasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	public DaoAuthenticationProvider authenticationProvider() {

		DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider();
		daoAuthenticationProvider.setUserDetailsService(getUserDetailService());
		daoAuthenticationProvider.setPasswordEncoder(passwordEncoder());

		return daoAuthenticationProvider;
	}

	
//	 @Bean
//	 CorsConfigurationSource corsConfigurationSource() {
//	        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//	        source.registerCorsConfiguration("http://localhost:3000/", new CorsConfiguration().applyPermitDefaultValues());
//	        return source;
//	 }
	

	// actual configure methods
	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		// tells which kind of authentication, whether in-memory, or DB or something else
		auth.authenticationProvider(authenticationProvider());
		auth.inMemoryAuthentication().withUser("user").password(passwordEncoder().encode("pass")).roles("ADMIN");
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		// tells which route to authorize based on role, 
		// disable cross-site request forgery

		//permitting all
		http.csrf().disable()
			.authorizeRequests()
				.antMatchers(HttpMethod.OPTIONS, "/**").permitAll()
				.antMatchers("/","/home","/feedback-home","/feedback","/feedbacks","/user","/auth").permitAll()
				.antMatchers("/order**","/user/delete","/test-user-privileges").access("hasRole('USER')")
				.antMatchers("/order","/orders","/user","/users").access("hasRole('ADMIN')")
				.anyRequest().authenticated();
		
		http.formLogin()
			.loginProcessingUrl("/auth")
			.defaultSuccessUrl ("/", true)
			.failureUrl("/login?error=true");
		
		http.httpBasic();
		
		http.cors().configurationSource(request -> new CorsConfiguration().applyPermitDefaultValues());

		
//		http.cors().and().csrf().disable()
//        .authorizeRequests()
//            // add your resources here. By default, spring security blocks all resources that is not under /resources/**
//            .antMatchers(HttpMethod.GET, "/", "/js/**", "/css/**", "/images/**").permitAll()
//            // prevent spring security from blocking some pages that doesn't require authentication to be access here.
//            .antMatchers("/forgot-password", "/change-password").permitAll()
//            .anyRequest().authenticated()
//        .and()
//        // login configuration
//        .formLogin()
//            .loginPage("/login") // can either be mapping or file
//            .permitAll()
//        .and()
//        // logout configuration
//        .logout()
//            .logoutUrl("/logout")
//            .logoutSuccessUrl("/")
//            .invalidateHttpSession(true)
//            .deleteCookies("JSESSIONID")
//            .clearAuthentication(true)
//            .permitAll();
	}

}
