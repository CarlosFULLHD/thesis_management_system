import { BASE_URL } from '@/config/globals';
import { ReactNode, createContext, useContext, useState } from 'react';
import { boolean } from 'zod';
export interface GradeProfileStudentInterface {
    gradeProfile: GradeProfile;
    tutor: Lecturer;
    lecturer: Lecturer;
}

// Provider structure interface (methods and data types)
interface GradeProfileLecturerCollectionContextType {
    gradeProfileLecturerList: GradeProfileStudentInterface[],
    loadGradeProfileLecturerList: () => Promise<void>;
    assignTitle: (idGradePro: number, title: string) => Promise<boolean>;
    assignGraduationMode: (idGradePro: number, graduationMode: number) => Promise<boolean>;
    assignWorkshop: (idGradePro: number, graduationMode: number) => Promise<boolean>;
    updateTitleByIdGradePro: (idGradePro: number, newTitle: string) => void;
    assignTutorOrLecturerToGradeProfile: (idRolePer: number, idGradePro: number, isLecturer: boolean) => Promise<boolean>;
}

// Provider context init
const GradeProfileLecturerCollectionContext = createContext<GradeProfileLecturerCollectionContextType | undefined>(undefined);
// Provider props with components
interface GradeProfileLecturerCollectionProps {
    children: ReactNode;
}

const GradeProfileLecturerCollectionProvider: React.FC<GradeProfileLecturerCollectionProps> = ({ children }) => {
    // Initializing the list that will contain items from DB
    const [gradeProfileLecturerList, setGradeProfileLecturerList] = useState<GradeProfileStudentInterface[]>([])

    // Fetch data function
    const fetchData = async () => fetch(`${BASE_URL}grade-profile/lecturer/all`).then((res) => res.json())
    // Load entries from DB
    const loadGradeProfileLecturerList = async () => {
        const data = await fetchData();
        if (data.status == 200) {
            var itemX: GradeProfileStudentInterface[] = data["result"].map((item: GradeProfileStudentInterface) => ({
                gradeProfile: item.gradeProfile,
                tutor: item.tutor,
                lecturer: item.lecturer,
            }))
            setGradeProfileLecturerList(itemX);
        }
    }
    // Method to assign new title to the DB
    const assignTitle = async (idGradePro: number, title: string) => {
        var flag = false;
        // URL of the endpoint
        const url = `${BASE_URL}grade-profile/title`;
        const queryParams = new URLSearchParams({
            idGradePro: idGradePro.toString(),
            title: title
        });
        try {
            const response = await fetch(`${url}?${queryParams.toString()}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.status == 200) {
                updateTitleByIdGradePro(idGradePro, title);
                flag = true;
            }

        } catch (error) {
            console.error('Error updating grade profile title:', error);
            throw error;
        }
        return flag;
    }
    // Method to assign new graduation mode to the DB
    const assignGraduationMode = async (idGradePro: number, graduationMode: number) => {
        var flag = false;
        // URL of the endpoint
        const url = `${BASE_URL}grade-profile/graduation-mode`;
        const queryParams = new URLSearchParams({
            idGradePro: idGradePro.toString(),
            newGraduationMode: graduationMode.toString()
        });
        try {
            const response = await fetch(`${url}?${queryParams.toString()}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.status == 200) {
                updateGraduationModeByIdGradePro(idGradePro, graduationMode);
                flag = true;
            }

        } catch (error) {
            console.error('Error updating grade profile title:', error);
            throw error;
        }
        return flag;
    }

    // Method to assign new graduation mode to the DB
    const assignWorkshop = async (idGradePro: number, newWorkShop: number) => {
        var flag = false;
        // URL of the endpoint
        const url = `${BASE_URL}grade-profile/workshop`;
        const queryParams = new URLSearchParams({
            idGradePro: idGradePro.toString(),
            newWorkShop: newWorkShop.toString()
        });
        try {
            const response = await fetch(`${url}?${queryParams.toString()}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.status == 200) {
                updateWorkShopByIdGradePro(idGradePro, newWorkShop);
                flag = true;
            }

        } catch (error) {
            console.error('Error updating grade profile title:', error);
            throw error;
        }
        return flag;
    }

    // Load entries from DB
    const assignTutorOrLecturerToGradeProfile = async (idRolePer: number, idGradePro: number, isLecturer: boolean) => {
        var flag = false;
        // URL of the endpoint
        const url = `${BASE_URL}lecturer/${isLecturer ? "lecturer" : "tutor"}`
        const queryParams = new URLSearchParams({
            idGradePro: idGradePro.toString(),
            idRolePer: idRolePer.toString()
        });

        try {
            const response = await fetch(`${url}?${queryParams.toString()}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 201) {
                const responseBody = await response.json();
                const result: Lecturer = responseBody["result"]
                if (isLecturer) {
                    updateLecturerByIdGradePro(idGradePro, result)
                } else {
                    updateTutorByIdGradePro(idGradePro, result)
                }

                flag = true;
            }
        } catch (error) {
            throw error;
        }
        return flag;
    }


    // Update title of an element based on the idGradePro paramenter
    const updateGraduationModeByIdGradePro = (idGradePro: number, graduationMode: number) => {
        setGradeProfileLecturerList(prevList => {
            return prevList.map(item => {
                if (item.gradeProfile.idGradePro === idGradePro) {
                    return { ...item, gradeProfile: { ...item.gradeProfile, statusGraduationMode: graduationMode } };
                } else {
                    return item;
                }
            });
        });
    };

    // Update tutor of an element based on the idGradePro paramenter
    const updateTutorByIdGradePro = (idGradePro: number, newTutor: Lecturer) => {
        setGradeProfileLecturerList(prevList => {
            return prevList.map(item => {
                if (item.gradeProfile.idGradePro === idGradePro) {
                    return { ...item, tutor: newTutor };
                } else {
                    return item;
                }
            });
        });
    };

    // Update tutor of an element based on the idGradePro paramenter
    const updateLecturerByIdGradePro = (idGradePro: number, newLecturer: Lecturer) => {
        setGradeProfileLecturerList(prevList => {
            return prevList.map(item => {
                if (item.gradeProfile.idGradePro === idGradePro) {
                    return { ...item, lecturer: newLecturer };
                } else {
                    return item;
                }
            });
        });
    };


    // Update title of an element based on the idGradePro paramenter
    const updateWorkShopByIdGradePro = (idGradePro: number, newWorkShop: number) => {
        setGradeProfileLecturerList(prevList => {
            return prevList.map(item => {
                if (item.gradeProfile.idGradePro === idGradePro) {
                    return { ...item, gradeProfile: { ...item.gradeProfile, isGradeoneortwo: newWorkShop } };
                } else {
                    return item;
                }
            });
        });
    };

    // Update title of an element based on the idGradePro paramenter
    const updateTitleByIdGradePro = (idGradePro: number, newTitle: string) => {
        setGradeProfileLecturerList(prevList => {
            return prevList.map(item => {
                if (item.gradeProfile.idGradePro === idGradePro) {
                    return { ...item, gradeProfile: { ...item.gradeProfile, title: newTitle } };
                } else {
                    return item;
                }
            });
        });
    };

    return (
        <GradeProfileLecturerCollectionContext.Provider value={{
            gradeProfileLecturerList,
            loadGradeProfileLecturerList,
            assignTitle,
            assignGraduationMode,
            assignWorkshop,
            updateTitleByIdGradePro,
            assignTutorOrLecturerToGradeProfile
        }}>
            {children}
        </GradeProfileLecturerCollectionContext.Provider>
    )
}

export const useGradeProfileLecturerCollection = (): GradeProfileLecturerCollectionContextType => {
    const context = useContext(GradeProfileLecturerCollectionContext);
    if (!context) {
        throw new Error('Error desde context - task');
    }
    return context;
}

export default GradeProfileLecturerCollectionProvider;





export interface GradeProfile {
    idGradePro: number;
    roleHasPerson: RoleHasPerson;
    title: string;
    statusGraduationMode: number;
    isGradeoneortwo: number;
    status: number;
    createdAt: string;
}

export interface RoleHasPerson {
    idRolePer: number;
    rolesIdRole: RolesIDRole;
    usersIdUsers: UsersIDUsers;
    status: number;
    createdAt: string;
}

export interface RolesIDRole {
    idRole: number;
    userRole: string;
    status: number;
    createdAt: string;
}

export interface UsersIDUsers {
    idUsers: number;
    personIdPerson: PersonIDPerson;
    username: string;
    password: string;
    salt: string;
    status: number;
    createdAt: string;
}

export interface PersonIDPerson {
    idPerson: number;
    ci: string;
    name: string;
    fatherLastName: string;
    motherLastName: string;
    description: string;
    email: string;
    cellPhone: string;
    status: number;
    createdAt: string;
}

export interface Lecturer {
    idTutorApplication: number;
    roleHasPersonIdRolePer: RoleHasPerson;
    gradeProfileIdGradePro: GradeProfile;
    isAccepted: number;
    tutorLecturer: number;
    status: number;
    createdAt: string;
}