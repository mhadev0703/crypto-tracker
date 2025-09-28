import styled from "styled-components";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atoms";
import { FaMoon, FaSun } from "react-icons/fa";

const ToggleButton = styled.button`
    border: none;
    background-color: ${(props) => props.theme.toggleColor};
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${(props) => props.theme.iconColor};
    border-radius: 12px;
    font-size: 16px;
    transition: all 0.2s ease-in-out;
    position: absolute;
    right: 10px;
    
    &:hover {
        cursor: pointer;
        transform: scale(1.05);
    }
    
    @media (max-width: 480px) {
        padding: 8px;
        font-size: 14px;
        right: 5px;
    }
`;

function DarkModeToggle() {
    const setDarkAtom = useSetRecoilState(isDarkAtom);
    const toggleDarkAtom = () => setDarkAtom((prev) => !prev);
    const isDark = useRecoilValue(isDarkAtom);

    return (
        <ToggleButton onClick={toggleDarkAtom}>
            {isDark ? <FaSun /> : <FaMoon />}
        </ToggleButton>
    );
}

export default DarkModeToggle;
