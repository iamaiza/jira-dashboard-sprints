import Image from "next/image";

const ProfilePhoto = ({ imgUrl, name }: { imgUrl?: string, name: string }) => {
  return (
    <>
      {imgUrl ? (
        <Image
          className="rounded-full"
          src={imgUrl}
          alt={name}
          width={27}
          height={27}
        />
      ) : (
        <div className="uppercase tracking-widest w-8 h-8 bg-slate-900 rounded-full flexCenter text-[13px] font-bold">
          {name?.substr(0, 2)}
        </div>
      )}
    </>
  );
};

export default ProfilePhoto;
