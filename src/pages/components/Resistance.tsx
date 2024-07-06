import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';

interface ResistanceProps {
    active: boolean;
}

const Resistance: React.FC<ResistanceProps> = ({ active }) => {  
    if(active){
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