import { UserDetail } from "@/app/providers/SessionProvider";

interface GradeProfileTitleProps {
        userDetails: UserDetail
}

const GradeProfileStudentTitle = ( {userDetails} : GradeProfileTitleProps ) => {
    return (
        <h1 className="ttext-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400">
                    Mi perfil de proyecto de grado - {userDetails.name}
                </h1>
    )
}

export default GradeProfileStudentTitle;