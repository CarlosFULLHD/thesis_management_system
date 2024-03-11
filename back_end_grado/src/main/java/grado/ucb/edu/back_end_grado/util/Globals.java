package grado.ucb.edu.back_end_grado.util;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

@Component
public class Globals {
    public static final String apiVersion = "api/v1/";

    public static final String[] httpSuccessfulCreatedStatus = HttpStatus.CREATED.toString().split(" "); // Status 201

    public static final String[] httpNotFoundStatus = HttpStatus.NOT_FOUND.toString().split(" "); // Status 500
    public static final String[] httpInternalServerErrorStatus = HttpStatus.INTERNAL_SERVER_ERROR.toString().split(" "); // Status 500

}
