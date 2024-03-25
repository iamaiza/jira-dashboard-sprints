import useCurrentUser from "@/context/CurrentUserContext";
import {
  BagIcon,
  BranchIcon,
  BuildingIcon,
  CheckIcon,
  LocationIcon,
  XIcon,
} from "@/icons/icons";
import { User } from "@/types/types";
import { DELETE_USER, UPDATE_USER } from "@/utils/query-mutations";
import { useMutation } from "@apollo/client";
import { ChangeEvent, useEffect, useState } from "react";

const UserInputs = () => {
  const { user } = useCurrentUser();
  const [state, setState] = useState(() => ({
    jobTitle: "",
    department: "",
    organization: "",
    location: "",
  }));
  
  const [isFocused, setIsFocused] = useState(false);
  const [isClicked, setIsClicked] = useState<string | null>(null);
  const [updateUserMutation] = useMutation(UPDATE_USER, {
    variables: {
      id: user?.id,
    },
  });
  const [deleteUserMutation] = useMutation(DELETE_USER, {
    variables: {
      id: user?.id
    }
  });
  useEffect(() => {
    if(user) {
      setState({
        jobTitle: user.jobTitle,
        department: user.department,
        organization: user.organization,
        location: user.location
      })
    }
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [user]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const updateStateValuesInDB = async () => {
    try {
      const { data } = await updateUserMutation({
        variables: {
          data: {
            jobTitle: state.jobTitle,
            department: state.department,
            organization: state.organization,
            location: state.location,
          },
        },
      });
      console.log(data);
      setIsFocused(false);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteStateValuesInDB = async (fieldName: string) => {
    try {
      const { data } = await deleteUserMutation({
        variables: {
          data: {
            field: fieldName,
            value: ""
          }
        }
      })
      
      setState((prevState) => ({
          ...prevState,
          [fieldName]: "",
        }));
        setIsFocused(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = (e: Event) => {
    if (!e.target) return;
    const isNotContainer = !(e.target as HTMLElement).closest(
      "#inputs_container"
    );
    if (isNotContainer) {
      setIsFocused(false);
      setIsClicked(null);
    }
  };

  return (
    <div className="mt-5 flex flex-col gap-3" id="inputs_container">
      <div className="flexCenter gap-3 relative">
        <BagIcon />
        <input
          className="bg-transparent hover:bg-gray-200 focus:bg-gray-200 py-1.5 mb-0 cursor-default focus:cursor-text input-focus"
          type="text"
          name="jobTitle"
          placeholder="Your job title"
          value={state.jobTitle}
          onChange={handleChange}
          onClick={() => {
            setIsClicked("jobTitle");
            setIsFocused(true);
          }}
        />
        {isFocused && isClicked === "jobTitle" && (
          <div className="flexCenter gap-1 absolute right-0 top-9 z-10">
            <div
              className="bg-gray-200 py-2 px-2.5 rounded"
              onClick={() => deleteStateValuesInDB("jobTitle")}
            >
              <XIcon className="stroke-gray-400 w-4 h-4" />
            </div>
            <div
              className="bg-gray-200 py-2 px-2.5 rounded"
              onClick={updateStateValuesInDB}
            >
              <CheckIcon className="stroke-gray-400 w-4 h-4" />
            </div>
          </div>
        )}
      </div>
      <div className="flexCenter gap-3 relative">
        <BranchIcon />
        <input
          className="bg-transparent hover:bg-gray-200 focus:bg-gray-200 py-1.5 mb-0 cursor-default focus:cursor-text input-focus"
          type="text"
          name="department"
          placeholder="Your department"
          value={state.department}
          onChange={handleChange}
          onClick={() => {
            setIsClicked("department");
            setIsFocused(true);
          }}
        />
        {isFocused && isClicked === "department" && (
          <div className="flexCenter gap-1 absolute right-0 top-9 z-10">
            <div
              className="bg-gray-200 py-2 px-2.5 rounded"
              onClick={() => deleteStateValuesInDB("department")}
            >
              <XIcon className="stroke-gray-400 w-4 h-4" />
            </div>
            <div
              className="bg-gray-200 py-2 px-2.5 rounded"
              onClick={updateStateValuesInDB}
            >
              <CheckIcon className="stroke-gray-400 w-4 h-4" />
            </div>
          </div>
        )}
      </div>
      <div className="flexCenter gap-3 relative">
        <BuildingIcon />
        <input
          className="bg-transparent hover:bg-gray-200 focus:bg-gray-200 py-1.5 mb-0 cursor-default focus:cursor-text input-focus"
          type="text"
          name="organization"
          placeholder="Your organization"
          value={state.organization}
          onChange={handleChange}
          onClick={() => {
            setIsClicked("organization");
            setIsFocused(true);
          }}
        />
        {isFocused && isClicked === "organization" && (
          <div className="flexCenter gap-1 absolute right-0 top-9 z-10">
            <div
              className="bg-gray-200 py-2 px-2.5 rounded"
              onClick={() => deleteStateValuesInDB("organization")}
            >
              <XIcon className="stroke-gray-400 w-4 h-4" />
            </div>
            <div
              className="bg-gray-200 py-2 px-2.5 rounded"
              onClick={updateStateValuesInDB}
            >
              <CheckIcon className="stroke-gray-400 w-4 h-4" />
            </div>
          </div>
        )}
      </div>
      <div className="flexCenter gap-3 relative">
        <LocationIcon />
        <input
          className="bg-transparent hover:bg-gray-200 focus:bg-gray-200 py-1.5 mb-0 cursor-default focus:cursor-text input-focus"
          type="text"
          name="location"
          placeholder="Your location"
          value={state.location}
          onChange={handleChange}
          onClick={() => {
            setIsClicked("location");
            setIsFocused(true);
          }}
        />
        {isFocused && isClicked === "location" && (
          <div className="flexCenter gap-1 absolute right-0 top-9 z-10">
            <div
              className="bg-gray-200 py-2 px-2.5 rounded"
              onClick={() => deleteStateValuesInDB("location")}
            >
              <XIcon className="stroke-gray-400 w-4 h-4" />
            </div>
            <div
              className="bg-gray-200 py-2 px-2.5 rounded"
              onClick={updateStateValuesInDB}
            >
              <CheckIcon className="stroke-gray-400 w-4 h-4" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserInputs;
