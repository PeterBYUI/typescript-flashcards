import Button from "./Button";
import { useNavigate } from "react-router";

import ProfileSvg from "./svgs/Profile";

export default function ProfileButton() {

    const navigate = useNavigate();

    return <Button onClick={() => navigate("/content/profile")} styling="hover:text-emerald-900">
        <ProfileSvg isOnProfilePage={false} />
    </Button>
}