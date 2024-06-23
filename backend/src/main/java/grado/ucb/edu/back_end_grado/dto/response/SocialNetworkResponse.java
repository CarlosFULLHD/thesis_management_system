package grado.ucb.edu.back_end_grado.dto.response;

public class SocialNetworkResponse {
    private Long idSocial;
    private String urlLinkedin;

    public SocialNetworkResponse() {
    }

    public SocialNetworkResponse(Long idSocial, String urlLinkedin) {
        this.idSocial = idSocial;
        this.urlLinkedin = urlLinkedin;
    }

    public Long getIdSocial() {
        return idSocial;
    }

    public void setIdSocial(Long idSocial) {
        this.idSocial = idSocial;
    }

    public String getUrlLinkedin() {
        return urlLinkedin;
    }

    public void setUrlLinkedin(String urlLinkedin) {
        this.urlLinkedin = urlLinkedin;
    }
}
