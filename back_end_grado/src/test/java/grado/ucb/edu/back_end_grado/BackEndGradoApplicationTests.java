package grado.ucb.edu.back_end_grado;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.nio.charset.Charset;
import java.util.Random;

@SpringBootTest
class BackEndGradoApplicationTests {

	@Test
	void contextLoads() {

	}

	@Test
	public void givenUsingJava8_whenGeneratingRandomAlphanumericString_thenCorrect() {
		int leftLimit = 48; // numeral '0'
		int rightLimit = 122; // letter 'z'
		int targetStringLength = 12;
		Random random = new Random();

		String generatedString = random.ints(leftLimit, rightLimit + 1)
				.filter(i -> (i <= 57 || i >= 65) && (i <= 90 || i >= 97))
				.limit(targetStringLength)
				.collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
				.toString();

		System.out.println(generatedString);
	}

}
