import { BASE_URL } from '@/config/globals';
import { ReactNode, createContext, useContext, useState } from 'react';

export interface MilestoneInterface {
    idMilestone:           number;
    taskStatesIdTaskState: TaskStatesIDTaskState;
    usersIdUsers:          UsersIDUsers;
    comments:              string;
    url:                   string;
    plpInvolved:           string;
    isStudentOrCoordinator:number;
    isSend:                number;
    status:                number;
    createdAt:             string;
}

export interface TaskStatesIDTaskState {
    idTaskState: number;
    description: string;
    status:      number;
    createdAt:   string;
}

export interface UsersIDUsers {
    idUsers:        number;
    personIdPerson: PersonIDPerson;
    username:       string;
    status:         number;
}

export interface PersonIDPerson {
    idPerson:       number;
    ci:             string;
    name:           string;
    fatherLastName: string;
    motherLastName: string;
    description:    string;
    email:          string;
    cellPhone:      string;
    status:         number;
    createdAt:      string;
}

// Provider structure interface (methods and data types)
interface MilestoneCollectionContextType {
    milestoneList : MilestoneInterface[],
    loadMilestonesByAcademicPeriod: () => Promise<void>;
}

// Provider context init
const MilestoneCollectionContext = createContext<MilestoneCollectionContextType | undefined>(undefined);
// Provider props with components
interface MilestoneCollectionProps {
    children: ReactNode;
}

const MilestoneCollectionProvider: React.FC<MilestoneCollectionProps> = ({ children }) => {

    // Initializing the list that will contain the items from DB's
    const [milestoneList, setMilestoneList] = useState<MilestoneInterface[]>([])


    // Fetch data function
    const fetchData = async () => fetch(`${BASE_URL}milestone/current-ones/`).then((res) => res.json());

    const loadMilestonesByAcademicPeriod = async () => {
        const data = await fetchData();
        if (data.status == 200){
            var milestoneList: MilestoneInterface[] = data["result"].map((item:MilestoneInterface) => ({
                idMilestone: item.idMilestone,
                taskStatesIdTaskState: item.taskStatesIdTaskState,
                usersIdUsers: item.usersIdUsers,
                comments: item.comments,
                url: item.url,
                plpInvolved: item.plpInvolved,   
                isStudentOrCoordinator:item.isStudentOrCoordinator, 
                isSend: item.isSend,     
                status: item.status,
                createdAt: item.createdAt,   
            }))
            setMilestoneList(milestoneList);
        }
    }
    return (
        <MilestoneCollectionContext.Provider value={{
            milestoneList,
            loadMilestonesByAcademicPeriod
        }}>
            {children}
        </MilestoneCollectionContext.Provider>
    );
}

export const useMilestoneCollection = (): MilestoneCollectionContextType => {
    const context = useContext(MilestoneCollectionContext);
    if (!context) {
        throw new Error('Error desde context - task');
    }
    return context;
}

export default MilestoneCollectionProvider;