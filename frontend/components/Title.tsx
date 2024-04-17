import { CheckIcon, XIcon } from "@/icons/icons";
import { TitleProps } from "@/types/types";
import { useState } from "react";

const Title = (props: TitleProps) => {
    const { title, setTitle, updateTitleHandler, isUpdateTitle, setIsUpdatedTitle } = props
    const [showIcons, setShowIcons] = useState(false);
    const deleteTitleHandler = () => {
        setIsUpdatedTitle(false);
      };
  return (
    <>
      {isUpdateTitle ? (
        <div className="relative">
          <textarea
            className={`bg-transparent font-semibold text-2xl pl-0 h-fit text-slate-300 ${
              isUpdateTitle && "pl-2 border border-slate-500"
            }`}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onFocus={() => setShowIcons(true)}
            autoFocus={isUpdateTitle && true}
          />
          {showIcons && (
            <div className="flexCenter gap-1 absolute right-0 top-full z-10">
              <div
                className="bg-slate-900 py-2 px-2.5 rounded"
                onClick={deleteTitleHandler}
              >
                <XIcon className="stroke-gray-400 w-4 h-4" />
              </div>
              <div
                className="bg-slate-900 py-2 px-2.5 rounded"
                onClick={updateTitleHandler}
              >
                <CheckIcon className="stroke-gray-400 w-4 h-4" />
              </div>
            </div>
          )}
        </div>
      ) : (
        <h1
          className="font-semibold text-2xl"
          onClick={() => setIsUpdatedTitle(true)}
        >
          {title}
        </h1>
      )}
    </>
  );
};

export default Title;
