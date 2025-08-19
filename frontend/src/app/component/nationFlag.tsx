import Image from "next/image";

interface FlagProps {
  code: string;
  name: string;
}

const Flag = ({ code, name }: FlagProps) => {
  return (
    <Image
      width={25}
      height={25}
      alt={name}
      src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${code}.svg`}
    />
  );
};

export default Flag;
