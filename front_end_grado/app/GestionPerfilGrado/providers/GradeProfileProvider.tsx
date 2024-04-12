
export interface GradeProfileItem {
    idGradePro: number;
      roleHasPerson: {
        idRolePer: number;
        rolesIdRole: {
          idRole: number;
          userRole: string;
          status: number;
          createdAt: string
        };
        usersIdUsers: {
          idUsers: number;
          personIdPerson: {
            idPerson: number;
            ci: string;
            name: string;
            fatherLastName: string;
            motherLastName: string;
            description: string;
            email: string;
            cellPhone: string;
            status: number;
            createdAt: string
          };
          username: string;
          password: string;
          salt: string;
          status: number;
          createdAt: string
        };
        status: number;
        createdAt: string
      };
      title: string;
      statusGraduationMode: number;
      status: number;
      createdAt: string
}