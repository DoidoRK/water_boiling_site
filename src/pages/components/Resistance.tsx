import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';

interface ResistanceProps {
    active: number;
}

const Resistance: React.FC<ResistanceProps> = ({ active }) => {  
    if(active === 1){
        return (
            <LocalFireDepartmentIcon color='warning'/>
        );
    } else {
        return (
            <LocalFireDepartmentIcon />
        );
    }
}
export default Resistance;