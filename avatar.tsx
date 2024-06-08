import { twMerge } from "tailwind-merge";
import { Role } from "../Types/User.interface";

type avatarProps = {
  firstName?: string;
  lastName?: string;
  role?: Role;
  imageOnly?: boolean;
  bgColor?: string;
  textColor?: string;
  image?: string;
  imageSize?: string;
};

const Avatar = ({
  firstName,
  lastName,
  role,
  imageOnly = false,
  bgColor = "bg-primary",
  textColor = "text-white",
  image,
  imageSize = "h-10 w-10",
}: avatarProps) => {
  const fullName = firstName + " " + lastName;
  const initials =
    (firstName?.slice(0, 1)?.toUpperCase() || "") +
    (lastName?.slice(0, 1)?.toUpperCase() || "");

  return (
    <div className="flex gap-3">
      <div
        className={twMerge(
          "flex justify-center items-center border rounded-full overflow-hidden",
          imageSize,
          bgColor,
          textColor
        )}
      >
        {image ? <img src={image} alt={fullName} /> : <p>{initials}</p>}
      </div>
      {!imageOnly && (
        <div>
          <h3 className="text-sm">
            {fullName.length > 15 ? fullName.slice(0, 15) + "..." : fullName}
          </h3>
          <p className="text-xs">
            {role === Role.ADMIN ? "Admin" : "Customer"}
          </p>
        </div>
      )}
    </div>
  );
};

export default Avatar;
