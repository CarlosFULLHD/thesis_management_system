package grado.ucb.edu.back_end_grado.bl;

import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import com.itextpdf.text.pdf.draw.LineSeparator;
import grado.ucb.edu.back_end_grado.dto.SuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.UnsuccessfulResponse;
import grado.ucb.edu.back_end_grado.persistence.dao.*;
import grado.ucb.edu.back_end_grado.persistence.entity.*;
import grado.ucb.edu.back_end_grado.util.Globals;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.net.MalformedURLException;
import java.net.URL;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class PdfBl {
    private final GradeProfileDao gradeProfileDao;
    private final AcademicPeriodHasGradeProfileDao academicPeriodHasGradeProfileDao;
    private final FormalDefenseDao formalDefenseDao;
    private final AcademicPeriodDao academicPeriodDao;
    private final LecturerApplicationDao lecturerApplicationDao;

    public PdfBl(GradeProfileDao gradeProfileDao, AcademicPeriodHasGradeProfileDao academicPeriodHasGradeProfileDao, FormalDefenseDao formalDefenseDao, AcademicPeriodDao academicPeriodDao, LecturerApplicationDao lecturerApplicationDao) {
        this.gradeProfileDao = gradeProfileDao;
        this.academicPeriodHasGradeProfileDao = academicPeriodHasGradeProfileDao;
        this.formalDefenseDao = formalDefenseDao;
        this.academicPeriodDao = academicPeriodDao;
        this.lecturerApplicationDao = lecturerApplicationDao;
    }

    // GENERATE => a pdf document with the formal defense act
    public Object generatePublicDefenseAct(Long idGradePro){
        try {
            // FETCHING => current academic period
            Optional<AcademicPeriodEntity> academicPeriod = fetchCurrentAcademicPeriod();
            if (academicPeriod.isEmpty() || academicPeriod.get().getStatus() == 0)
                return new UnsuccessfulResponse(Globals.httpNotFoundStatus[0], Globals.httpNotFoundStatus[1], "No existe un periodo académico para el periodo actual");
            // FETCHING => gradeProfile entity
            Optional<GradeProfileEntity> gradeProfile = gradeProfileDao.findById(idGradePro);
            if (gradeProfile.isEmpty() || gradeProfile.get().getStatus() == 0)
                return new UnsuccessfulResponse(Globals.httpNotFoundStatus[0], Globals.httpNotFoundStatus[1], "No existe perfil de grado");
            // FETCHING => tutor
            Optional<LecturerApplicationEntity> tutor = lecturerApplicationDao.findByGradeProfileIdGradeProAndTutorLecturerAndStatus(gradeProfile.get(), 0,1);
            if (tutor.isEmpty())
                return new UnsuccessfulResponse(Globals.httpNotFoundStatus[0], Globals.httpNotFoundStatus[1], "Perfil de grado sin tutor asignado");
            // FETCHING => lecturer
            // FETCHING => tutor
            Optional<LecturerApplicationEntity> lecturer = lecturerApplicationDao.findByGradeProfileIdGradeProAndTutorLecturerAndStatus(gradeProfile.get(), 1,1);
            if (lecturer.isEmpty())
                return new UnsuccessfulResponse(Globals.httpNotFoundStatus[0], Globals.httpNotFoundStatus[1], "Perfil de grado sin relator asignado");
            // FETCHING => academic_has_grade_profile entity
            Optional<AcademicPeriodHasGradeProfileEntity> academicPeriodHasGradeProfile = academicPeriodHasGradeProfileDao.findByAcademicPeriodIdAcadAndGradeProfileIdGradeProAndStatus(academicPeriod.get(),gradeProfile.get(),1);
            if (academicPeriodHasGradeProfile.isEmpty() || academicPeriodHasGradeProfile.get().getStatus() == 0)
                return new UnsuccessfulResponse(Globals.httpNotFoundStatus[0], Globals.httpNotFoundStatus[1], "El periodo academico no tiene perfiles de grado asignados");
            // FETCHING => formal_defense entity
            Optional<FormalDefenseEntity> formalDefense = formalDefenseDao.findByAcademicHasGradeProfileIdAcadGrade(academicPeriodHasGradeProfile.get());
            if (formalDefense.isEmpty() || formalDefense.get().getStatus() == 0)
                return new UnsuccessfulResponse(Globals.httpNotFoundStatus[0], Globals.httpNotFoundStatus[1], "No existe defensa formal para este perfil de grado");

            // PREPARING => strings for document
            String studentName = academicPeriodHasGradeProfile.get().getGradeProfileIdGradePro().getRoleHasPersonIdRolePer().getUsersIdUsers().getPersonIdPerson().getName()+ " " + academicPeriodHasGradeProfile.get().getGradeProfileIdGradePro().getRoleHasPersonIdRolePer().getUsersIdUsers().getPersonIdPerson().getFatherLastName();
            String gradeProfileTitle = formalDefense.get().getAcademicHasGradeProfileIdAcadGrade().getGradeProfileIdGradePro().getTitle();
            String printingTime = LocalDateTime.now().toString();
            int workshop = formalDefense.get().getAcademicHasGradeProfileIdAcadGrade().getGradeProfileIdGradePro().getIsGradeoneortwo();
            String defenseDate = formalDefense.get().getDefenseDate().toString();
            String tutorFormal = tutor.get().getRoleHasPersonIdRolePer().getUsersIdUsers().getPersonIdPerson().getName() + " " + tutor.get().getRoleHasPersonIdRolePer().getUsersIdUsers().getPersonIdPerson().getFatherLastName();
            String lecturerFormal = lecturer.get().getRoleHasPersonIdRolePer().getUsersIdUsers().getPersonIdPerson().getName() + " " + lecturer.get().getRoleHasPersonIdRolePer().getUsersIdUsers().getPersonIdPerson().getFatherLastName();
            String[] plpInvolvedArray = formalDefense.get().getPlpInvolved().split(";");
            // CREATING => PDF document
            Document document = new Document();
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            PdfWriter.getInstance(document, outputStream);
            document.open();

            // ADDING => horizontal line
            LineSeparator lineSeparator = new LineSeparator();
            lineSeparator.setLineColor(BaseColor.BLUE);
            document.add(new Chunk(lineSeparator));

            // ADDING => Title
            Font titleFont = FontFactory.getFont(FontFactory.TIMES_BOLD, 20, BaseColor.BLUE);
            Paragraph title = new Paragraph(String.format("DEFENSA FORMAL - %s", studentName), titleFont);
            title.setAlignment(Element.ALIGN_CENTER);
            document.add(title);

            // ADDING => horizontal line
            document.add(new Chunk(lineSeparator));

            // ADDING => subtitle
            Font subtitleFont = FontFactory.getFont(FontFactory.TIMES, 6, BaseColor.DARK_GRAY);
            Paragraph subtitle = new Paragraph(String.format("Fecha impreso: %s", printingTime), subtitleFont);
            subtitle.setAlignment(Element.ALIGN_BASELINE);
            subtitle.setSpacingBefore(1);
            document.add(subtitle);
            // ADDING => subtitle
            subtitle = new Paragraph(String.format("Fecha defensa: %s", defenseDate), subtitleFont);
            subtitle.setAlignment(Element.ALIGN_BASELINE);
            subtitle.setSpacingBefore(1);
            document.add(subtitle);

            // ADDING => image from a URL
            try {
                Image image = Image.getInstance(new URL("https://tja.ucb.edu.bo/wp-content/uploads/2020/09/cropped-logo-UCB.png"));
                image.setAlignment(Element.ALIGN_CENTER);
                image.scaleToFit(200, 200); // Resize the image if necessary
                document.add(image);
            } catch (BadElementException | MalformedURLException e) {
                e.printStackTrace();
            }
            // ADDING => horizontal line
            document.add(new Chunk(lineSeparator));

            // ADDING => subtitle
            Font studentSubtitleFont = FontFactory.getFont(FontFactory.TIMES, 8, BaseColor.BLACK);
            subtitle = new Paragraph(String.format("Estudiante: %s", studentName), studentSubtitleFont);
            subtitle.setAlignment(Element.ALIGN_BASELINE);
            subtitle.setSpacingBefore(1);
            document.add(subtitle);
            // ADDING => subtitle
            subtitle = new Paragraph(String.format("Título proyecto: %s", gradeProfileTitle), studentSubtitleFont);
            subtitle.setAlignment(Element.ALIGN_BASELINE);
            subtitle.setSpacingBefore(1);
            document.add(subtitle);
            // ADDING => subtitle
            subtitle = new Paragraph(String.format("Tutor %s", tutorFormal), studentSubtitleFont);
            subtitle.setAlignment(Element.ALIGN_BASELINE);
            subtitle.setSpacingBefore(1);
            document.add(subtitle);
            // ADDING => subtitle
            subtitle = new Paragraph(String.format("Relator %s", lecturerFormal), studentSubtitleFont);
            subtitle.setAlignment(Element.ALIGN_BASELINE);
            subtitle.setSpacingBefore(1);
            document.add(subtitle);
            // ADDING => subtitle
            subtitle = new Paragraph(String.format("Taller de grado %d", workshop), studentSubtitleFont);
            subtitle.setAlignment(Element.ALIGN_BASELINE);
            subtitle.setSpacingBefore(1);
            document.add(subtitle);

            // ADDING => horizontal line
            document.add(new Chunk(lineSeparator));

            // ADDING => Table
            PdfPTable table = new PdfPTable(3); // 3 columns
            table.setWidthPercentage(100);
            table.setSpacingBefore(75);

            // ADDING => table header
            Font headerFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 12, BaseColor.WHITE);
            PdfPCell header1 = new PdfPCell(new Phrase("Evaluador", headerFont));
            header1.setBackgroundColor(BaseColor.BLUE);
            header1.setHorizontalAlignment(Element.ALIGN_CENTER);
            PdfPCell header2 = new PdfPCell(new Phrase("Observaciones", headerFont));
            header2.setBackgroundColor(BaseColor.BLUE);
            header2.setHorizontalAlignment(Element.ALIGN_CENTER);
            PdfPCell header3 = new PdfPCell(new Phrase("Nota", headerFont));
            header3.setBackgroundColor(BaseColor.BLUE);
            header3.setHorizontalAlignment(Element.ALIGN_CENTER);
            table.addCell(header1);
            table.addCell(header2);
            table.addCell(header3);
            // Add table rows
            for (int i = 0; i < plpInvolvedArray.length; i += 1){
                table.addCell(plpInvolvedArray[i]);
                table.addCell("");
                table.addCell("");
            }
            document.add(table);
            // ADDING => horizontal line
            document.add(new Chunk(lineSeparator));
            // Add a Footer
            Font footerFont = FontFactory.getFont(FontFactory.HELVETICA, 8, BaseColor.BLACK);
            Paragraph footer = new Paragraph();
            for (int i = 0; i < plpInvolvedArray.length; i++) {
                footer.add(new Chunk("____________________________\n", footerFont));
                footer.add(new Chunk("" + plpInvolvedArray[i] + "\n\n", footerFont));
            }
            footer.setAlignment(Element.ALIGN_CENTER);
            footer.setSpacingBefore(30);
            document.add(footer);

            // Close the document
            document.close();

            // Convert ByteArrayOutputStream to byte array
            byte[] bytes = outputStream.toByteArray();

            // Set response headers
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);
            headers.setContentDispositionFormData("filename", "output.pdf");
            return new SuccessfulResponse(Globals.httpOkStatus[0], Globals.httpOkStatus[1], bytes);

            //return new ResponseEntity<>(bytes, headers, HttpStatus.OK);
            } catch (Exception e) {
                return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1], e.getMessage());
            }
        }

    // METHOD => fetch current academic period
    public Optional<AcademicPeriodEntity> fetchCurrentAcademicPeriod(){
        LocalDateTime currentDate = LocalDateTime.now();
        int currentYear = currentDate.getYear();
        int currentMonth = currentDate.getMonthValue();
        String sem = String.format("%s - %s", currentMonth > 6 ? "II" : "I",currentYear);
        return academicPeriodDao.findBySemesterAndStatus(sem,1);
    }
}
