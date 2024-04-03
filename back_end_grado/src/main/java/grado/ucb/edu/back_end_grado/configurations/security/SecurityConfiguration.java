//package grado.ucb.edu.back_end_grado.configurations.security;
//
//import grado.ucb.edu.back_end_grado.bl.PersonDetails;
//import grado.ucb.edu.back_end_grado.configurations.security.Filters.JwtAuthFilter;
////import grado.ucb.edu.back_end_grado.configurations.security.Filters.JwtRequestFilter;
//import grado.ucb.edu.back_end_grado.configurations.security.Jwt.JwtUtils;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
//import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.config.http.SessionCreationPolicy;
//import org.springframework.security.core.userdetails.User;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.NoOpPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.security.provisioning.InMemoryUserDetailsManager;
//import org.springframework.security.web.SecurityFilterChain;
//import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
//
//@Configuration
//@EnableWebSecurity
//public class SecurityConfiguration {
//
//    @Autowired
//    JwtUtils jwtUtils;
//
//    @Autowired
//    PersonDetails personDetails;
//
//    /*@Autowired
//    UserDetailsService userDetailsService;*/
//
//    /*@Autowired
//    PersonDetails personDetails;*/
//
//    /*@Autowired
//    private JwtRequestFilter jwtRequestFilter;*/
//
//    /*@Autowired
//    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
//        auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
//    }*/
//
//    @Bean
//    PasswordEncoder passwordEncoder() {
//        return NoOpPasswordEncoder.getInstance();
//    }
//
//    @Bean
//    SecurityFilterChain filterChain(HttpSecurity http, AuthenticationManager authenticationManager) throws Exception {
//
//        JwtAuthFilter jwtAuthFilter = new JwtAuthFilter(jwtUtils);
//        jwtAuthFilter.setAuthenticationManager(authenticationManager);
//        jwtAuthFilter.setFilterProcessesUrl("/login"); //Ruta para autenticacion por defecto /login
//
//        return http
//            .csrf(config -> config.disable())
//            .authorizeHttpRequests(auth -> {
//                //auth.requestMatchers("**").permitAll(); //Permit acces to api for everyone
//                auth.anyRequest().permitAll(); // Any API request must be authenticated
//            })
//            .sessionManagement(session -> {
//                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS); // No session will be created or used by spring security
//            })
//            .addFilter(jwtAuthFilter)
//            //.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class)
//            .build();
//    }
//
//    // This is a user for testing purposes
//    /*@Bean
//    UserDetailsService userDetailsService() {
//        InMemoryUserDetailsManager manager = new InMemoryUserDetailsManager();
//
//        manager.createUser(User.withUsername("tester")
//        .password("1234")
//        .roles()
//        .build());
//
//        return manager;
//    }*/
//
//    @Bean
//    AuthenticationManager authenticationManager(HttpSecurity http, PasswordEncoder passwordEncoder) throws Exception {
//        return http.getSharedObject(AuthenticationManagerBuilder.class)
//                .userDetailsService(personDetails)
//                .passwordEncoder(passwordEncoder)
//                .and().build();
//    }
//}