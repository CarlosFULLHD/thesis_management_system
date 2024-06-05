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
import java.util.Random;

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
            String printingYear = String.valueOf(LocalDateTime.now().getYear());
            int workshop = formalDefense.get().getAcademicHasGradeProfileIdAcadGrade().getGradeProfileIdGradePro().getIsGradeoneortwo();
            String defenseDate = formalDefense.get().getDefenseDate().toString();
            String tutorFormal = tutor.get().getRoleHasPersonIdRolePer().getUsersIdUsers().getPersonIdPerson().getName() + " " + tutor.get().getRoleHasPersonIdRolePer().getUsersIdUsers().getPersonIdPerson().getFatherLastName();
            String lecturerFormal = lecturer.get().getRoleHasPersonIdRolePer().getUsersIdUsers().getPersonIdPerson().getName() + " " + lecturer.get().getRoleHasPersonIdRolePer().getUsersIdUsers().getPersonIdPerson().getFatherLastName();
            int graduationMode = gradeProfile.get().getStatusGraduationMode();
            String graduationModeString = graduationMode == 1 ? "PROYECTO DE GRADO" : graduationMode == 2 ? "TRABAJO DIRIGIDO" : graduationMode == 3 ? "TESIS DE GRADO" : graduationMode == 4 ? "EXCELENCIA" : "SIN ASIGNAR";
            Random random = new Random();
            int lecturerRni = random.nextInt(100000) + 1;
            int tutorRni = random.nextInt(100000) + 1;
            int directorRni = random.nextInt(100000) + 1;
            int helperRni = random.nextInt(100000) + 1;

            String[] plpInvolvedArray = formalDefense.get().getPlpInvolved().split(";");
            // CREATING => PDF document
            Document document = new Document();
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            PdfWriter.getInstance(document, outputStream);
            document.open();

            // ADDING => image from a URL
            try {
                Image image = Image.getInstance(new URL("https://lpz.ucb.edu.bo/wp-content/uploads/2021/12/Colores-Horizontal-1.png"));
                image.setAlignment(Element.ALIGN_CENTER);
                image.scaleToFit(200, 200); // Resize the image if necessary
                document.add(image);
            } catch (BadElementException | MalformedURLException e) {
                e.printStackTrace();
            }

            // ADDING => Title
            Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 12, BaseColor.BLACK);
            Paragraph title = new Paragraph(String.format("ACTA DE DEFENSA %s", graduationModeString), titleFont);
            title.setAlignment(Element.ALIGN_CENTER);
            document.add(title);

            // ADDING => subtitle
            Font subtitleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 10, BaseColor.BLACK);
            Paragraph subtitle = new Paragraph(String.format("LPZ-INS: %d/%s", new Random().nextInt(100) + 1, printingYear), subtitleFont);
            subtitle.setAlignment(Element.ALIGN_CENTER);
            subtitle.setSpacingBefore(1);
            document.add(subtitle);

            // ADDING => first paragraph
            Font normalParagraphFont = FontFactory.getFont(FontFactory.HELVETICA, 10, BaseColor.BLACK);
            Font normalBoldFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 10, BaseColor.BLACK);
            Chunk regularText = new Chunk("En la universidad Católica Boliviana \"San Pablo\", ",normalParagraphFont);
            Chunk boldText = new Chunk("SEDE LA PAZ ",normalBoldFont);
            Chunk regularTextTwo = new Chunk("en fecha ",normalParagraphFont);
            Chunk boldTextTwo = new Chunk("13 de marzo de 2024, ", normalBoldFont);
            Chunk regularTextThree = new Chunk("se reunio el Tribunal Examinador conformado por: ",normalParagraphFont);
            Paragraph paragraph = new Paragraph();
            paragraph.add(regularText);
            paragraph.add(boldText);
            paragraph.add(regularTextTwo);
            paragraph.add(boldTextTwo);
            paragraph.add(regularTextThree);
            paragraph.setAlignment(Element.ALIGN_JUSTIFIED);
            paragraph.setSpacingBefore(5);
            paragraph.setSpacingAfter(5);
            document.add(paragraph);

            // ADDING => Table
            PdfPTable table = new PdfPTable(2);
            table.setWidthPercentage(100);
            table.setSpacingAfter(5);
            table.getDefaultCell().setBorder(Rectangle.NO_BORDER);
            int verticalAlign = Element.ALIGN_MIDDLE;
            // ADDING => panel
            PdfPCell cell1 = new PdfPCell(new Phrase("M.Sc JUAN ANGEL AVILA MACEDA", normalBoldFont));
            PdfPCell cell2 = new PdfPCell(new Phrase(String.format("REPRESENTANTE DEL RECTORADO DE SEDE \nR.N.I. %d",helperRni), normalBoldFont));
            cell1.setVerticalAlignment(verticalAlign);
            cell1.setBorder(Rectangle.NO_BORDER);
            cell2.setBorder(Rectangle.NO_BORDER);
            table.addCell(cell1);
            table.addCell(cell2);

            cell1 = new PdfPCell(new Phrase("M.Sc. ORLANDO RIVERA JURADO", normalBoldFont));
            cell2 = new PdfPCell(new Phrase(String.format("DIRECTOR DE CARRERA \nR.N.I. %d",directorRni), normalBoldFont));
            cell1.setVerticalAlignment(verticalAlign);
            cell1.setBorder(Rectangle.NO_BORDER);
            cell2.setBorder(Rectangle.NO_BORDER);
            table.addCell(cell1);
            table.addCell(cell2);

            cell1 = new PdfPCell(new Phrase(String.format("Ing. %s", lecturerFormal.toUpperCase()), normalBoldFont));
            cell2 = new PdfPCell(new Phrase(String.format("RELATOR \nR.N.I. %d",lecturerRni), normalBoldFont));
            cell1.setVerticalAlignment(verticalAlign);
            cell1.setBorder(Rectangle.NO_BORDER);
            cell2.setBorder(Rectangle.NO_BORDER);
            table.addCell(cell1);
            table.addCell(cell2);

            cell1 = new PdfPCell(new Phrase(String.format("Ing. %s", tutorFormal.toUpperCase()), normalBoldFont));
            cell2 = new PdfPCell(new Phrase(String.format("TUTOR \nR.N.I. %d",tutorRni), normalBoldFont));
            cell1.setVerticalAlignment(verticalAlign);
            cell1.setBorder(Rectangle.NO_BORDER);
            cell2.setBorder(Rectangle.NO_BORDER);
            table.addCell(cell1);
            table.addCell(cell2);
            document.add(table);

            // ADDING => second paragraph
            regularText = new Chunk("Para evaluar y calificar el Proyecto de Grado de ",normalParagraphFont);
            boldText = new Chunk(String.format("%s ",studentName.toUpperCase()),normalBoldFont);
            regularTextTwo = new Chunk(", postulante al grado de Licenciatura en ",normalParagraphFont);
            boldTextTwo = new Chunk("INGENIERÍA DE SISTEMAS. ", normalBoldFont);
            regularTextThree = new Chunk(String.format("Revisados los antecedentes y expediente estudiantil, se constató que ha cumplido todos los requisitos de acuerdo con el reglamento vigente. Seguidamiente, el/la postulante procedío a la presentación y defensa del %s titulado:",graduationModeString.toLowerCase()),normalParagraphFont);
            paragraph = new Paragraph();
            paragraph.add(regularText);
            paragraph.add(boldText);
            paragraph.add(regularTextTwo);
            paragraph.add(boldTextTwo);
            paragraph.add(regularTextThree);
            paragraph.setAlignment(Element.ALIGN_JUSTIFIED);
            paragraph.setSpacingBefore(5);
            paragraph.setSpacingAfter(5);
            document.add(paragraph);

            // ADDING => project title
            System.out.println(gradeProfileTitle);
            subtitle = new Paragraph(String.format("%s", gradeProfileTitle.toUpperCase()), subtitleFont);
            subtitle.setAlignment(Element.ALIGN_CENTER);
            document.add(subtitle);

            // ADDING => third paragraph
            regularText = new Chunk("Concluida la defensa, el Tribunal Examinador, en reunión reservada, decidío otorgar la calificación de",normalParagraphFont);
            regularTextTwo = new Chunk("\n...................(..................................................................) puntos que corresponde a ",normalParagraphFont);
            regularTextThree = new Chunk("\n.....................................................................................                          ",normalParagraphFont);
            Chunk regularTextFour = new Chunk("\nLa presente Acta fue leída y suscrita por el Tribunal Examinador y el/la postulante.                       ",normalParagraphFont);
            paragraph = new Paragraph();
            paragraph.add(regularText);
            paragraph.add(regularTextTwo);
            paragraph.add(regularTextThree);
            paragraph.add(regularTextFour);
            paragraph.setAlignment(Element.ALIGN_JUSTIFIED_ALL);
            paragraph.setSpacingBefore(5);
            paragraph.setSpacingAfter(70);
            document.add(paragraph);



            // ADDING => Signatures
            table = new PdfPTable(2);
            table.setWidthPercentage(100);
            table.setSpacingAfter(50);
            table.getDefaultCell().setBorder(Rectangle.NO_BORDER);
            float rowHeight = 70;
            // ADDING => panel
            boldText = new Chunk("M.Sc JUAN ANGEL AVILA MACEDA\n",normalBoldFont);
            regularText = new Chunk("REPRESENTANTE DEL RECTORADO DE SEDE\n",normalParagraphFont);
            regularTextTwo = new Chunk(String.format("R.N.I %d",helperRni),normalParagraphFont);
            paragraph = new Paragraph();
            paragraph.add(boldText);
            paragraph.add(regularText);
            paragraph.add(regularTextTwo);
            paragraph.setAlignment(Element.ALIGN_CENTER);
            cell1 = new PdfPCell();
            cell1.addElement(paragraph);
            cell1.setVerticalAlignment(Element.ALIGN_CENTER);
            cell1.setMinimumHeight(rowHeight);
            cell1.setBorder(Rectangle.NO_BORDER);

            boldText = new Chunk("M.Sc. ORLANDO RIVERA JURADO\n",normalBoldFont);
            regularText = new Chunk("DIRECTOR DE CARRERA\n",normalParagraphFont);
            regularTextTwo = new Chunk(String.format("R.N.I %d",directorRni),normalParagraphFont);
            paragraph = new Paragraph();
            paragraph.add(boldText);
            paragraph.add(regularText);
            paragraph.add(regularTextTwo);
            paragraph.setAlignment(Element.ALIGN_CENTER);
            cell2 = new PdfPCell();
            cell2.addElement(paragraph);
            cell2.setVerticalAlignment(Element.ALIGN_CENTER);
            cell2.setMinimumHeight(rowHeight);
            cell2.setBorder(Rectangle.NO_BORDER);

            table.addCell(cell1);
            table.addCell(cell2);

            boldText = new Chunk(String.format("Ing. %s\n",lecturerFormal),normalBoldFont);
            regularText = new Chunk("RELATOR\n",normalParagraphFont);
            regularTextTwo = new Chunk(String.format("R.N.I %d",lecturerRni),normalParagraphFont);
            paragraph = new Paragraph();
            paragraph.add(boldText);
            paragraph.add(regularText);
            paragraph.add(regularTextTwo);
            paragraph.setAlignment(Element.ALIGN_CENTER);
            cell1 = new PdfPCell();
            cell1.addElement(paragraph);
            cell1.setVerticalAlignment(Element.ALIGN_CENTER);
            cell1.setMinimumHeight(rowHeight);
            cell1.setBorder(Rectangle.NO_BORDER);

            boldText = new Chunk(String.format("Ing. %s\n",tutorFormal),normalBoldFont);
            regularText = new Chunk("TUTOR\n",normalParagraphFont);
            regularTextTwo = new Chunk(String.format("R.N.I %d",tutorRni),normalParagraphFont);
            paragraph = new Paragraph();
            paragraph.add(boldText);
            paragraph.add(regularText);
            paragraph.add(regularTextTwo);
            paragraph.setAlignment(Element.ALIGN_CENTER);
            cell2 = new PdfPCell();
            cell2.addElement(paragraph);
            cell2.setVerticalAlignment(Element.ALIGN_CENTER);
            cell2.setMinimumHeight(rowHeight);
            cell2.setBorder(Rectangle.NO_BORDER);

            table.addCell(cell1);
            table.addCell(cell2);
            document.add(table);


            boldText = new Chunk(studentName.toUpperCase(),normalBoldFont);
            regularText = new Chunk("\nPOSTULANTE",normalParagraphFont);
            paragraph = new Paragraph();
            paragraph.add(boldText);
            paragraph.add(regularText);
            paragraph.setAlignment(Element.ALIGN_CENTER);

            document.add(paragraph);


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
