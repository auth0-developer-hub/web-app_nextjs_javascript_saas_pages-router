import Image from "next/image";
import YourLogo from "../../public/flowise_logo.png";

export default function Logo() {
  return (
    <Image src={YourLogo} alt="Your Logo" width={100} height={50} />
  );
}
