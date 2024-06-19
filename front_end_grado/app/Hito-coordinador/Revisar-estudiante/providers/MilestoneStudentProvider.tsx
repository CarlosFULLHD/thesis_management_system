import { BASE_URL } from '@/config/globals';
import { ReactNode, createContext, useContext, useState } from 'react';
export interface MilestoneInterface {
    idMilestone: number;
    taskStatesIdTaskState: TaskStatesIDTaskState;
    usersIdUsers: UsersIDUsers;
    comments: string;
    url: string;
    plpInvolved: string;
    isStudentOrCoordinator: number;
    isSend: number;
    meetingDate: string;
    status: number;
    createdAt: string;
}

// Provider structure interface (methos and data types)
interface MilestoneStudentContextType {
    milestoneItem: MilestoneInterface,
    loadMilestoneItem: (idUsers: number) => Promise<void>;
    saveOrSendMilestoneItem: (idMilestone: number, url: string, isSend: boolean) => Promise<void>;
    isMilestoneItemEmpty: (newMilestone: MilestoneInterface) => boolean;
    reviewMilestone:(idMilestone:number, comments: string, plpInvolved: string, idTaskState:number) => Promise<void>;
}

// Provider context init
const MilestoneStudentContext = createContext<MilestoneStudentContextType | undefined>(undefined);
// Provider props with components
interface MilestoneItemProps {
    children: ReactNode;
}

const MilestoneStudentProvider: React.FC<MilestoneItemProps> = ({ children }) => {
    // Initializing the milestone for an student
    const [milestoneItem, setMilestoneItem] = useState<MilestoneInterface>(initialMilestoneStudent);

    // Fetch data function
    const fetchData = async (idUsers: number) => fetch(`${BASE_URL}milestone?idUsers=${idUsers}`).then((res) => res.json());

    // Load milestone for the student from DB
    const loadMilestoneItem = async (idUsers: number) => {
        const data = await fetchData(idUsers);
        if (data.status == 200) {
            var itemx: MilestoneInterface = data["result"]
            setMilestoneItem(itemx);
        }
    }

    // UPDATE - (true => send ; false => save) milestone form for the student
    const saveOrSendMilestoneItem = async (idMilestone: number, url: string, isSend : boolean) => {
        const endPointUrl: string = isSend ? `${BASE_URL}milestone/` : `${BASE_URL}milestone`;
        const data = {
            idMilestone: idMilestone,
            url: url,
        };
        try {
            const response = await fetch(endPointUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (response.status == 200) {
                const responseData = await response.json();
                var itemx: MilestoneInterface = responseData["result"];
                setMilestoneItem(itemx);
            }
        } catch (error: any) {
            console.error(error)
        }
    }

    // UPDATE - Review student form
    const reviewMilestone = async (idMilestone:number, comments: string, plpInvolved: string, idTaskState:number) => {
        const endPointUrl: string = `${BASE_URL}milestone/review` 
      
        const data  = {
            idMilestone: idMilestone,
            taskStatesIdTaskState: {
                idTaskState: idTaskState
            },
            comments: comments,
            plpInvolved: plpInvolved
        };
        try {
            const response = await fetch(endPointUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (response.status == 200) {
                const responseData = await response.json();
                var itemx: MilestoneInterface = responseData["result"];
                setMilestoneItem(itemx);
            }
        } catch (error: any) {
            console.error(error)
        }
    }  

  


    // Check if mileston for the student is empty 
    const isMilestoneItemEmpty = (newMilestone: MilestoneInterface): boolean => {
        // Check if all properties of the milestone object are empty or default values
        return (
            newMilestone.idMilestone === 0 &&
            isTaskStateEmpty(newMilestone.taskStatesIdTaskState) &&
            isUsersEmpty(newMilestone.usersIdUsers) &&
            newMilestone.comments === '' &&
            newMilestone.url === '' &&
            newMilestone.plpInvolved === '' &&
            newMilestone.isStudentOrCoordinator === 0 &&
            newMilestone.isSend === 0 &&
            newMilestone.status === 0 &&
            newMilestone.meetingDate === '' &&
            newMilestone.createdAt === ''
        );
    }

    return (
        <MilestoneStudentContext.Provider value={{
            milestoneItem,
            loadMilestoneItem,
            saveOrSendMilestoneItem,
            isMilestoneItemEmpty,
            reviewMilestone

        }}>
            {children}
        </MilestoneStudentContext.Provider>
    );
}

export const useMilestoneStudent = (): MilestoneStudentContextType => {
    const context = useContext(MilestoneStudentContext);
    if (!context) {
        throw new Error('Error desde context - task');
    }
    return context;
}

export default MilestoneStudentProvider;


export interface TaskStatesIDTaskState {
    idTaskState: number;
    description: string;
    status: number;
    createdAt: string;
}

export interface UsersIDUsers {
    idUsers: number;
    personIdPerson: PersonIDPerson;
    username: string;
    status: number;
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

const taskStatesStudent = {
    idTaskState: 0,
    description: '',
    status: 0,
    createdAt: '',
}

const personMilestoneStudent = {
    idPerson: 0,
    ci: '',
    name: '',
    fatherLastName: '',
    motherLastName: '',
    description: '',
    email: '',
    cellPhone: '',
    status: 0,
    createdAt: '',
}

const usersMilestoneStudent = {
    idUsers: 0,
    personIdPerson: personMilestoneStudent,
    username: '',
    status: 0,
}

const initialMilestoneStudent: MilestoneInterface = {
    idMilestone: 0,
    taskStatesIdTaskState: taskStatesStudent,
    usersIdUsers: usersMilestoneStudent,
    comments: '',
    url: '',
    plpInvolved: '',
    isStudentOrCoordinator: 0,
    isSend: 0,
    status: 0,
    meetingDate:'',
    createdAt: '',
}

// Function to check if TaskStatesIDTaskState object is empty
const isTaskStateEmpty = (taskState: TaskStatesIDTaskState): boolean => {
    return (
        taskState.idTaskState === 0 &&
        taskState.description === '' &&
        taskState.status === 0 &&
        taskState.createdAt === ''
    );
}
// Function to check if UsersIDUsers object is empty
const isUsersEmpty = (user: UsersIDUsers): boolean => {
    return (
        user.idUsers === 0 &&
        isPersonEmpty(user.personIdPerson) &&
        user.username === '' &&
        user.status === 0
    );
}
// Function to check if PersonIDPerson object is empty
const isPersonEmpty = (person: PersonIDPerson): boolean => {
    return (
        person.idPerson === 0 &&
        person.ci === '' &&
        person.name === '' &&
        person.fatherLastName === '' &&
        person.motherLastName === '' &&
        person.description === '' &&
        person.email === '' &&
        person.cellPhone === '' &&
        person.status === 0 &&
        person.createdAt === ''
    );
}