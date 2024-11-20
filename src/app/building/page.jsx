import Image from "next/image";

const Buildind = () => {
    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <div className="flex items-center space-x-4">
                <h1 className="text-2xl font-bold">Em construção</h1>
                <Image src="/images/build.gif" width={100} height={100} alt="Em construção" />
            </div>
        </div>
    );
};

export default Buildind;
